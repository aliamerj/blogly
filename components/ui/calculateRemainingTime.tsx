"use client"
import { calculateRemainingTime } from '@/lib/utils';
import React, { useEffect, useState } from 'react'


const CalculateRemainingTime = ({ created }: { created: Date }) => {
  const createdAt = new Date(created);
  const [remainingTime, setRemainingTime] = useState(() => calculateRemainingTime(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const { hoursLeft, minutesLeft, secondsLeft } = calculateRemainingTime(createdAt);
      if (hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
      setRemainingTime({ hoursLeft, minutesLeft, secondsLeft });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [createdAt]);

  const { hoursLeft, minutesLeft, secondsLeft } = remainingTime;


  const formattedTimeLeft = `${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

  return (
    <>
      {hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0 ?
        `Your free plan has expired. Please subscribe to continue using the app.` :
        `You have ${formattedTimeLeft} left on your free plan`}
    </>
  )
}

export default CalculateRemainingTime;
