import 'focus-visible'
import '@/styles/tailwind.css'
import {ClerkProvider, SignedIn, SignedOut, RedirectToSignIn} from "@clerk/nextjs";
import {useRouter} from "next/router";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
