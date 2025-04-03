'use client'

import { motion } from 'framer-motion'

type CitySelectorProps = {
  city: string
  timeZone: string
  isSelected: boolean
  onClick: () => void
}

export default function CitySelector({ city, timeZone, isSelected, onClick }: CitySelectorProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-2xl text-sm font-medium
        transition-all duration-300 ease-in-out
        backdrop-blur-lg border
        ${isSelected 
          ? 'border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20' 
          : 'border-white/10 bg-white/5 hover:bg-white/10'
        }
      `}
      whileHover={{ scale: isSelected ? 1 : 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
    >
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-blue-400/20"
          layoutId="activeCity"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className={`
        relative z-10
        ${isSelected 
          ? 'text-blue-200 font-semibold' 
          : 'text-gray-300'
        }
      `}>
        {city}
      </span>
      <span className="block text-xs text-gray-500 mt-1 relative z-10">
        {timeZone.split('/')[1].replace('_', ' ')}
      </span>
    </motion.button>
  )
} 