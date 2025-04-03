'use client'

import { useState } from 'react'
import Earth from '@/components/Earth'
import ClockCard from '@/components/ClockCard'
import CitySelector from '@/components/CitySelector'

const cities = [
  { city: '東京', timeZone: 'Asia/Tokyo' },
  { city: 'ニューヨーク', timeZone: 'America/New_York' },
  { city: 'ロンドン', timeZone: 'Europe/London' },
  { city: 'パリ', timeZone: 'Europe/Paris' },
  { city: 'シドニー', timeZone: 'Australia/Sydney' },
  { city: 'シンガポール', timeZone: 'Asia/Singapore' },
]

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(cities[0])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B1221]">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          World Clock
        </h1>
        
        {/* Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto w-full">
          {/* Left: 3D Earth */}
          <div className="relative h-[300px] lg:h-[400px] w-full rounded-2xl overflow-hidden bg-[#0F1A2E]/50 backdrop-blur-sm border border-white/5">
            <Earth />
          </div>
          
          {/* Right: Controls */}
          <div className="flex flex-col gap-6">
            {/* City Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city) => (
                <CitySelector
                  key={city.timeZone}
                  city={city.city}
                  timeZone={city.timeZone}
                  isSelected={city.timeZone === selectedCity.timeZone}
                  onClick={() => setSelectedCity(city)}
                />
              ))}
            </div>
            
            {/* Clock Display */}
            <ClockCard
              city={selectedCity.city}
              timeZone={selectedCity.timeZone}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-[#0F1A2E]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
            <p className="text-white/70">© 2024 World Clock. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors">About</a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors">GitHub</a>
              <a href="#" className="text-white/70 hover:text-blue-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
