import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { ServiceCenter, Service, FAQ, Booking, Stat } from "./types";

export const Header: React.FC<{
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  setIsSignInOpen: (open: boolean) => void;
  setIsSignUpOpen: (open: boolean) => void;
}> = ({ currentTab, setCurrentTab, setIsSignInOpen, setIsSignUpOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="text-indigo-600 font-bold text-2xl cursor-pointer tracking-tight">
              QueueWise<span className="text-gray-800">Pro</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {["home", "queue", "booking", "dashboard", "help"].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`${
                  currentTab === tab
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-600 hover:text-indigo-600"
                } px-3 py-2 text-sm font-medium transition-colors duration-200`}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace("help", "Help & FAQ")}
              </button>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSignInOpen(true)}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <i
                className={`fas ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                } text-xl`}
              ></i>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-4 animate-slide-down">
            {["home", "queue", "booking", "dashboard", "help"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setCurrentTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`${
                  currentTab === tab ? "text-indigo-600" : "text-gray-600"
                } block py-2 text-sm font-medium hover:text-indigo-600 transition-colors duration-200`}
              >
                {tab.charAt(0).toUpperCase() +
                  tab.slice(1).replace("help", "Help & FAQ")}
              </button>
            ))}
            <button
              onClick={() => {
                setIsSignInOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUpOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="block py-2 text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Sign Up
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              About QueueWise Pro
            </h3>
            <p className="text-sm leading-relaxed">
              QueueWise Pro revolutionizes queue management with AI-driven
              solutions for seamless experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Queue Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Book Slot
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Help & FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm">support@queuewisepro.com</p>
            <p className="text-sm mt-2">+1 (800) 123-4567</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© 2025 QueueWise Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const SignInModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export const SignUpModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl transform transition-transform duration-300 scale-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export const ChartWrapper: React.FC<{
  id: string;
  option: any;
  height?: string;
}> = ({ id, option, height = "h-64" }) => {
  useEffect(() => {
    const chartDom = document.getElementById(id);
    if (!chartDom) return;
    const chart = echarts.init(chartDom);
    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [id, option]);

  return (
    <div
      id={id}
      className={`w-full ${height} rounded-lg shadow-md bg-white`}
    ></div>
  );
};

export const HomePage: React.FC = () => {
  const features = [
    {
      title: "Real-Time Queue Monitoring",
      description: "Track queue status instantly.",
      icon: "fas fa-clock",
    },
    {
      title: "AI-Powered Booking",
      description: "Optimize your appointments.",
      icon: "fas fa-robot",
    },
    {
      title: "User-Friendly Dashboard",
      description: "Manage bookings easily.",
      icon: "fas fa-tachometer-alt",
    },
  ];
  const testimonials = [
    {
      name: "John Doe",
      role: "Customer",
      quote: "QueueWise Pro saved me hours!",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  return (
    <div>
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521747116042-5a810773fed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Smarter Queuing Starts Here
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            Streamline your experience with QueueWise Pro’s AI-driven solutions.
          </p>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Features
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <i
                  className={`${feature.icon} text-indigo-600 text-3xl mb-4`}
                ></i>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            What Our Users Say
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="mt-4 text-gray-900 font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-lg">
            Join thousands of users managing queues effortlessly.
          </p>
          <button className="mt-6 bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export const QueueStatusPage: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const centers: ServiceCenter[] = [
    {
      id: 1,
      name: "Downtown Center",
      address: "123 Main St",
      waitTime: "15 min",
      category: "General",
      image:
        "https://images.unsplash.com/photo-1516321310766-61f6f7c0e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Uptown Center",
      address: "456 Oak Ave",
      waitTime: "10 min",
      category: "Express",
      image:
        "https://images.unsplash.com/photo-1516321310766-61f6f7c0e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
  ];

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || center.category === selectedCategory)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Real-Time Queue Status
      </h1>
      <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search centers..."
          className="flex-1 border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Express">Express</option>
        </select>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={center.image}
              alt={center.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {center.name}
              </h3>
              <p className="mt-1 text-gray-600 text-sm">{center.address}</p>
              <p className="mt-2 text-indigo-600 font-medium">
                Wait Time: {center.waitTime}
              </p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BookingPage: React.FC = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [center, setCenter] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const centers: ServiceCenter[] = [
    {
      id: 1,
      name: "Downtown Center",
      address: "123 Main St",
      waitTime: "15 min",
    },
    {
      id: 2,
      name: "Uptown Center",
      address: "456 Oak Ave",
      waitTime: "10 min",
    },
  ];
  const services: Service[] = [
    { id: 1, name: "General Service", duration: "30 min", price: "$50" },
    { id: 2, name: "Express Service", duration: "15 min", price: "$30" },
  ];

  const chartOption = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        data: [10, 20, 15, 25, 30],
        smooth: true,
        color: "#4f46e5",
      },
    ],
  };

  const handleNextStep = () => {
    if (bookingStep < 4) setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Book Your Slot
      </h1>
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 text-center ${
                bookingStep >= step ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${
                  bookingStep >= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {step}
              </div>
              <p className="mt-2 text-sm font-medium">
                {step === 1
                  ? "Center"
                  : step === 2
                  ? "Service"
                  : step === 3
                  ? "Date & Time"
                  : "Confirm"}
              </p>
            </div>
          ))}
        </div>
        {bookingStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Select Center
            </h2>
            <select
              value={center}
              onChange={(e) => setCenter(e.target.value)}
              className="mt-4 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option value="">Select a center</option>
              {centers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleNextStep}
              disabled={!center}
              className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
        {bookingStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Select Service
            </h2>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="mt-4 block w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={!service}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {bookingStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Select Date & Time
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={!date || !time}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {bookingStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Booking
            </h2>
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">
                <strong>Center:</strong> {center}
              </p>
              <p className="text-gray-600">
                <strong>Service:</strong> {service}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {date}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {time}
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Previous
              </button>
              <button
                onClick={() => alert("Booking Confirmed!")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Booking Trends</h2>
        <ChartWrapper id="booking-chart" option={chartOption} height="h-80" />
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const stats: Stat[] = [
    {
      title: "Total Bookings",
      value: "24",
      icon: "fas fa-ticket-alt",
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Upcoming",
      value: "5",
      icon: "fas fa-calendar-check",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];
  const bookings: Booking[] = [
    {
      center: "Downtown Center",
      service: "General Service",
      date: "2025-04-27",
      time: "10:00 AM",
      predictedWait: "15 min",
      status: "Confirmed",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Welcome Back!
        </h1>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bg} p-6 rounded-lg shadow-md flex items-center space-x-4`}
          >
            <i className={`${stat.icon} ${stat.color} text-3xl`}></i>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Your Bookings</h2>
        <div className="mt-6 space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-gray-600">
                  <strong>Center:</strong> {booking.center}
                </p>
                <p className="text-gray-600">
                  <strong>Service:</strong> {booking.service}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {booking.date}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const stats: Stat[] = [
    {
      title: "Total Centers",
      value: "12",
      icon: "fas fa-building",
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Active Users",
      value: "1,245",
      icon: "fas fa-users",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
  ];
  const chartOption = {
    xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr"] },
    yAxis: { type: "value" },
    series: [{ type: "bar", data: [100, 150, 200, 180], color: "#4f46e5" }],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Admin Dashboard
      </h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bg} p-6 rounded-lg shadow-md flex items-center space-x-4`}
          >
            <i className={`${stat.icon} ${stat.color} text-3xl`}></i>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900">
          Performance Metrics
        </h2>
        <ChartWrapper id="admin-chart" option={chartOption} height="h-80" />
      </div>
    </div>
  );
};

export const HelpFAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I book a slot?",
      answer:
        "Visit the Book Slot page and follow the steps to select a center, service, and time.",
      category: "Booking",
    },
    {
      id: "2",
      question: "How to check queue status?",
      answer:
        "Go to the Queue Status page to view real-time updates for all centers.",
      category: "Queue",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "All" || faq.category === activeCategory) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Help & FAQ
      </h1>
      <div className="mt-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
        />
        <div className="mt-6 flex flex-wrap gap-4">
          {["All", "Booking", "Queue", "Account"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
              onClick={() =>
                setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
              }
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <i
                  className={`fas ${
                    expandedFAQ === faq.id ? "fa-chevron-up" : "fa-chevron-down"
                  } text-gray-600`}
                ></i>
              </div>
              {expandedFAQ === faq.id && (
                <p className="mt-4 text-gray-600 animate-fade-in">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-12 bg-cover bg-center py-16 rounded-lg"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1516321310766-61f6f7c0e01f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="mt-4 text-sm">
            Have more questions? Reach out to our support team.
          </p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
