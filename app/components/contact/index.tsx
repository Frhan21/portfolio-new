import React from "react";

const Contact = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-start justify-center gap-10 px-4 mt-16 mx-auto max-w-7xl my-10">
      {/* Left Section - Text Intro */}
      <div className="md:w-1/2">
        <header className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-1 bg-orange-500" />
            <h2 className="text-xl tracking-wide font-bold">Contact me</h2>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Let's Talk{" "}
            <span className="font-normal italic text-orange-500">
              About Project
            </span>
          </h1>
          <p className="text-lg italic mt-4 text-gray-600 dark:text-gray-400 max-w-md">
            Interested in collaborating or starting a project together? Feel
            free to reach out!
          </p>
        </header>
      </div>

      {/* Right Section - Contact Form */}
      <div className="md:w-1/2 w-full max-w-3xl">
        <form className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Your Name*
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g., John Doe"
                autoComplete="name"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="e.g., +62 812-3456-7890"
              autoComplete="tel"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Your Message*
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="Tell me more about your project or idea..."
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 bg-black dark:bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 transition-all"
          >
            <span>Submit</span>
            <span className="text-orange-500 text-lg">→</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
