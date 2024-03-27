"use client";
import { Button } from "@/components/ui/button";
import { currentUser, RedirectToSignIn, RedirectToUserProfile, SignIn, SignInButton, useAuth, useUser } from "@clerk/nextjs"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserProfile, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PieController
);
  // Importing Chart component from react-chartjs-2
  import { Bar, Pie, Line } from 'react-chartjs-2';
export default function Example() {
  const { isLoaded, user } = useUser();
  const data = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    average: 0,
    positive_average: 0,
    negative_average: 0,
    max: 0,
    count: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/exam/dashboard', {
          headers: {
            Authorization: data.userId,
          },
        });
        setDashboardData({
          average: response.data.data[0].average,
          positive_average: response.data.data[0].positive_average,
          negative_average: response.data.data[0].negative_average,
          max: response.data.data[0].max,
          count: response.data.data[0].count,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  },[data.userId]);


  const chartData = {
    labels: ['Average', 'Positive Average', 'Negative Average', 'Max', 'Count'],
    datasets: [
      {
        label: 'Dashboard Data',
        data: [dashboardData.average, dashboardData.positive_average, dashboardData.negative_average, dashboardData.max, dashboardData.count],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <nav className="flex items-center justify-between py-4 px-6 bg-white shadow">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          Exam.io
        </Link>
        <Button onClick={() => data.signOut()}>Logout</Button>
      </nav>
      <div className="text-center mt-8">
        {isLoaded && user ? (
          <div className="mb-8 flex items-center justify-center flex-col">
            {/* <Avatar src={user.avatarUrl} alt="User Avatar" className="mb-4" /> */}
            <h2 className="text-2xl font-semibold">{user.fullName}</h2>
            <p className="text-md text-gray-600">{user.emailAddresses[0].emailAddress}</p>
            <Button onClick={() => router.push('/UserProfile')} className="mt-4">View Profile</Button>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <div className="w-full lg:h-1/2">
        <h2 className="text-center font-semibold text-lg mb-4">Dashboard Metrics</h2>
        <div className="flex flex-wrap ">
          <div className="w-1/3">
            <Pie data={chartData} />
          </div>
          <div className="w-1/3">
            <Bar data={chartData} />
          </div>
          <div className="w-1/3">
            <Line data={chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}
