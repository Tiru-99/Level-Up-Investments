"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Property {
  id: number
  name: string
  configurations: string
  price: string
  imageUrl: string
}

const properties: Property[] = [
  {
    id: 1,
    name: "Siniya Island",
    configurations: "2, 3 & 4 BHK",
    price: "AED 23,000",
    imageUrl: "/images/1.jpg"
  },
  {
    id: 2,
    name: "Skyscape Altius",
    configurations: "2, 3 & 4 BHK",
    price: "AED 23,000",
    imageUrl: "/images/2.jpg"
  },
  {
    id: 3,
    name: "Siniya Island",
    configurations: "2, 3 & 4 BHK",
    price: "AED 23,000",
    imageUrl: "/images/3.jpg"
  },
  {
    id: 4,
    name: "Siniya Island",
    configurations: "1, 2 & 3 BHK",
    price: "AED 25,000",
    imageUrl: "/images/4.jpg"
  },
  {
    id: 5,
    name: "Siniya Island",
    configurations: "2 & 3 BHK",
    price: "AED 22,000",
    imageUrl: "/images/5.jpg"
  },
  {
    id: 6,
    name: "Siniya Island",
    configurations: "2 & 3 BHK",
    price: "AED 22,000",
    imageUrl: "/images/5.jpg"
  }
]

export default function PropertyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const checkMobileView = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768)
    }
  }

  useEffect(() => {
    checkMobileView()
    window.addEventListener('resize', checkMobileView)

    return () => {
      window.removeEventListener('resize', checkMobileView)
    }
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= properties.length ? 0 : prevIndex + 3
    )
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(properties.length - 3, 0) : prevIndex - 3
    )
  }, [])

  useEffect(() => {
    setIsClient(true)

    if (!isMobile) {
      const intervalId = setInterval(() => {
        nextSlide()
      }, 3500) // Auto-scroll every 3.5 seconds

      return () => clearInterval(intervalId) // Cleanup on component unmount
    }
  }, [nextSlide, isMobile])

  if (!isClient) {
    return null // Prevent SSR issues
  }

  if (isMobile) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <Image
                src={property.imageUrl}
                alt={property.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <p className="text-sm text-gray-600">{property.configurations}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Starts</p>
                    <p className="font-semibold">{property.price}</p>
                  </div>
                  <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {properties.map((property) => (
            <div key={property.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
                <Image
                  src={property.imageUrl}
                  alt={property.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.name}</h3>
                  <p className="text-sm text-gray-600">{property.configurations}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Starts</p>
                      <p className="font-semibold">{property.price}</p>
                    </div>
                    <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button 
        onClick={prevSlide} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
