import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="hero-background h-screen w-full relative grid place-items-center">
      <SignIn afterSignInUrl={'/dashboard'}/>
    </section>
  )
}