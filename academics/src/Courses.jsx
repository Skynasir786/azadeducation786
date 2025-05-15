import React, { useState, useEffect,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBook, FiUser, FiMapPin, FiClock, FiCalendar, FiUserPlus, FiAward, FiPlay, FiTrendingUp, FiGrid,FiUsers,FiBookOpen,FiGlobe,FiFilter,  FiBarChart, FiX, FiRefreshCw,FiDollarSign, FiStar, FiVideo,FiDownload, FiArrowRight ,FiCheck,FiChevronDown } from "react-icons/fi";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
// import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaChalkboard,FaBookOpen,FaLinkedin,FaTwitter,FaEnvelope ,FaCalendarAlt,FaClock,FaUser,FaDollarSign, FaCode,FaBookmark,FaQuoteLeft,FaGraduationCap,FaCheckCircle,FaClipboardList,FaArrowRight } from 'react-icons/fa';
import { BsLightningCharge, BsStars,BsPeopleFill, BsBookFill } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {Link} from "react-router-dom"
// Constantimport { useNavigate } from "react-router-dom";

const CURRENT_USER = "huzaifa8883";
const CURRENT_DATE = "2025-02-03 01:51:27";
const currentTime = "2025-02-03 03:19:16";
const getLevelColor = (level) => {
  const colors = {
    'Beginner': '#22c55e',    // green-500
    'Intermediate': '#3b82f6', // blue-500
    'Advanced': '#8b5cf6',    // purple-500
    'Expert': '#ef4444'       // red-500
  };
  return colors[level] || '#6b7280'; // gray-500 as default
};
  const currentUser = "huzaifa8883";
  const filterOptions = {
    category: [
      // 1. Academic Courses (School & College)
      { value: "Matric & Intermediate", label: "Matric & Intermediate (Science, Arts, Commerce)" },
      { value: "O-Level & A-Level", label: "O-Level & A-Level (Cambridge & Federal Board)" },
      { value: "Engineering Entrance Exams", label: "Engineering Entrance Exams (ECAT, NUST, PIEAS, GIKI)" },
      { value: "Medical Entrance Exams", label: "Medical Entrance Exams (MDCAT, NUMS, AKU)" },
      { value: "CSS & FPSC Preparation", label: "CSS & FPSC Preparation" },
      { value: "Bachelors & Masters", label: "Bachelors & Masters (BS, MS, MBA, MPhil, PhD)" },
    
      // 2. Professional & Skill-Based Courses
      { value: "Freelancing", label: "Freelancing (Fiverr, Upwork, PeoplePerHour)" },
      { value: "Graphic Designing", label: "Graphic Designing (Photoshop, Illustrator, Canva)" },
      { value: "Digital Marketing", label: "Digital Marketing (SEO, FB Ads, Google Ads, SMM)" },
      { value: "E-commerce", label: "E-commerce (Daraz, Amazon, Shopify, eBay, Etsy)" },
      { value: "Web Development", label: "Web Development (HTML, CSS, JS, React, Laravel, WP)" },
      { value: "App Development", label: "App Development (Flutter, React Native, Android, iOS)" },
      { value: "Cyber Security", label: "Cyber Security & Ethical Hacking" },
      { value: "Data Science & AI", label: "Data Science & AI (Python, ML, DL, ChatGPT Tools)" },
    
      // 3. Language & Communication Courses
      { value: "English Language", label: "English Language (IELTS, TOEFL, Spoken)" },
      { value: "Urdu & Pashto Writing", label: "Urdu & Pashto Writing" },
      { value: "Foreign Languages", label: "Chinese, German, French Language Courses" },
    
      // 4. Government & Competitive Exam Preparation
      { value: "Government Exams", label: "CSS, PMS, FPSC, PPSC, SPSC, KPPSC, BPSC" },
      { value: "Military Test Prep", label: "Pak Army, Navy, Air Force (ISSB, Initial Tests)" },
      { value: "Police & Agencies Prep", label: "Police, FIA, ASF, NAB Exam Preparation" },
      { value: "University Entry Tests", label: "LUMS, IBA, FAST, GIKI Entry Tests" },
    
      // 5. Business & Finance
      { value: "Accounting & Finance", label: "Accounting & Finance (QuickBooks, Excel, Tally, SAP)" },
      { value: "Stock & Crypto Trading", label: "Stock Market & Crypto Trading" },
      { value: "Entrepreneurship", label: "Entrepreneurship & Business Startup Guide" },
    
      // 6. Personal Development
      { value: "Time Management", label: "Time Management & Productivity" },
      { value: "Public Speaking", label: "Public Speaking & Communication Skills" },
      { value: "Leadership", label: "Leadership & Team Management" },
      { value: "Career Counseling", label: "Career Counseling & Job Interview Preparation" },
    
      // 7. Islamic & Religious Studies
      { value: "Quran & Tajweed", label: "Quran Tafseer & Tajweed" },
      { value: "Hadith & Fiqh", label: "Hadith & Fiqh Courses" },
      { value: "Islamic Finance", label: "Islamic Banking & Finance" }
    ],
    
    
    level: [
      { value: "", label: "All Levels" },
      { value: "Beginner", label: "Beginner" },
      { value: "Intermediate", label: "Intermediate" },
      { value: "Advanced", label: "Advanced" },
      { value: "Expert", label: "Expert" }
    ],
    province: [
      { value: "", label: "Select Province" },
      { value: "Punjab", label: "Punjab" },
      { value: "Sindh", label: "Sindh" },
      { value: "KPK", label: "Khyber Pakhtunkhwa" },
      { value: "Balochistan", label: "Balochistan" },
      { value: "GB", label: "Gilgit Baltistan" },
      { value: "AJK", label: "Azad Kashmir" },
      { value: "ICT", label: "Islamabad Capital Territory" }
    ],
    // Cities will be dynamically populated based on selected province
    cityByProvince: {
      Punjab: [
        { value: "", label: "Select City" },
        { value: "Lahore", label: "Lahore" },
        { value: "Faisalabad", label: "Faisalabad" },
        { value: "Rawalpindi", label: "Rawalpindi" },
        { value: "Multan", label: "Multan" },
        { value: "Gujranwala", label: "Gujranwala" },
        { value: "Sialkot", label: "Sialkot" },
        { value: "Bahawalpur", label: "Bahawalpur" },
        // Add other Punjab cities...
      ],
      Sindh: [
        { value: "", label: "Select City" },
        { value: "Karachi", label: "Karachi" },
        { value: "Hyderabad", label: "Hyderabad" },
        { value: "Sukkur", label: "Sukkur" },
        { value: "Larkana", label: "Larkana" },
        // Add other Sindh cities...
      ],
      KPK: [
        { value: "", label: "Select City" },
        { value: "Peshawar", label: "Peshawar" },
        { value: "Mardan", label: "Mardan" },
        { value: "Swat", label: "Swat" },
        { value: "Abbottabad", label: "Abbottabad" },
        // Add other KPK cities...
      ],
      Balochistan: [
        { value: "", label: "Select City" },
        { value: "Quetta", label: "Quetta" },
        { value: "Gawadar", label: "Gawadar" },
        { value: "Turbat", label: "Turbat" },
        { value: "Khuzdar", label: "Khuzdar" },
        // Add other Balochistan cities...
      ],
      GB: [
        { value: "", label: "Select City" },
        { value: "Gilgit", label: "Gilgit" },
        { value: "Skardu", label: "Skardu" },
        { value: "Hunza", label: "Hunza" },
        // Add other GB cities...
      ],
      AJK: [
        { value: "", label: "Select City" },
        { value: "Muzaffarabad", label: "Muzaffarabad" },
        { value: "Mirpur", label: "Mirpur" },
        { value: "Kotli", label: "Kotli" },
        // Add other AJK cities...
      ],
      ICT: [
        { value: "", label: "Select City" },
        { value: "Islamabad", label: "Islamabad" },
      ]
    },
    ageGroup: [
      { value: "", label: "All Age Groups" },
      { value: "Kids", label: "Kids (7-12)" },
      { value: "Teens", label: "Teens (13-17)" },
      { value: "Young Adults", label: "Young Adults (18-25)" },
      { value: "Adults", label: "Adults (26+)" }
    ],
    duration: [
      { value: "", label: "Any Duration" },
      { value: "0-1 Month", label: "0-1 Month" },
      { value: "1-3 Months", label: "1-3 Months" },
      { value: "3-6 Months", label: "3-6 Months" },
      { value: "6+ Months", label: "6+ Months" }
    ],
    price: [
      { value: "", label: "Any Price" },
      { value: "Free", label: "Free" },
      { value: "Under $50", label: "Under $50" },
      { value: "$50-$100", label: "$50-$100" },
      { value: "$100-$200", label: "$100-$200" },
      { value: "$200+", label: "$200+" }
    ],
     schedule : [
      { value: "", label: "Any Schedule" },
      { value: "Weekdays", label: "Weekdays (10:00 AM - 12:00 PM)" },
      { value: "Weekends", label: "Weekends (2:00 PM - 4:00 PM)" },
      { value: "Evening", label: "Evening (6:00 PM - 8:00 PM)" },
      { value: "Self-Paced", label: "Self-Paced (Study at Your Own Time)" }
    ],
    
  };

