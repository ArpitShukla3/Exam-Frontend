import { SignOutButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <>
    <SignOutButton>
      <button>
        Signout
      </button>
    </SignOutButton>
    Home
    </>
  );
}
