"use client"
import { UserButton, auth } from "@clerk/nextjs"
import { useEffect } from "react"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p>Welcome to your dashboard. Here's what's happening today:</p>
                <div className="mt-4">
                    <UserButton />
                </div>
                <div className="mt-6">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Action 1
                    </button>
                    <button className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Action 2
                    </button>
                </div>
            </div>
        </div>
    )
}