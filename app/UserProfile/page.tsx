"use client";
import { RedirectToUserProfile, useUser } from "@clerk/nextjs";
import Image from 'next/image';
import { useEffect, useState } from "react";

const UserProfile = () => {
  const { isLoaded, user } = useUser();
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    emailAddress: '',
    avatarUrl: '',
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        fullName: user.fullName,
        emailAddress: user.emailAddresses[0].emailAddress,
        avatarUrl: user.avatarUrl,
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {isLoaded ? (
        <>
         <RedirectToUserProfile/>
        </>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default UserProfile;
