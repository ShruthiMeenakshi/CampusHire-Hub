import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeSlash } from 'phosphor-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rememberMe) {
      localStorage.setItem('ch_email', email)
    }
    navigate('/student/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Section - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm">
              New user?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Create an account
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Welcome Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center px-12">
        <div className="text-white text-center">
          <div className="mb-8 flex justify-center">
            <img src="/media/vcetLogo.jpg" alt="VCET Logo" className="h-32 w-32 rounded-full shadow-lg" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Hello there,</h2>
          <p className="text-xl text-blue-100">Welcome back</p>
        </div>
      </div>
    </div>
  )
}
