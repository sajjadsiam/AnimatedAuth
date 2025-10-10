'use client'

import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full glass-effect flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ rotate: 0, scale: 0 }}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 360,
          scale: 1
        }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {theme === 'dark' ? (
          <FaMoon className="text-2xl text-yellow-300" />
        ) : (
          <FaSun className="text-2xl text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  )
}
