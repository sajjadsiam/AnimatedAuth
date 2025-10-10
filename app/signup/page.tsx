'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaApple, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa'
import ThemeToggle from '../components/ThemeToggle'
import OAuthDemoModal from '../components/OAuthDemoModal'

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showOAuthModal, setShowOAuthModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('')

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep(3)
      setTimeout(() => {
        alert('Account created successfully! 🎉')
      }, 1500)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSocialSignup = (provider: string) => {
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
        {/* Main gradient blobs with advanced animations */}
        <motion.div
          className="absolute top-10 right-10 w-[500px] h-[500px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.4, 1.2, 1],
            x: [0, 80, -40, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1.5, 1],
            x: [0, -70, 50, 0],
            y: [0, 60, -40, 0],
            rotate: [0, -90, -180, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.5, 1.2, 1],
            rotate: [0, 180, 360, 0],
            x: [0, 60, -60, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25"
          animate={{
            scale: [1, 1.8, 1.3, 1],
            x: [0, -90, 70, 0],
            y: [0, 70, -60, 0],
            rotate: [0, 270, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-2xl opacity-25"
          animate={{
            scale: [1, 1.7, 1.4, 1],
            x: [0, 100, -80, 0],
            y: [0, -80, 60, 0],
            rotate: [0, -270, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated shapes with higher visibility */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-56 h-56 border-[6px] border-cyan-400/25 rounded-full"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/4 w-48 h-48 border-[6px] border-emerald-400/25 rotate-45"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Pulsing accent lights */}
        <motion.div
          className="absolute top-20 right-1/4 w-48 h-48 bg-cyan-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 2.5, 1],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-48 h-48 bg-purple-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 2.3, 1],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      {/* Particle Effects */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 14 + 5,
            height: Math.random() * 14 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 4 === 0 
              ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.6), rgba(168, 85, 247, 0.6))' 
              : i % 4 === 1
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.6), rgba(139, 92, 246, 0.6))'
              : i % 4 === 2
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(236, 72, 153, 0.6))'
              : 'linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.6))',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)',
          }}
          animate={{
            y: [0, Math.random() * -180 - 100, 0],
            x: [0, Math.random() * 120 - 60, 0],
            scale: [1, Math.random() * 2.5 + 1.5, 1],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, Math.random() * 360, 720],
          }}
          transition={{
            duration: Math.random() * 8 + 7,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Signup Card */}
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
              animate={{ 
                rotate: currentStep === 3 ? 360 : 0,
                scale: currentStep === 3 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                {currentStep === 3 ? (
                  <FaCheck className="text-white text-2xl" />
                ) : (
                  <FaUser className="text-white text-2xl" />
                )}
              </div>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {currentStep === 3 ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h1 className="text-4xl font-bold mb-2 text-primary">Success! 🎉</h1>
                  <p className="text-muted">Your account has been created</p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h1 className="text-4xl font-bold mb-2 text-primary">Create Account</h1>
                  <p className="text-muted">Join us today and get started</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {currentStep !== 3 && (
            <>
              {/* Progress Steps */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2].map((step) => (
                  <motion.div
                    key={step}
                    className={`h-2 rounded-full ${currentStep >= step ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'}`}
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ delay: step * 0.1 }}
                  />
                ))}
              </div>

              {/* Social Signup Buttons */}
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
                    onClick={() => handleSocialSignup(social.name)}
                    className="glass-effect p-4 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-800 dark:to-black hover:shadow-lg transition-all duration-300"
                    aria-label={`Sign up with ${social.label}`}
                    title={`Sign up with ${social.label}`}
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

              {/* Signup Form */}
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-5"
                    >
                      {/* Name Input */}
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name="name"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                          required
                        />
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="email"
                          name="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                          required
                        />
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!formData.name || !formData.email}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue
                      </motion.button>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-5"
                    >
                      {/* Password Input */}
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
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

                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                  i < passwordStrength
                                    ? passwordStrength === 1
                                      ? 'bg-red-500'
                                      : passwordStrength === 2
                                      ? 'bg-orange-500'
                                      : passwordStrength === 3
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                    : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted">
                            {passwordStrength === 1 && 'Weak password'}
                            {passwordStrength === 2 && 'Fair password'}
                            {passwordStrength === 3 && 'Good password'}
                            {passwordStrength === 4 && 'Strong password'}
                          </p>
                        </motion.div>
                      )}

                      {/* Confirm Password Input */}
                      <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted" />
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full pl-12 pr-12 py-4 glass-effect rounded-xl text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted hover:text-primary transition-colors"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formData.confirmPassword && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-12 top-1/2 transform -translate-y-1/2"
                          >
                            {passwordsMatch ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaTimes className="text-red-500" />
                            )}
                          </motion.div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-4 glass-effect rounded-xl text-primary font-semibold hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all duration-300"
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isLoading || !passwordsMatch || passwordStrength < 2}
                          className="flex-1 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-3 border-white border-t-transparent rounded-full mx-auto"
                            />
                          ) : (
                            'Create Account'
                          )}
                          {isLoading && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </>
          )}

          {/* Success Message or Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            {currentStep === 3 ? (
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                Go to Login →
              </Link>
            ) : (
              <>
                <span className="text-muted">Already have an account? </span>
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  Sign in
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl -z-10"></div>
      </motion.div>
    </div>
  )
}