// Sample Data
const course = [
  {
    id: 1,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 3,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  },
  {
    id: 4,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 5,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 6,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  },
  {
    id: 1,
    name: "Web Development Masterclass",
    description: "Learn modern web development with React, Node.js, and MongoDB",
    category: "Programming",
    level: "Intermediate",
    city: "Online",
    duration: "12 weeks",
    instructor: {
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson",
      title: "Senior Developer"
    },
    price: 499,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    enrolledStudents: 1234
  },
  {
    id: 2,
    name: "Data Science Fundamentals",
    description: "Master data analysis, Python, and machine learning basics",
    category: "Data Science",
    level: "Beginner",
    city: "Online",
    duration: "10 weeks",
    instructor: {
      name: "Michael Chen",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen",
      title: "Data Scientist"
    },
    price: 599,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    enrolledStudents: 892
  },
  {
    id: 3,
    name: "UI/UX Design Workshop",
    description: "Create beautiful and functional user interfaces",
    category: "Design",
    level: "Advanced",
    city: "Online",
    duration: "8 weeks",
    instructor: {
      name: "Emma Davis",
      avatar: "https://ui-avatars.com/api/?name=Emma+Davis",
      title: "UX Designer"
    },
    price: 399,
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    enrolledStudents: 567
  }
];

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
  
    
      const navigate = useNavigate();
    
  
 useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/getcourse"); // Replace with your API endpoint
        setCourses(response.data.courses);
        console.log(response.data.courses)
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
    isScrolled 
      ? "bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md shadow-lg" 
      : "bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md"
  }`}>
    {/* Rest of your navbar code remains the same, just updating the color-related classes */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center">
    <div className="relative group">
      <div className="flex items-center space-x-3">
        {/* Main Logo Container */}
        <div className="relative group cursor-pointer">
          {/* Background glow effect */}
          <div className="absolute inset-[-4px] bg-gradient-to-r from-rose-600/50 via-orange-500/50 to-amber-500/50 rounded-xl blur-md group-hover:blur-lg transition-all duration-500"></div>
          
          <div className="relative">
            {/* Main logo shape - Made wider than height */}
            <div className="relative w-16 h-12 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-xl transform transition-all duration-500 group-hover:scale-105 shadow-lg group-hover:shadow-orange-500/50">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl animate-shine"></div>
              
              {/* Glass effect */}
              <div className="absolute inset-[1px] bg-gradient-to-br from-white/20 to-transparent rounded-xl backdrop-blur-sm">
                {/* Diagonal lines pattern */}
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,white_2px,white_3px)]"></div>
              </div>
              
              {/* Center content with 3D effect */}
              <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-500">
                <span className="relative text-white text-2xl font-bold font-sans tracking-wider group-hover:scale-110">
                  {/* Text shadow for 3D effect */}
                  <span className="absolute -top-[1px] -left-[1px] text-orange-200/50">A</span>
                  <span className="relative">A</span>
                  <span className="absolute -bottom-[1px] -right-[1px] text-rose-700/50">A</span>
                </span>
              </div>
  
              {/* Animated border with gradient */}
              <div className="absolute inset-0 rounded-xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100">
                  <div className="w-full h-full rounded-xl border border-transparent border-t-white/40"></div>
                </div>
              </div>
            </div>
  
            {/* Enhanced particles */}
            <div className="absolute -top-1 -right-1 w-3 h-3">
              <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5">
              <div className="absolute inset-0 bg-rose-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75 delay-300"></div>
            </div>
  
            {/* Sparkle effects */}
            <div className="absolute -top-2 left-1/2 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
            <div className="absolute top-1/2 -right-2 w-1 h-1 bg-white rounded-full animate-twinkle delay-150"></div>
          </div>
        </div>
  
        {/* Text container with enhanced styling */}
        <div className="relative">
          <h1 className="text-3xl font-bold mb-0">
            <span className="relative inline-block">
              {/* Main text with vibrant gradient */}
              <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent font-sans">
                Azad
              </span>
              {/* Enhanced glow effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 blur-md opacity-50 bg-clip-text text-transparent animate-pulse">
                Azad
              </span>
              {/* Animated underline with gradient */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 group-hover:w-full transition-all duration-700"></span>
            </span>
          </h1>
          <p className="text-sm font-medium tracking-wide">
            <span className="bg-gradient-to-r from-rose-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
              Education
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  
        {/* Desktop Menu - Updated hover colors */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Courses", "Academies", "Resources", "About"].map((item) => (
            <a
              key={item}
              onClick={() => navigate(`/${item.toLowerCase()}`)}
              className="text-white hover:text-emerald-200 transition-colors font-semibold text-lg"
            >
              {item}
            </a>
          ))}
  
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white hover:text-emerald-200 transition-colors"
          >
            <RiSearchLine className="h-6 w-6" />
          </button>
  
          {/* Notification Button */}
          <div className="relative">
            <button className="text-white hover:text-emerald-200 transition-colors">
              <RiNotificationLine className="h-6 w-6" />
            </button>
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
  
          {/* Get Started Button - Updated gradient */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
  
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <RiCloseLine className="h-6 w-6" /> : <RiMenuLine className="h-6 w-6" />}
        </button>
      </div>
  
      {/* Mobile Menu - Updated gradient */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-r from-emerald-600 to-blue-600 backdrop-blur-md border-t border-emerald-500"
          >
            <div className="flex flex-col space-y-4 p-4">
              {["Courses", "Teachers", "Resources", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-emerald-200 font-medium text-lg"
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  
    {/* Search Overlay - No color changes needed */}
    <AnimatePresence>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
            <div className="flex items-center">
              <RiSearchLine className="text-gray-400 mr-3 h-6 w-6" />
              <input
                type="text"
                placeholder="Search courses, teachers, or topics..."
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              <button onClick={() => setShowSearch(false)} className="text-gray-400 hover:text-gray-600">
                <RiCloseLine className="h-6 w-6" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </nav>
  );
};

// NavLink Component
const NavLink = ({ href, children }) => (

  <a
    href={href}
    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    {children}
  </a>
);

// Hero Section
const Hero = () => (
    <div className="relative fonting min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img
        src="https://c0.wallpaperflare.com/preview/980/37/200/training-course-learning-and-development-online.jpg"
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>

    {/* Main Content */}
    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute -left-16 -top-16">
              <BsStars className="text-4xl text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -right-16 -top-8">
              <BsLightningCharge className="text-3xl text-blue-400 animate-bounce" />
            </div>
            <IoSchoolOutline className="text-6xl text-white opacity-80" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Empower Your Future with
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Professional Education
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
        >
          Join thousands of learners worldwide and transform your career with our expert-led courses
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {[
            { icon: FiAward, text: "Certified Courses" },
            { icon: FiUserPlus, text: "Expert Instructors" },
            { icon: FiTrendingUp, text: "Career Growth" },
            { icon: FiGrid, text: "Interactive Learning" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
            >
              <feature.icon className="text-2xl text-blue-400 mb-2 mx-auto" />
              <p className="text-white text-sm">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-blue-600/30">
            <FiBook className="text-white text-xl group-hover:rotate-12 transition-transform" />
            <span className="text-white font-semibold">Browse Courses</span>
          </button>
          
          <button className="group px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:ring-2 hover:ring-indigo-400/50">
  <FiPlay className="text-white text-xl group-hover:scale-110 transition-transform" />
  <span className="text-white font-semibold">Watch Demo</span>
</button>
        </motion.div>

        {/* Stats */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1 }}
  className="mt-12 container mx-auto"
>
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
    {/* Students Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group shadow-lg shadow-blue-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <BsPeopleFill className="text-3xl text-blue-400 group-hover:text-blue-300 transition-colors" />
        <FiUsers className="text-2xl text-blue-400/50 group-hover:text-blue-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 text-transparent bg-clip-text mb-2">10K+</div>
      <div className="text-sm text-blue-300">Active Students</div>
    </motion.div>

    {/* Courses Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-purple-900 to-purple-800 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg shadow-purple-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <BsBookFill className="text-3xl text-purple-400 group-hover:text-purple-300 transition-colors" />
        <FiBookOpen className="text-2xl text-purple-400/50 group-hover:text-purple-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-100 text-transparent bg-clip-text mb-2">200+</div>
      <div className="text-sm text-purple-300">Online Courses</div>
    </motion.div>

    {/* Countries Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-indigo-900 to-indigo-800 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 group shadow-lg shadow-indigo-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <FiGlobe className="text-3xl text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        <FiGlobe className="text-2xl text-indigo-400/50 group-hover:text-indigo-300 transition-colors" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-indigo-100 text-transparent bg-clip-text mb-2">1000+</div>
      <div className="text-sm text-indigo-300">Academics</div>
    </motion.div>

    {/* Time Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-cyan-900 to-cyan-800 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group shadow-lg shadow-cyan-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <FiClock className="text-3xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
        <FiCalendar className="text-2xl text-cyan-400/50 group-hover:text-cyan-300 transition-colors" />
      </div>
      <div className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-cyan-100 text-transparent bg-clip-text mb-2">2025-02-03</div>
      <div className="text-sm text-cyan-300">02:29:39 UTC</div>
    </motion.div>

    {/* User Card */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="col-span-1 bg-gradient-to-br from-gray-900 via-teal-900 to-teal-800 backdrop-blur-md rounded-2xl p-6 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 group shadow-lg shadow-teal-900/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold">
            H
          </span>
        </div>
        <FiUsers className="text-2xl text-teal-400/50 group-hover:text-teal-300 transition-colors" />
      </div>
      <div className="text-lg font-bold bg-gradient-to-r from-teal-300 to-teal-100 text-transparent bg-clip-text mb-2 truncate">
        huzaifa8883
      </div>
      <div className="text-sm text-teal-300">Active User</div>
    </motion.div>
  </div>

  {/* Enhanced animation line */}
  <div className="max-w-6xl mx-auto mt-8 px-4">
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      className="h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
    />
  </div>
</motion.div>
      </motion.div>
    </div>

    {/* Bottom Wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
);

// Course Card Component
const CourseCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("http://localhost:5000/users/getcourse"); // Replace with your API endpoint
          setCourses(response.data.courses);
          console.log(response.data.courses)
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
          setLoading(false);
        }
      };
      fetchCourses();
    }, []);
  return (
    <>
 {courses.map((course, index) => (
  <motion.div
    key={course._id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      y: -12,
      scale: 1.02,
      transition: { duration: 0.5, ease: "easeOut" }
    }}
    className="relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-[2.8rem] overflow-hidden
      shadow-[0_15px_60px_rgba(8,_112,_184,_0.18)] hover:shadow-[0_25px_80px_rgba(8,_112,_184,_0.28)]
      transform transition-all duration-700 border border-blue-100/50
      backdrop-blur-3xl"
  >
    {/* Premium Image Section with Enhanced Overlay */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-t 
        from-[#000B1D]/98 via-[#000B1D]/75 to-transparent z-10 
        opacity-90 group-hover:opacity-80 transition-all duration-700" />
      
      {/* Course Image with Premium Animation */}
      <img 
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-[22rem] object-cover transform group-hover:scale-110 
          transition-all duration-1200 ease-out filter brightness-110 contrast-105"
      />

      {/* Premium Glass Effect Top Bar */}
      <div className="absolute top-6 left-0 right-0 px-8 z-20 flex justify-between items-center">
        {/* Enhanced Level Indicator */}
        <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-2xl 
          px-7 py-3.5 rounded-full shadow-2xl border border-white/60
          hover:bg-white/98 hover:border-blue-200/60 transition-all duration-500">
          <div className="relative">
            <div className="w-3.5 h-3.5 rounded-full animate-pulse"
              style={{ backgroundColor: getLevelColor(course.level) }} />
            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full animate-ping opacity-50"
              style={{ backgroundColor: getLevelColor(course.level) }} />
          </div>
          <span className="text-sm font-extrabold bg-gradient-to-r 
            from-blue-900 to-blue-700 text-transparent bg-clip-text tracking-wider">
            {course.level.toUpperCase()}
          </span>
        </div>

        {/* Premium Price Tag with Glow Effect */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
          px-8 py-3.5 rounded-full font-bold shadow-2xl 
          flex items-center space-x-2.5 border border-white/20
          hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 
          transition-all duration-500 group/price
          hover:shadow-[0_0_30px_rgba(37,_99,_235,_0.3)]">
          <FaDollarSign className="text-blue-200 text-sm group-hover/price:scale-110 
            transition-transform duration-300" />
          <span className="text-2xl text-white font-black tracking-wider">
            {course.price}
          </span>
        </div>
      </div>

      {/* Enhanced Language Badge with Glowing Effect */}
      <div className="absolute top-36 left-8 z-20">
        <div className="flex items-center space-x-3.5 bg-black/35 backdrop-blur-2xl 
          px-7 py-3.5 rounded-full border border-white/15 group/lang
          hover:bg-black/45 hover:border-white/25 transition-all duration-500
          hover:shadow-[0_0_25px_rgba(59,_130,_246,_0.2)]">
          <FaCode className="text-blue-300 text-lg group-hover/lang:rotate-12 
            transition-transform duration-300" />
          <span className="text-sm font-bold text-white tracking-wider">
            {course.language}
          </span>
        </div>
      </div>

      {/* Premium Title Section with Enhanced Typography */}
      <div className="absolute bottom-0 left-0 right-0 p-9 z-20">
        <h3 className="text-3xl font-extrabold text-white leading-tight
          group-hover:text-blue-100 transition-colors duration-500
          tracking-tight drop-shadow-2xl">
          {course.title}
        </h3>
      </div>
    </div>

    {/* Enhanced Content Section with More Elegant Spacing */}
    <div className="p-9 space-y-9">
      {/* Modern Category Tags with Hover Effects */}
      <div className="flex flex-wrap gap-3">
        {course.category.split(',').map((cat, i) => (
          <span key={i} className="px-7 py-3 bg-gradient-to-r from-blue-50 via-indigo-50/70 to-purple-50/50
            text-blue-700 rounded-full text-sm font-bold border border-blue-100/80
            hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2.5
            hover:border-blue-200/80 group/tag">
            <FaBookmark className="text-blue-500 text-sm group-hover/tag:rotate-12 
              transition-transform duration-300" />
            <span className="tracking-wide">{cat.trim()}</span>
          </span>
        ))}
      </div>

      {/* Premium Description Box with Enhanced Glass Effect */}
      <div className="bg-gradient-to-br from-blue-50/60 via-white to-purple-50/40 p-8 
        rounded-2xl border border-blue-100/90 hover:shadow-xl transition-all duration-500
        group/desc hover:border-blue-200/90">
        <div className="flex items-start space-x-4">
          <FaQuoteLeft className="text-blue-400 text-xl group-hover/desc:rotate-12 
            transition-transform duration-300" />
          <p className="text-gray-700 text-sm leading-relaxed font-medium">
            {course.description}
          </p>
        </div>
      </div>

      {/* Learning Outcomes with Enhanced Visual Hierarchy */}
      <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/60 p-8 rounded-2xl 
        border border-blue-200/60 hover:shadow-xl transition-all duration-500 group/learn
        hover:border-blue-300/60">
        <div className="flex items-center space-x-4 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl
            shadow-lg group-hover/learn:shadow-blue-500/30 transition-all duration-500">
            <FaGraduationCap className="text-white text-xl group-hover/learn:rotate-12 
              transition-transform duration-300" />
          </div>
          <h4 className="text-lg font-extrabold text-blue-900 tracking-wide">
            What you'll learn
          </h4>
        </div>
        <ul className="space-y-3.5">
          {course.whatYouWillLearn.filter(Boolean).map((item, i) => (
            <li key={i} className="flex items-start space-x-3.5 group/item">
              <FaCheckCircle className="text-blue-500 text-lg mt-0.5 flex-shrink-0 
                group-hover/item:scale-110 transition-transform duration-300" />
              <span className="text-blue-800/90 text-sm font-medium">{item.trim()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements Section with Modern Design */}
      <div className="bg-gradient-to-r from-indigo-50/60 to-purple-50/40 p-8 rounded-2xl 
        border border-indigo-200/60 hover:shadow-xl transition-all duration-500 group/req
        hover:border-indigo-300/60">
        <div className="flex items-center space-x-4 mb-5">
          <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl
            shadow-lg group-hover/req:shadow-indigo-500/30 transition-all duration-500">
            <FaClipboardList className="text-white text-xl group-hover/req:rotate-12 
              transition-transform duration-300" />
          </div>
          <h4 className="text-lg font-extrabold text-indigo-900 tracking-wide">
            Requirements
          </h4>
        </div>
        <ul className="space-y-3.5">
          {course.requirements.filter(Boolean).map((req, i) => (
            <li key={i} className="flex items-start space-x-3.5 group/item">
              <FaArrowRight className="text-indigo-500 text-lg mt-0.5 flex-shrink-0
                group-hover/item:translate-x-1 transition-transform duration-300" />
              <span className="text-indigo-800/90 text-sm font-medium">{req.trim()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Premium Enroll Button with Enhanced Animation */}
      <Link to={`/courses/${course._id}`} className="block">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
            hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700
            text-white font-extrabold py-7 rounded-2xl shadow-2xl
            hover:shadow-[0_15px_45px_-5px_rgba(37,_99,_235,_0.35)] transition-all duration-500
            flex items-center justify-center space-x-4 group/btn
            border border-white/10 hover:border-white/20"
        >
          <span className="text-lg tracking-wider">Enroll Now</span>
          <FaArrowRight className="text-lg group-hover/btn:translate-x-2.5 
            transition-transform duration-500" />
        </motion.button>
      </Link>
    </div>
  </motion.div>
))}
  </>
)
}
  
const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      level: "",
      city: "",
      ageGroup: "",
      duration: "",
      price: "",
      schedule: ""
    });
  };
// Search and Filter Component
const SearchFilters = ({ filters, setFilters, currentUser, currentTime, resetFilters }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    if (activeCategory && selectRef.current) {
      selectRef.current.focus();
    }
  }, [activeCategory]);

  useEffect(() => {
    if (filters.province) {
      setAvailableCities(filterOptions.cityByProvince[filters.province] || []);
      setFilters((prev) => ({ ...prev, city: "" }));
    } else {
      setAvailableCities([]);
    }
  }, [filters.province, setFilters]);

  const SelectField = ({ label, icon: Icon, value, onChange, options }) => {
    const isDisabled = label.toLowerCase() === "city" && !filters.province;

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon className="text-gray-400" />
          </div>
          <select
            ref={label.toLowerCase() === activeCategory?.toLowerCase() ? selectRef : null}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={`w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl
              focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
              text-gray-700 appearance-none cursor-pointer transition-all duration-200
              ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-2xl p-8 mb-8 mt-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="p-3 bg-blue-50 rounded-2xl">
            <FiFilter className="text-2xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Search Filters</h2>
            <p className="text-gray-500 text-sm mt-1">Find your perfect match</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* User Info */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
              {currentUser?.[0]?.toUpperCase()}
            </div>
            <span className="ml-3 text-gray-700 font-medium">{"huzaifa8883"}</span>
          </div>

          {/* Time */}
          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2">
            <FiClock className="text-gray-400" />
            <span className="ml-2 text-gray-600 text-sm">{currentTime}</span>
          </div>

          {/* Reset Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetFilters}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-all duration-200"
          >
            <FiRefreshCw className="text-blue-500" />
            <span>Reset</span>
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <FiSearch className="text-xl text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses, instructors, or keywords..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-gray-700 placeholder-gray-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {['category', 'level', 'ageGroup', 'duration', 'price', 'schedule'].map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-2xl cursor-pointer transition-all duration-200
              ${activeCategory === category 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveCategory(category)}
          >
            <div className="flex items-center space-x-3">
              <FiFilter className={`text-xl ${activeCategory === category ? 'text-white' : 'text-blue-500'}`} />
              <span className="font-medium">
                {category === 'ageGroup' ? 'Age Group' : category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Province and City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SelectField
          label="Province"
          icon={FiFilter}
          value={filters.province}
          onChange={(e) => setFilters({ ...filters, province: e.target.value })}
          options={filterOptions.province}
        />

        <SelectField
          label="City"
          icon={FiFilter}
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          options={availableCities}
        />
      </div>

      {/* Active Category Options */}
   {activeCategory && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-10 relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-indigo-50/50 to-blue-50 
        rounded-xl -m-2 blur-xl opacity-70"></div>

      {/* Main Filter Container */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6
        shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-purple-100/50">

        {/* Filter Header */}
        <div className="flex items-center mb-4">
          <FiFilter className="w-5 h-5 text-purple-600 mr-3" />
          <h3 className="text-lg font-bold bg-gradient-to-r from-purple-900 to-indigo-800 
            bg-clip-text text-transparent">
            {activeCategory === 'ageGroup' 
              ? 'Age Group' 
              : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Filter
          </h3>
        </div>

        {/* Enhanced Select Field */}
        <div className="relative">
          <select
            value={filters[activeCategory]}
            onChange={(e) => setFilters({ ...filters, [activeCategory]: e.target.value })}
            className="w-full bg-gray-50/50 border border-purple-100 text-gray-700 
              py-3.5 px-4 pr-10 rounded-lg appearance-none cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400
              transition-all duration-300 hover:border-purple-300"
          >
            <option value="">Select {activeCategory === 'ageGroup' ? 'an age group' : `a ${activeCategory}`}</option>

            {/* Grouped Options */}
            {[
              {
                group: "Academic Courses (School & College)",
                options: [
                  { value: "Matric & Intermediate", label: "Matric & Intermediate (Science, Arts, Commerce)" },
                  { value: "O-Level & A-Level", label: "O-Level & A-Level (Cambridge & Federal Board)" },
                  { value: "Engineering Entrance Exams", label: "Engineering Entrance Exams (ECAT, NUST, PIEAS, GIKI)" },
                  { value: "Medical Entrance Exams", label: "Medical Entrance Exams (MDCAT, NUMS, AKU)" },
                  { value: "CSS & FPSC Preparation", label: "CSS & FPSC Preparation" },
                  { value: "Bachelors & Masters", label: "Bachelors & Masters (BS, MS, MBA, MPhil, PhD)" },
                ]
              },
              {
                group: "Professional & Skill-Based Courses",
                options: [
                  { value: "Freelancing", label: "Freelancing (Fiverr, Upwork, PeoplePerHour)" },
                  { value: "Graphic Designing", label: "Graphic Designing (Photoshop, Illustrator, Canva)" },
                  { value: "Digital Marketing", label: "Digital Marketing (SEO, FB Ads, Google Ads, SMM)" },
                  { value: "E-commerce", label: "E-commerce (Daraz, Amazon, Shopify, eBay, Etsy)" },
                  { value: "Web Development", label: "Web Development (HTML, CSS, JS, React, Laravel, WP)" },
                  { value: "App Development", label: "App Development (Flutter, React Native, Android, iOS)" },
                  { value: "Cyber Security", label: "Cyber Security & Ethical Hacking" },
                  { value: "Data Science & AI", label: "Data Science & AI (Python, ML, DL, ChatGPT Tools)" },
                ]
              },
              {
                group: "Language & Communication Courses",
                options: [
                  { value: "English Language", label: "English Language (IELTS, TOEFL, Spoken)" },
                  { value: "Urdu & Pashto Writing", label: "Urdu & Pashto Writing" },
                  { value: "Foreign Languages", label: "Chinese, German, French Language Courses" },
                ]
              },
              {
                group: "Government & Competitive Exam Preparation",
                options: [
                  { value: "Government Exams", label: "CSS, PMS, FPSC, PPSC, SPSC, KPPSC, BPSC" },
                  { value: "Military Test Prep", label: "Pak Army, Navy, Air Force (ISSB, Initial Tests)" },
                  { value: "Police & Agencies Prep", label: "Police, FIA, ASF, NAB Exam Preparation" },
                  { value: "University Entry Tests", label: "LUMS, IBA, FAST, GIKI Entry Tests" },
                ]
              },
              {
                group: "Business & Finance",
                options: [
                  { value: "Accounting & Finance", label: "Accounting & Finance (QuickBooks, Excel, Tally, SAP)" },
                  { value: "Stock & Crypto Trading", label: "Stock Market & Crypto Trading" },
                  { value: "Entrepreneurship", label: "Entrepreneurship & Business Startup Guide" },
                ]
              },
              {
                group: "Personal Development",
                options: [
                  { value: "Time Management", label: "Time Management & Productivity" },
                  { value: "Public Speaking", label: "Public Speaking & Communication Skills" },
                  { value: "Leadership", label: "Leadership & Team Management" },
                  { value: "Career Counseling", label: "Career Counseling & Job Interview Preparation" },
                ]
              },
              {
                group: "Islamic & Religious Studies",
                options: [
                  { value: "Quran & Tajweed", label: "Quran Tafseer & Tajweed" },
                  { value: "Hadith & Fiqh", label: "Hadith & Fiqh Courses" },
                  { value: "Islamic Finance", label: "Islamic Banking & Finance" },
                ]
              }
            ].map((groupObj) => (
              <optgroup key={groupObj.group} label={groupObj.group}>
                {groupObj.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          {/* Custom Select Arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
            text-purple-600 transition-transform duration-300
            transform group-hover:translate-x-1">
            <FiChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Active Filter Tags */}
        {filters[activeCategory] && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 flex-wrap"
          >
            <motion.span
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full
                bg-purple-100/70 text-purple-700 text-sm font-medium
                border border-purple-200/50"
            >
              {[
                ...[].concat(
                  ...[
                    // flatten all group options for lookup
                    {
                      options: [
                        { value: "Matric & Intermediate", label: "Matric & Intermediate (Science, Arts, Commerce)" },
                        { value: "O-Level & A-Level", label: "O-Level & A-Level (Cambridge & Federal Board)" },
                        { value: "Engineering Entrance Exams", label: "Engineering Entrance Exams (ECAT, NUST, PIEAS, GIKI)" },
                        { value: "Medical Entrance Exams", label: "Medical Entrance Exams (MDCAT, NUMS, AKU)" },
                        { value: "CSS & FPSC Preparation", label: "CSS & FPSC Preparation" },
                        { value: "Bachelors & Masters", label: "Bachelors & Masters (BS, MS, MBA, MPhil, PhD)" },
                        { value: "Freelancing", label: "Freelancing (Fiverr, Upwork, PeoplePerHour)" },
                        { value: "Graphic Designing", label: "Graphic Designing (Photoshop, Illustrator, Canva)" },
                        { value: "Digital Marketing", label: "Digital Marketing (SEO, FB Ads, Google Ads, SMM)" },
                        { value: "E-commerce", label: "E-commerce (Daraz, Amazon, Shopify, eBay, Etsy)" },
                        { value: "Web Development", label: "Web Development (HTML, CSS, JS, React, Laravel, WP)" },
                        { value: "App Development", label: "App Development (Flutter, React Native, Android, iOS)" },
                        { value: "Cyber Security", label: "Cyber Security & Ethical Hacking" },
                        { value: "Data Science & AI", label: "Data Science & AI (Python, ML, DL, ChatGPT Tools)" },
                        { value: "English Language", label: "English Language (IELTS, TOEFL, Spoken)" },
                        { value: "Urdu & Pashto Writing", label: "Urdu & Pashto Writing" },
                        { value: "Foreign Languages", label: "Chinese, German, French Language Courses" },
                        { value: "Government Exams", label: "CSS, PMS, FPSC, PPSC, SPSC, KPPSC, BPSC" },
                        { value: "Military Test Prep", label: "Pak Army, Navy, Air Force (ISSB, Initial Tests)" },
                        { value: "Police & Agencies Prep", label: "Police, FIA, ASF, NAB Exam Preparation" },
                        { value: "University Entry Tests", label: "LUMS, IBA, FAST, GIKI Entry Tests" },
                        { value: "Accounting & Finance", label: "Accounting & Finance (QuickBooks, Excel, Tally, SAP)" },
                        { value: "Stock & Crypto Trading", label: "Stock Market & Crypto Trading" },
                        { value: "Entrepreneurship", label: "Entrepreneurship & Business Startup Guide" },
                        { value: "Time Management", label: "Time Management & Productivity" },
                        { value: "Public Speaking", label: "Public Speaking & Communication Skills" },
                        { value: "Leadership", label: "Leadership & Team Management" },
                        { value: "Career Counseling", label: "Career Counseling & Job Interview Preparation" },
                        { value: "Quran & Tajweed", label: "Quran Tafseer & Tajweed" },
                        { value: "Hadith & Fiqh", label: "Hadith & Fiqh Courses" },
                        { value: "Islamic Finance", label: "Islamic Banking & Finance" }
                      ]
                    }
                  ].map(group => group.options)
                )
              ].find(opt => opt.value === filters[activeCategory])?.label}
              <button
                onClick={() => setFilters({ ...filters, [activeCategory]: '' })}
                className="ml-2 hover:text-purple-900 transition-colors duration-200"
              >
                ×
              </button>
            </motion.span>
          </motion.div>
        )}

        {/* Helper Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-gray-500"
        >
          {filters[activeCategory] 
            ? `Showing results for selected ${activeCategory}`
            : `Select a ${activeCategory} to filter results`}
        </motion.p>
      </div>
    </motion.div>
  </AnimatePresence>
)}


      {/* Active Filters */}
      <AnimatePresence>
        {Object.entries(filters).some(([_, value]) => value) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-100"
          >
            {Object.entries(filters).map(([key, value]) =>
              value ? (
                <motion.span
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => setFilters({ ...filters, [key]: "" })}
                    className="hover:text-blue-800"
                  >
                    <FiX className="text-xs" />
                  </button>
                </motion.span>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const filterCategories = [
  { name: 'All', icon: FiGrid },
  { name: 'Popular', icon: FiTrendingUp },
  { name: 'Newest', icon: FiClock },
  { name: 'Featured', icon: FiStar }
];
const SelectArrow = () => (
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
)

// Main App Component
const Courses = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    city: "",
    ageGroup: "",
    duration: "",
    price: "",
    schedule: ""
  });

  // Filter courses based on search criteria
  const filteredCourses = course.filter(course => {
    return (
      (filters.search === "" || 
        course.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || course.category === filters.category) &&
      (filters.level === "" || course.level === filters.level)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      
      <main className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <SearchFilters filters={filters} setFilters={setFilters} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            <CourseCard key={course.id} course={course} />
        
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduLearn Pro</h3>
              <p className="text-gray-400">Transforming lives through education</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Courses</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@edulearn.pro</li>
                <li>Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <FiUser className="text-xl" />
                </a>
                {/* Add more social icons as needed */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EduLearn Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Add these styles to your CSS file or use a styling solution like Tailwind CSS
const styles = `
  .text-gradient {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #3B82F6, #8B5CF6);
  }

  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full
      transform hover:scale-105 transition-all duration-300 shadow-md
      flex items-center justify-center;
  }

  .btn-secondary {
    @apply bg-white/10 hover:bg-white/20 text-gray-800 px-6 py-2 rounded-full
      backdrop-blur-sm transform hover:scale-105 transition-all duration-300
      shadow-md flex items-center justify-center border border-gray-200;
  }
`;

export default Courses;