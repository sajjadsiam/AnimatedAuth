'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaGoogle, FaGithub, FaApple, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa'

interface OAuthDemoModalProps {
  provider: string
  onClose: () => void
}

export default function OAuthDemoModal({ provider, onClose }: OAuthDemoModalProps) {
  const providerConfig = {
    Google: {
      icon: FaGoogle,
      color: 'from-red-500 to-orange-500',
      setupUrl: 'https://console.cloud.google.com/',
      steps: [
        'Go to Google Cloud Console',
        'Create a new project or select existing',
        'Navigate to APIs & Services → Credentials',
        'Create OAuth client ID',
        'Add authorized redirect URI: http://localhost:3000/api/auth/google/callback',
        'Copy Client ID and Client Secret to .env.local',
      ],
    },
    GitHub: {
      icon: FaGithub,
      color: 'from-gray-700 to-gray-900',
      setupUrl: 'https://github.com/settings/developers',
      steps: [
        'Go to GitHub Developer Settings',
        'Click "New OAuth App"',
        'Set Homepage URL: http://localhost:3000',
        'Set Authorization callback URL: http://localhost:3000/api/auth/github/callback',
        'Register application',
        'Copy Client ID and generate Client Secret',
        'Add both to .env.local',
      ],
    },
    Apple: {
      icon: FaApple,
      color: 'from-gray-600 to-gray-800',
      setupUrl: 'https://developer.apple.com/account/',
      steps: [
        'Go to Apple Developer Portal',
        'Navigate to Certificates, Identifiers & Profiles',
        'Create Service ID',
        'Enable Sign In with Apple',
        'Configure domains and return URLs',
        'Create private key',
        'Add all credentials to .env.local',
      ],
    },
  }

  const config = providerConfig[provider as keyof typeof providerConfig]
  const Icon = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Close modal"
            title="Close"
          >
            <FaTimes className="text-gray-400 hover:text-white" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className={`inline-block p-4 rounded-2xl bg-gradient-to-br ${config.color} mb-4`}>
              <Icon className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              {provider} OAuth Setup
            </h2>
            <p className="text-muted">
              Configure {provider} authentication for your app
            </p>
          </div>

          {/* Demo Notice */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-semibold text-yellow-400 mb-1">Demo Mode</h3>
                <p className="text-sm text-yellow-200/80">
                  This is a UI demonstration. To enable actual {provider} authentication, 
                  follow the setup steps below.
                </p>
              </div>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Setup Steps:</h3>
            <div className="space-y-3">
              {config.steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-secondary flex-1">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Environment Variables */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-3">Add to .env.local:</h3>
            <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm border border-gray-700">
              <code className="text-green-400">
                {provider === 'Google' && (
                  <>
                    GOOGLE_CLIENT_ID=your_client_id_here<br />
                    GOOGLE_CLIENT_SECRET=your_client_secret_here
                  </>
                )}
                {provider === 'GitHub' && (
                  <>
                    GITHUB_CLIENT_ID=your_client_id_here<br />
                    GITHUB_CLIENT_SECRET=your_client_secret_here
                  </>
                )}
                {provider === 'Apple' && (
                  <>
                    APPLE_CLIENT_ID=your_service_id_here<br />
                    APPLE_TEAM_ID=your_team_id_here<br />
                    APPLE_KEY_ID=your_key_id_here<br />
                    APPLE_PRIVATE_KEY=your_private_key_here
                  </>
                )}
              </code>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={config.setupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Open {provider} Console</span>
              <FaExternalLinkAlt className="text-sm" />
            </a>
            <a
              href="/OAUTH_SETUP.md"
              target="_blank"
              className="flex-1 py-3 px-4 glass-effect rounded-xl text-primary font-semibold hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-600"
            >
              <span>View Full Guide</span>
              <FaCheckCircle className="text-sm" />
            </a>
          </div>

          {/* Footer Note */}
          <p className="text-center text-muted text-sm mt-6">
            💡 Tip: Check <code className="px-2 py-1 bg-gray-800 rounded">OAUTH_SETUP.md</code> for detailed instructions
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
