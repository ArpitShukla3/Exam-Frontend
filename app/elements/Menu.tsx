"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const path = usePathname();
  // console.log(path)
  const arr = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Create Exam",
      href: "/created",
    },
    {
      title: "Give Exam",
      href: "/given",
    },
    {
        title:"Upload Answer Key",
        href:"/uploadAnswer"
    },
  ];
  return (
    <div className="flex flex-col text-left">
      {arr.map((item, index) => {
        const color = path == item.href ? "" : "outline";
        return (
          <Link
            className={buttonVariants({ variant: color })}
            href={item.href}
            key={index}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
