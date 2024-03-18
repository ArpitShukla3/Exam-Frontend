import { SignIn } from "@clerk/nextjs";
import mysvg from "../../../assets/auth.svg";

export default function Page() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col justify-center items-center h-lvh mb-auto">
        <SignIn />
      </div>
    </div>
  );
}