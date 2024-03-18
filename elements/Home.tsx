import { UserButton, UserProfile, auth } from "@clerk/nextjs"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import Menu from "@/elements/Menu";
  
export default function Home()
{
    const data =auth();
    // console.log(data);
    return (
        <div className="z-2 sm:w-screen">
          <Drawer direction="left" >
           <DrawerTrigger>Open</DrawerTrigger> 
            <DrawerContent style={{ display: 'flex', flexDirection: 'column', height: '100vh' , width:'20%'}}>
              <DrawerHeader>
               <div className="flex justify-between">
               <DrawerTitle>Exam.io</DrawerTitle>
                <DrawerClose>
                  <button >Cancel</button>
                </DrawerClose>
               </div>
              </DrawerHeader>
              <Menu/>
              <DrawerFooter>
              <UserButton/>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
     
        </div>
      )
}