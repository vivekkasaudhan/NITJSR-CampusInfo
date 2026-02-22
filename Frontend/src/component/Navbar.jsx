export default function Navbar() {
  return (
    <div className="font-sans scroll-smooth">

      {/* Navbar */}
      <nav className="fixed w-full bg-black/70 backdrop-blur-md text-white z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold tracking-wide text-indigo-400">
            VivekDev
          </h1>

          <ul className="hidden md:flex space-x-8 items-center font-medium">
            <li><a href="#home" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-indigo-400 transition">About</a></li>
            <li><a href="#contact" className="hover:text-indigo-400 transition">Contact</a></li>
            <li>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 rounded-full hover:scale-105 transition cursor-pointer">
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Home Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 px-6"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Premium React Website
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Modern, elegant and responsive one page design built using React and Tailwind CSS.
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gray-100 text-center px-6"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          We create high-quality, scalable and beautiful web applications using modern technologies like React, Tailwind CSS and Node.js.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gray-900 text-white text-center px-6"
      >
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="mb-2 text-gray-300">Email: contact@premium.com</p>
        <p className="text-gray-300">Phone: +91 9876543210</p>
      </section>

    </div>
  );
}