import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import {getProviders, getSession, signIn, useSession} from "next-auth/react";

export default function Login({ providers }) {
  const { data: session, status } = useSession()
  async function onSignIn(e, provider) {
    const result = await signIn(provider.id)
  }

  return (
    <>
      <Head>
        <title>Sign In - QuickResume</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>
        {providers &&
          Object.values(providers).map(provider => (
              <div key={provider.name} className="mt-12 w-full">
                <Button onClick={(e) => onSignIn(e, provider)} className="w-full">
                  Sign in with{' '} {provider.name}
                </Button>
              </div>
          ))}
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const providers = await getProviders()
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/dashboard" },
    };
  }

  return {
    props: {
      providers
    },
  }
}
