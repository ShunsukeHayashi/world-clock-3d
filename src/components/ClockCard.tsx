'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type ClockCardProps = {
  city: string
  timeZone: string
}

export default function ClockCard({ city, timeZone }: ClockCardProps) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone,
      }
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone,
      }
      setTime(new Intl.DateTimeFormat('ja-JP', timeOptions).format(now))
      setDate(new Intl.DateTimeFormat('ja-JP', dateOptions).format(now))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timeZone])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A2942] to-[#0F1A2E] border border-white/10 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-8 space-y-4"
      >
        <motion.h2
          className="text-2xl font-bold text-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {city}
        </motion.h2>
        <motion.div
          className="text-6xl font-mono tracking-wider font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {time.split(':').map((digit, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              {digit}
              {i < 2 && <span className="text-blue-300 mx-2">:</span>}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          className="text-lg text-blue-100/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {date}
        </motion.p>
      </motion.div>
    </motion.div>
  )
} 