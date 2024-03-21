import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Timer = () => {
  const TimeLimit = useSelector((state) => state.examBank.selectedExam.TimeLimit);
  const endTime = useSelector((state) => state.examBank.selectedExam.endTime);

  const [remainingTime, setRemainingTime] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const storedRemainingTime = localStorage.getItem('remainingTime');
    if (storedRemainingTime) {
      setRemainingTime(parseInt(storedRemainingTime, 10));
    } else {
      const startTime = Date.now();
      const endTimeDate = new Date(endTime);
      const timeLimitMilliseconds = parseTimeLimit(TimeLimit) * 60 * 1000;
      const timeToEnd = endTimeDate.getTime() - startTime;
      const initialRemainingTime = Math.min(timeToEnd, timeLimitMilliseconds);
      setRemainingTime(initialRemainingTime);
    }

    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        const newRemainingTime = prevRemainingTime - 1000; // Decrement by 1 second
        localStorage.setItem('remainingTime', newRemainingTime.toString());
        if (newRemainingTime <= 0) {
          setIsTimeUp(true);
          clearInterval(interval);
        }
        return newRemainingTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [TimeLimit, endTime]);

  const parseTimeLimit = (timeLimit) => {
    const [hours, minutes, seconds] = timeLimit.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {isTimeUp ? (
        <p>Time's up!</p>
      ) : (
        <p>Remaining Time: {remainingTime !== null ? formatTime(remainingTime) : 'Loading...'}</p>
      )}
    </div>
  );
};

export default Timer;