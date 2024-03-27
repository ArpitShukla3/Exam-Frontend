"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./_animation/animationData.json";
import { FaGithub, FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa'
export default function Navbar() {
  const data = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col justify-start items-start">
      <nav className="flex items-center fixed w-full z-2 justify-between py-4 px-6 bg-white shadow">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Exam.io
        </Link>

        {/* Login/Logout Button */}
        {data.isSignedIn ? (
          <>{router.push("/dashboard")}</>
        ) : (
          <Button onClick={() => router.push("/sign-in")}>Login</Button>
        )}
      </nav>
      <div>  
      <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ace Your Exams with Confidence
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unlock your full potential and achieve academic success with our comprehensive exam preparation platform. Our expert resources, personalized study plans, and cutting-edge tools empower you to conquer any exam with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 justify-center">
          <Button onClick={() => router.push("/sign-in")}>Login</Button>
          <Link href="https://github.com/ArpitShukla3" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 sm:mt-24">
        <div className="w-full h-90 md:h-96">
        <Lottie animationData={animationData} loop={true} className="w-full h-full"/>
      </div>
        </div>
      </div>
    </div>
    <footer className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row md:items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link href="https://github.com/ArpitShukla3" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-600 hover:text-gray-900 transition-colors duration-300" size={24} />
              </Link>
              <Link href="http://portfolio-puce-gamma-46.vercel.app/" target="_blank" rel="noopener noreferrer">
                <span className="text-gray-600 hover:text-gray-900 transition-colors duration-300">Arpit Shukla </span>
              </Link>
              <Link href="mailto:arpit900shukla@gmail.com" target="_blank" rel="noopener noreferrer">
                <FaEnvelope className="text-gray-600 hover:text-gray-900 transition-colors duration-300" size={24} />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://www.linkedin.com/in/arpit-shukla-270231247/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-600 hover:text-gray-900 transition-colors duration-300" size={24} />
              </Link>
              <Link href="https://www.instagram.com/arpit_shukla900/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-600 hover:text-gray-900 transition-colors duration-300" size={24} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
