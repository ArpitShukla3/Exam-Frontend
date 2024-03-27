"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast

const Timer = () => {
  const TimeLimit = useSelector((state) => state.examBank.selectedExam.TimeLimit);
  const endTime = useSelector((state) => state.examBank.selectedExam.endTime);
  const id = useSelector((state) => state.examBank.selectedExam._id);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  //returns remaining microseconds representation, where timeString-> '00:00'
  const timeRemaining = (timeString:String):number  => {
    const [minutes, seconds] = timeString.split(":");
    const numMinutes = Number(minutes);
    const numSeconds = Number(seconds);
    const totalMicroseconds = (numMinutes * 60 + numSeconds) * 1000000;
    return (totalMicroseconds);
  };
  function getMinimum(a, b, c) {
    let minimum = a; // Assume the first parameter is the minimum initially
    // Compare the second parameter with the current minimum
    if (b < minimum) {
      minimum = b;
    }
    // Compare the third parameter with the current minimum
    if (c < minimum) {
      minimum = c;
    }
    return minimum;
  }
  //returns microseconds in figures of Numbers where t->Date-time
  const EndTime =(t:any):number=>{
      return Date.parse(t);
  }
  const getTime = () => {
    const currentTime = Date.now();
    const endTimeInMs = EndTime(endTime);
    const timeLimitInMs = timeRemaining(TimeLimit);
    const storedTimeRemaining = Number(localStorage.getItem(`timeRemaining` + id) || Number.MAX_SAFE_INTEGER);
    const time = Math.min(timeLimitInMs, endTimeInMs - currentTime, storedTimeRemaining);

    if (time > 0) {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
      localStorage.setItem(`timeRemaining` + id, '' + Math.max(0, time - 1000));
    } else {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      localStorage.removeItem(`timeRemaining` + id);
      toast.error('Time is up!'); // Show error toast when time is up
    }
    if(time<=0){
      localStorage.removeItem(`timeRemaining`+id);
    (async () => {
      try {
        const url = "https://exambackend-kok8.onrender.com/exam/finalSubmit";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': id, // Assuming 'id' is a suitable authorization token
          },
          body: JSON.stringify({ examID: id }),
        });
        if (response.ok) {
          window.location.href = "/given";
          toast.success('Final results submitted successfully!'); // Show success toast on successful submission
        } else {
          console.error('Failed to submit final results');
          toast.error('Failed to submit final results.'); // Show error toast on failure
        }
      } catch (error) {
        console.error('Error submitting final results:', error);
        toast.error('Error submitting final results.'); // Show error toast on catch
      }
    })();
    }
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);
    return () => {clearInterval(interval);
    }
  }, []);

  return (
    <div className="timer">
      Timer
      <br />
      Days: {days}
      <br />
      Hours:{hours}
      <br />
      Minutes: {minutes} <br />
      Seconds: {seconds}
      <br />
      <Toaster/>
    </div>
  );
};

export default Timer;
