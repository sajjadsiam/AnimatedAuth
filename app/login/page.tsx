'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaEnvelope, FaLock, FaGoogle, FaGithub, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa'
import ThemeToggle from '../components/ThemeToggle'
import OAuthDemoModal from '../components/OAuthDemoModal'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOAuthModal, setShowOAuthModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Login successful! 🎉')
    }, 2000)
  }

  const handleSocialLogin = (provider: string) => {
    // Demo message showing OAuth setup instructions
    const isDemoMode = !process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_URL === 'http://localhost:3000'
    
    if (isDemoMode) {
      setSelectedProvider(provider)
      setShowOAuthModal(true)
      return
    }
    
    // Redirect to OAuth API route
    window.location.href = `/api/auth/${provider.toLowerCase()}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* OAuth Demo Modal */}
      {showOAuthModal && (
        <OAuthDemoModal
          provider={selectedProvider}
          onClose={() => setShowOAuthModal(false)}
        />
      )}
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <FaLock className="text-white text-2xl" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold mb-2 text-primary">Welcome Back</h1>
            <p className="text-muted">Enter your credentials to continue</p>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            {[
              { icon: FaGoogle, name: 'Google', label: 'Google' },
              { icon: FaGithub, name: 'GitHub', label: 'GitHub' },
              { icon: FaApple, name: 'Apple', label: 'Apple' },
            ].map((social, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin(social.name)}
                className="glass-effect p-4 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-800 dark:to-black hover:shadow-lg transition-all duration-300"
                aria-label={`Sign in with ${social.label}`}
                title={`Sign in with ${social.label}`}
              >
                <social.icon className="text-gray-800 dark:text-white text-xl mx-auto" />
              </motion.button>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-600 dark:bg-gray-600 light:bg-gray-300"></div>
            <span className="text-muted text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600 dark:bg-gray-600 light:bg-gray-300"></div>
          </div>

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 glass-effect rounded-xl text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-purple-500" />
                <span className="text-secondary">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                'Sign In'
              )}
              {isLoading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <span className="text-muted">Don't have an account? </span>
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign up
            </Link>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-xl -z-10"></div>
      </motion.div>
    </div>
  )
}
