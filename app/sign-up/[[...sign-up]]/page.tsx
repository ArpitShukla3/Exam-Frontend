import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
    return  <div className="h-full w-full">
  <div className="flex flex-col justify-center items-center h-lvh"> 
   <SignUp />
   </div>
   </div>;
}