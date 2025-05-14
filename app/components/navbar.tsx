"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="sticky top-0 z-50 w-full px-4 py-3">
      <nav
        className={`w-full max-w-5xl mx-auto px-4 py-3 bg-black dark:bg-gray-800 rounded-full shadow-md transition-all duration-300 ${isScrolled ? "bg-opacity-95 backdrop-blur-sm" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium text-white px-4">M Farhan Ramadhan</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-white hover:text-orange-500">
              Home
            </Link>
            <Link href="#about" className="text-white hover:text-orange-500">
              About
            </Link>
            <Link href="#service" className="text-white hover:text-orange-500">
              Service
            </Link>
            <Link href="#portfolio" className="text-white hover:text-orange-500">
              Project
            </Link>
            <Link href="#contact" className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600">
              Contact me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 mt-3 mx-4 bg-black dark:bg-gray-800 p-4 rounded-xl shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="#" className="text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="#about" className="text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="#service" className="text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Service
              </Link>
              <Link href="#portfolio" className="text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Project
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact me
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
