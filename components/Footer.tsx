import Image from 'next/image'
import { Facebook, Twitter, Instagram, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <Image
            src='/images/logoblack.png'
            alt="Level Up Investments Logo"
            width={80}
            height={30}
            className="h-auto w-auto pt-24"
          />
        </div>
        
        <div className="text-center mb-4" id='contact'>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Address:</span> 906, Park Regis, Business Bay, Dubai, UAE
          </p>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Contact:</span> +971 58 560 5980 / +971 55 537 8328
          </p>
        </div>
        
        <div className="text-center text-sm text-gray-500 mb-6">
          © 2024 Level Up Investments All rights reserved.
        </div>
        
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            <Phone size={20} />
            <span className="sr-only">Phone</span>
          </a>
        </div>
      </div>
    </footer>
  )
}