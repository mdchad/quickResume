import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import SideNav from "@/components/SideNav";
import {getSession} from "next-auth/react";

export default function CoverLetter() {
  return (
      <SideNav>
        <p>Hello world</p>
      </SideNav>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {},
  }
}