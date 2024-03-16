import { UserButton, auth } from "@clerk/nextjs"

export default function Home()
{
    const data =auth();
    console.log(data);
    return (<>
    <UserButton/>
    Dashboad
    </>)
}