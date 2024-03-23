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
import Menu from "./Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
export default function Home()
{
    return (
        <div className="z-2 sm:w-screen">
          <Drawer direction="left" >
           <DrawerTrigger>
           <div className="ml-2 mt-2"><FontAwesomeIcon icon={faBars} size="2xl" /></div>
            </DrawerTrigger> 
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