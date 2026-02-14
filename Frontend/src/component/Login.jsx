import { Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Welcome back
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="relative mt-2">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-orange-500 font-medium cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}