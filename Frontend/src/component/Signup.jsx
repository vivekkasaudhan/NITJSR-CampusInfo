import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("Admin");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">
            Create account
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Choose role and continue
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {["Admin", "User", "Society"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                role === item
                  ? "bg-white shadow text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder={`Enter ${role} name`}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
              />
            </div>
          </div>

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

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
          >
            Sign up as {role}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-orange-500 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}