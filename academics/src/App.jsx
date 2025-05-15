import React, { useState, useEffect } from "react";
import { RiSearchLine, RiNotificationLine, RiCloseLine, RiMenuLine, RiChatSmileLine,RiChatQuoteLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaChalkboard,FaBookOpen,FaLinkedin,FaTwitter,FaEnvelope ,FaCalendarAlt,FaUser} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { 
  FaGraduationCap, FaBook, FaCog, FaMedkit, FaClipboardList, FaUniversity,
  FaLaptopCode, FaPalette, FaChartLine, FaShoppingCart, FaCode, FaMobile,
  FaShieldAlt, FaRobot, FaLanguage, FaPen, FaGlobe, FaLandmark,
  FaMedal, FaUserShield, FaSchool, FaCalculator, FaChartBar, FaRocket,
  FaClock, FaMicrophone, FaCrown, FaCompass, FaQuran, FaMosque, FaMoneyBillWave
} from 'react-icons/fa';
import Slider from "react-slick";
import CountUp from "react-countup";
import "slick-carousel/slick/slick.css";
import {Link} from "react-router-dom"
import pakistanCities from "./pakistanCities";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  // 1. Academic Courses (School & College)
  { title: "Matric & Intermediate", description: "Science, Arts, and Commerce subjects for school & college level.", icon: <FaGraduationCap className="text-2xl text-blue-600" /> },
  { title: "O-Level & A-Level", description: "Cambridge & Federal Board curriculum studies.", icon: <FaBook className="text-2xl text-indigo-600" /> },
  { title: "Engineering Entrance Exams", description: "ECAT, NUST, PIEAS, GIKI preparation.", icon: <FaCog className="text-2xl text-gray-700" /> },
  { title: "Medical Entrance Exams", description: "MDCAT, NUMS, AKU entrance test prep.", icon: <FaMedkit className="text-2xl text-red-600" /> },
  { title: "CSS & FPSC Preparation", description: "Civil services competitive exams prep.", icon: <FaClipboardList className="text-2xl text-green-600" /> },
  { title: "Bachelors & Masters", description: "University-level education for BS, MS, MBA, and more.", icon: <FaUniversity className="text-2xl text-purple-600" /> },

  // 2. Professional & Skill-Based Courses
  { title: "Freelancing", description: "Learn to earn via Fiverr, Upwork, and others.", icon: <FaLaptopCode className="text-2xl text-blue-500" /> },
  { title: "Graphic Designing", description: "Master Photoshop, Illustrator, Canva etc.", icon: <FaPalette className="text-2xl text-pink-600" /> },
  { title: "Digital Marketing", description: "SEO, Facebook & Google Ads, SMM skills.", icon: <FaChartLine className="text-2xl text-green-500" /> },
  { title: "E-commerce", description: "Amazon, Daraz, Shopify, and dropshipping.", icon: <FaShoppingCart className="text-2xl text-orange-600" /> },
  { title: "Web Development", description: "HTML, CSS, JS, React, Laravel, WordPress.", icon: <FaCode className="text-2xl text-indigo-500" /> },
  { title: "App Development", description: "Flutter, React Native, Android & iOS.", icon: <FaMobile className="text-2xl text-blue-600" /> },
  { title: "Cyber Security", description: "Ethical hacking and online safety.", icon: <FaShieldAlt className="text-2xl text-red-500" /> },
  { title: "Data Science & AI", description: "Python, Machine Learning, AI tools.", icon: <FaRobot className="text-2xl text-purple-500" /> },

  // 3. Language & Communication Courses
  { title: "English Language", description: "IELTS, TOEFL, and spoken English training.", icon: <FaLanguage className="text-2xl text-blue-500" /> },
  { title: "Urdu & Pashto Writing", description: "Improve writing skills in native languages.", icon: <FaPen className="text-2xl text-green-600" /> },
  { title: "Foreign Languages", description: "Learn Chinese, French, German and more.", icon: <FaGlobe className="text-2xl text-teal-600" /> },

  // 4. Government & Competitive Exam Preparation
  { title: "Government Exams", description: "CSS, PMS, FPSC, PPSC, SPSC and more.", icon: <FaLandmark className="text-2xl text-gray-700" /> },
  { title: "Military Test Prep", description: "Preparation for ISSB and military tests.", icon: <FaMedal className="text-2xl text-yellow-600" /> },
  { title: "Police & Agencies Prep", description: "FIA, ASF, NAB and other agencies prep.", icon: <FaUserShield className="text-2xl text-blue-700" /> },
  { title: "University Entry Tests", description: "Entry tests for LUMS, IBA, FAST, GIKI etc.", icon: <FaSchool className="text-2xl text-purple-600" /> },

  // 5. Business & Finance
  { title: "Accounting & Finance", description: "QuickBooks, Excel, SAP, and more.", icon: <FaCalculator className="text-2xl text-green-700" /> },
  { title: "Stock & Crypto Trading", description: "Learn investment and trading strategies.", icon: <FaChartBar className="text-2xl text-blue-600" /> },
  { title: "Entrepreneurship", description: "Start your own business with confidence.", icon: <FaRocket className="text-2xl text-orange-600" /> },

  // 6. Personal Development
  { title: "Time Management", description: "Boost productivity and manage time wisely.", icon: <FaClock className="text-2xl text-indigo-600" /> },
  { title: "Public Speaking", description: "Master communication and speaking skills.", icon: <FaMicrophone className="text-2xl text-red-600" /> },
  { title: "Leadership", description: "Lead teams and develop leadership qualities.", icon: <FaCrown className="text-2xl text-yellow-600" /> },
  { title: "Career Counseling", description: "Job interview and career development guide.", icon: <FaCompass className="text-2xl text-blue-500" /> },

  // 7. Islamic & Religious Studies
  { title: "Quran & Tajweed", description: "Learn proper recitation and understanding of the Quran.", icon: <FaQuran className="text-2xl text-green-600" /> },
  { title: "Hadith & Fiqh", description: "Understand Islamic jurisprudence and sayings of the Prophet.", icon: <FaMosque className="text-2xl text-teal-600" /> },
  { title: "Islamic Finance", description: "Learn Sharia-compliant banking and finance.", icon: <FaMoneyBillWave className="text-2xl text-green-700" /> }
];

const teachers = [
  { name: "John Doe", subject: "Mathematics", image: "https://media.istockphoto.com/id/1336324740/photo/having-fun-at-a-garden-party.jpg?s=612x612&w=0&k=20&c=r5iNGwCyH-6ENsCVz7FuyDEJ-Pnokaz-af84Qa28-6E=" },
  { name: "Jane Smith", subject: "Science", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4D8S678Eknda5bH9rwRovirTWlrvH8AD0g&s" },
  { name: "Alice Johnson", subject: "Literature", image: "https://directenglish.com.sa/wp-content/uploads/2017/03/random-person.jpg" },
  { name: "Michael Brown", subject: "History", image: "https://img.freepik.com/free-photo/cheerful-guy-enjoying-outdoor-coffee-break_1262-20005.jpg" },
  { name: "Emily Davis", subject: "Art", image: "https://img.freepik.com/free-photo/handsome-man-home_144627-9257.jpg" },
  { name: "Daniel Wilson", subject: "Physics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56tW1Fj5O0RGgRDgrnaEpeabb4rCfNYr7cBEcvqE2CksaVQ0tTsrbG295m1XH0HCzVjg&usqp=CAU" },
];

// Placeholder components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Notification = ({ message, type }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-lg ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
    {message}
  </div>
);

const Tooltip = () => <div></div>;

// Updated Section Components
const PromotionBanner = ({ setShowLoginModal }) => (
  <section className="py-20 fonting bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Section Heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
      Unlock Exclusive Learning Opportunities
    </h2>

    {/* Section Subheading */}
    <p className="text-lg md:text-2xl mb-8 text-gray-300 animate-fade-in-up delay-100">
      Sign up today and get access to premium courses and resources.
    </p>

    {/* Sign Up Button */}
    <motion.button
      onClick={() => setShowLoginModal(true)}
      className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl font-bold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Sign Up Now
    </motion.button>
  </div>
</section>
);

const StatsSection = () => (
  <section className="py-20 fonting bg-gradient-to-br from-gray-800 to-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-white mb-4 animate-fade-in-up">
        Our Impact
      </h2>
      <p className="text-xl text-gray-300 animate-fade-in-up delay-100">
        Transforming lives through education and innovation
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { number: 100000, label: "Students Enrolled", icon: FaUserGraduate },
        { number: 5000, label: "Expert Teachers", icon: FaChalkboardTeacher },
        { number: 10000, label: "Classes Conducted", icon: FaChalkboard },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative bg-gray-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Stat Icon */}
          <stat.icon className="text-yellow-500 text-6xl mb-6 mx-auto" />

          {/* Stat Number */}
          <CountUp
            end={stat.number}
            duration={2.5}
            separator=","
            className="text-5xl font-bold text-yellow-500"
          />

          {/* Stat Label */}
          <p className="text-xl text-gray-300 mt-4">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
);


const CategorySection = () => (
  <section className="py-24 bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/90 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Enhanced Section Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-sm font-bold text-purple-600 tracking-wider uppercase mb-4 block">
          Educational Categories
        </span>
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-800 
          bg-clip-text text-transparent mb-6 leading-tight">
          Explore Categories
        </h2>
        <p className="text-xl text-gray-600/90 max-w-2xl mx-auto font-medium">
          Discover a wide range of topics to enhance your skills and knowledge
        </p>
      </motion.div>

      {/* Enhanced Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -12, 
              scale: 1.02,
              transition: { duration: 0.4, ease: "easeOut" }
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Card Container with Glass Effect */}
            <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl
              shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] 
              hover:shadow-[0_20px_50px_-15px_rgba(124,58,237,0.15)]
              transition-all duration-500 overflow-hidden
              border border-purple-100/50">
              
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-indigo-600/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 
                rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
              
              {/* Category Icon with Enhanced Animation */}
              <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-purple-600/10 rounded-2xl blur-2xl group-hover:blur-3xl 
                  transition-all duration-500 scale-75 group-hover:scale-110"></div>
                <div className="relative text-6xl transform group-hover:scale-110 group-hover:rotate-3 
                  transition-transform duration-500">
                  {category.icon}
                </div>
              </div>

              {/* Category Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-indigo-800 
                  bg-clip-text text-transparent mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {category.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:translate-x-1 
                  transition-transform duration-300">
                  {category.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-purple-600 font-semibold opacity-0 
                  group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 
                  transition-all duration-300">
                  Explore More
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Add CSS for Background Pattern */}
    <style jsx>{`
      .bg-grid-pattern {
        background-image: 
          linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
        background-size: 4rem 4rem;
      }
    `}</style>
  </section>
);


const TeachersSection = () => (
  <section className="py-20 fonting bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-indigo-900 mb-4">Meet Our Teachers</h2>
        <p className="text-xl text-gray-600">Passionate educators dedicated to your child's success</p>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {teachers.map((teacher, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center relative overflow-hidden"
          >
            {/* Gradient Border */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>

            {/* Teacher Image */}
            <img 
              src={teacher.image} 
              alt={teacher.name} 
              className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-purple-100 object-cover"
            />

            {/* Teacher Name */}
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">{teacher.name}</h3>

            {/* Teacher Subject */}
            <p className="text-lg text-blue-600 font-medium mb-4">{teacher.subject}</p>

            {/* Optional: Teacher Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {teacher.description || "Passionate about inspiring young minds and fostering creativity."}
            </p>

            {/* Social Links (Optional) */}
            <div className="mt-6 flex justify-center space-x-4">
              <a href={teacher.social?.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href={teacher.social?.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href={teacher.social?.email} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);



const ParentResources = () => (
<section className="py-20 fonting bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-extrabold text-purple-900 mb-4 animate-fade-in-up">
        Parent Resources
      </h2>
      <p className="text-xl text-gray-600 animate-fade-in-up delay-100">
        Empowering parents with tools and knowledge for their child's success
      </p>
    </div>

    {/* Resources Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {[
        { title: "How to Support Your Child's Learning", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRiYn0Vs9yBPyJosLjMwDfmJD6UUoQtPU6aQ&s" },
        { title: "Tips for Effective Online Learning", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPEL_TtKr4dCMc-4RDBkHXJHmMZ4cb_o5rw&s" },
        { title: "Understanding Your Child's Progress", link: "#", image: "https://c4.wallpaperflare.com/wallpaper/1018/272/852/children-school-desk-laptop-wallpaper-preview.jpg" },
        { title: "Creating a Positive Learning Environment", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnClDQ4KO3PtnkDuZSfxUNsJBtrkBACkJmMg&s" },
        { title: "Balancing Screen Time and Play", link: "#", image: "https://www.shutterstock.com/image-photo/kid-reading-book-child-school-600nw-2477317791.jpg" },
        { title: "Engaging Educational Activities", link: "#", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8IG6O0ggBLzqQs_ih1sz3CYVpvoS8IDX2SA&s" },
      ].map((resource, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

          {/* Resource Image */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <img
              src={resource.image}
              alt={resource.title}
              className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Resource Title */}
          <h3 className="relative text-2xl font-bold text-purple-900 mb-4 mt-6">
            {resource.title}
          </h3>

          {/* Learn More Link */}
          <a
            href={resource.link}
            className="relative inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-lg transition-colors duration-300"
          >
            Learn More
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      ))}
    </div>
  </div>
</section>

);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* About Us */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
        <p className="text-gray-400 leading-relaxed">
          We are committed to providing high-quality education for children worldwide, empowering their future with knowledge and skills.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
        <ul className="space-y-3">
          <li><a href="#" className="hover:text-blue-400 transition-colors">Courses</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Teachers</a></li>
          <li><a href="#" className="hover:text-blue-400 transition-colors">Resources</a></li>
        </ul>
      </div>

      {/* Contact Us */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
        <p className="text-gray-400">📧 support@example.com</p>
        <p className="text-gray-400">📞 +123 456 7890</p>
        <div className="mt-4 flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-facebook-f text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition">
            <i className="fab fa-instagram text-xl"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} YourCompany. All rights reserved.
    </div>
  </div>
</footer>

);

const FeaturedCourseCard = ({ course }) => (
  <motion.div
  whileHover={{ scale: 1.05 }}
  className="bg-white p-8 fonting rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
>
  {/* Course Image */}
  <motion.div
    className="relative overflow-hidden rounded-t-3xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={course.image}
      alt={course.title}
      className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
  </motion.div>

  {/* Course Title */}
  <div className="flex items-center mt-6 mb-4">
    <FaBookOpen className="text-indigo-500 text-3xl mr-3" />
    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
  </div>

  {/* Course Description */}
  <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

  {/* Course Details */}
  <div className="text-gray-600 mb-6 space-y-2">
    <p className="flex items-center">
      <FaClock className="text-indigo-500 mr-2" />
      <strong>Duration:</strong> {course.duration}
    </p>
    <p className="flex items-center">
      <FaUser className="text-indigo-500 mr-2" />
      <strong>Instructor:</strong> {course.instructor}
    </p>
  </div>

  {/* Enroll Button */}
  <motion.button
    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
    whileHover={{ scale: 1.05 }}
  >
    Enroll Now
  </motion.button>
</motion.div>
);
const provincesWithCities = {
  Punjab: ["Lahore", "Rawalpindi", "Faisalabad", "Multan", "Sialkot"],
  Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah"],
  KPK: ["Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat"],
  Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Zhob"],
  GilgitBaltistan: ["Gilgit", "Skardu", "Hunza", "Diamer", "Ghanche"],
  Islamabad: ["Islamabad"]
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showCities, setShowCities] = useState(false);
  const navigate = useNavigate();
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    if (province && provincesWithCities[province]) {
      setSelectedProvince(province);
      setShowCities(true); // Show cities only if valid province
    } else {
      setShowCities(false);
    }
    setSelectedCity("");
  };
const enhancedSubjects = [
  { name: "Mathematics" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Biology" },
  { name: "English Language" },
  { name: "Urdu Literature" },
  { name: "Islamic Studies" },
  { name: "Pakistan Studies" },
  { name: "Computer Science" },
  { name: "Web Development" },
  { name: "App Development" },
  { name: "Cyber Security" },
  { name: "Graphic Designing" },
  { name: "Digital Marketing" },
  { name: "Freelancing" },
  { name: "Data Science & AI" },
  { name: "Accounting & Finance" },
  { name: "Economics" },
  { name: "Business & Entrepreneurship" },
  { name: "Medical Entrance Test Prep" },
  { name: "Engineering Entry Test Prep" },
  { name: "CSS & Government Exam Prep" },
  { name: "Public Speaking & Communication" },
  { name: "Quran & Tajweed" },
  { name: "Foreign Languages" }
];

  

  // Enhanced Navbar Component
  const EnhancedNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
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
           <div>
  {user ? (
    <Link to="/teacherdashboard" className="flex items-center gap-3 group">
      <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          user.fullName?.charAt(0).toUpperCase()
        )}
      </div>
      <span className="text-gray-800 font-semibold text-lg group-hover:text-emerald-600 transition-colors capitalize">
        {user.fullName}
      </span>
    </Link>
  ) : (
    <Link to="/signup">
      <button
        onClick={() => setShowLoginModal(true)}
        className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-colors font-semibold shadow-lg hover:shadow-xl"
      >
        Get Started
      </button>
    </Link>
  )}
</div>



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

  // Enhanced Hero Section Component
  const EnhancedHeroSection = () => (
    <div className="py-20 relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://www.eui.eu/Content-Types-Assets/Web-Unit/Conferring-ceremony-2023.xa86ef5cb.jpg?crop=1920,1080,0,153')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
    
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 py-8">
  {/* Main Heading with enhanced styling */}
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
  >
    Transform Your Child's Future Through{" "}
    <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
      Interactive Learning
    </span>
  </motion.h1>

  {/* Subheading with improved visibility */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    className="text-xl md:text-2xl mb-12 leading-relaxed font-medium text-blue-100 max-w-3xl mx-auto"
  >
    Join thousands of students worldwide in live online classes taught by expert instructors
  </motion.p>

  {/* Search Box with enhanced design */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto border border-white/20"
  >
<div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Subject Select */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Subject
      </label>
      <div className="relative">
        <select
  value={selectedSubject}
  onChange={(e) => setSelectedSubject(e.target.value)}
  className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
         focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
         hover:border-blue-400 transition-all appearance-none shadow-sm
         group-hover:shadow-lg group-hover:bg-blue-50/50"
>
  <option value="" className="text-gray-500">Choose a subject</option>
  {Array.isArray(enhancedSubjects) && enhancedSubjects.map((subject) => (
    <option key={subject.name} value={subject.name} className="text-gray-700">
      {subject.name}
    </option>
  ))}
</select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Age Group Select */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Age Group
      </label>
      <div className="relative">
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
          className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                   hover:border-blue-400 transition-all appearance-none shadow-sm
                   group-hover:shadow-lg group-hover:bg-blue-50/50"
        >
          <option value="" className="text-gray-500">Select age range</option>
          {[
            { value: "4-6", label: "4-6 years (Primary)" },
            { value: "7-9", label: "7-9 years (Elementary)" },
            { value: "10-12", label: "10-12 years (Middle)" },
            { value: "13-15", label: "13-15 years (High School)" },
            { value: "16+", label: "16+ years (Advanced)" }
          ].map((age) => (
            <option key={age.value} value={age.value}>{age.label}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Location Selection */}
    <div className="relative group">
      <label className="flex items-center text-sm font-medium text-gray-700 mb-2 ml-1">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Location
      </label>
      <div className="space-y-3">
        <div className="relative">
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              setSelectedCity("");
            }}
            className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                     focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                     hover:border-blue-400 transition-all appearance-none shadow-sm
                     group-hover:shadow-lg group-hover:bg-blue-50/50"
          >
            <option value="">Select province</option>
            {Object.keys(provincesWithCities).map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {selectedProvince && (
          <div className="relative animate-fadeIn">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-4 rounded-xl text-gray-700 border-2 border-gray-200 bg-white/95
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                       hover:border-blue-400 transition-all appearance-none shadow-sm
                       group-hover:shadow-lg group-hover:bg-blue-50/50"
            >
              <option value="">Select city</option>
              {provincesWithCities[selectedProvince]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-blue-500/10 rounded-full p-1 transition-all duration-200 group-hover:bg-blue-500/20">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Search Button */}
    <div className="relative group flex items-end">
      <button 
        className="w-full p-4 rounded-xl text-white font-medium
                   bg-gradient-to-r from-blue-500 to-indigo-600
                   hover:from-blue-600 hover:to-indigo-700
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   transition-all duration-300 transform hover:scale-[1.02]
                   shadow-lg hover:shadow-xl active:scale-[0.98]
                   flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search Classes</span>
        
        {/* Animated particles on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>
        </div>
      </button>
    </div>
  </div>
</div>

  </motion.div>

  {/* Stats with enhanced design */}
  <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
    {[
      { number: 100000, label: "Students", icon: "👨‍🎓" },
      { number: 5000, label: "Teachers", icon: "👩‍🏫" },
      { number: 10000, label: "Classes", icon: "📚" },
      { number: 240, label: "Cities", icon: "🌍" },
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 + index * 0.2, ease: "easeOut" }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
          <div className="text-4xl mb-2">{stat.icon}</div>
          <CountUp
            end={stat.number}
            duration={2.5}
            separator=","
            className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          />
          <p className="text-lg font-medium text-blue-100">{stat.label}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>
    </div>
  );

  // Featured Classes Component
  const FeaturedClasses = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
     <section className="py-16 bg-gray-50 fonting">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Featured Classes</h2>
    
    {Array.isArray(enhancedSubjects) && 
     enhancedSubjects.length > 0 && 
     enhancedSubjects[0].trendingCourses ? (
      <Slider {...settings}>
        {enhancedSubjects[0].trendingCourses.map((course) => (
          <div key={course.id} className="px-3">
            <FeaturedCourseCard course={course} />
          </div>
        ))}
      </Slider>
    ) : (
      <p className="text-center text-gray-500">Loading featured classes...</p>
    )}
  </div>
</section>

    );
  };

  // Testimonials Section Component
  const testimonials = [
    {
      text: "The personalized learning approach has made a remarkable difference in my child's academic performance. The progress tracking tools are invaluable!",
      author: "Sarah Johnson",
      role: "Parent of 2",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5
    },
    {
      text: "Exceptional platform! The interactive lessons keep my kids engaged, and the progress reports help me understand their learning journey better.",
      author: "Michael Chen",
      role: "Parent of 3",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5
    },
    {
      text: "The quality of education and support is outstanding. My children have shown significant improvement in their critical thinking skills.",
      author: "Emma Thompson",
      role: "Parent & Educator",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5
    },
    {
      text: "What sets this platform apart is the comprehensive curriculum and the excellent support system. It's been a game-changer for our family!",
      author: "David Wilson",
      role: "Single Parent",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      rating: 5
    },
    {
      text: "The flexibility of online learning combined with quality content has made education enjoyable for my kids. Highly recommended!",
      author: "Lisa Martinez",
      role: "Working Parent",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5
    },
    {
      text: "I'm impressed by how engaging the lessons are. My children actually look forward to their study time now!",
      author: "James Anderson",
      role: "Parent of 2",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      rating: 5
    }
  ];
  const TestimonialsSection = () => (
<section className="py-20 fonting bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-50">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
    <h2 className="text-6xl font-extrabold text-center text-gray-900 tracking-wide mb-6">
      What Parents Say
    </h2>
    <p className="text-lg text-center text-gray-600 leading-relaxed mb-16">
      Trusted by thousands of parents worldwide
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white border border-gray-200 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
        >
          {/* Sleek Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          {/* Quote Icon */}
          <RiChatQuoteLine className="text-purple-500 h-10 w-10 mb-5 opacity-80" />

          {/* Testimonial Text */}
          <p className="text-gray-800 mb-6 leading-relaxed text-lg italic">
            "{testimonial.text}"
          </p>

          {/* Author Details */}
          <div className="flex items-center">
            <img 
              src={testimonial.image} 
              alt={testimonial.author} 
              className="w-14 h-14 rounded-full ring-4 ring-purple-200 object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-xl text-gray-900">{testimonial.author}</h4>
              <p className="text-purple-600 font-medium">{testimonial.role}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="absolute bottom-5 right-5 flex gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
  // Call to Action Component
  const CallToAction = () => (
<section className="py-20 fonting bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white text-center">
  <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
    <h2 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-xl">
      Start Your Child's Learning Journey Today
    </h2>
    <p className="text-lg md:text-xl mb-10 opacity-90">
      Get <span className="font-bold text-yellow-300">50% off</span> on your first class when you sign up now
    </p>
    <button
      onClick={() => setShowLoginModal(true)}
      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
    >
      Get Started Now
    </button>
  </div>
</section>



  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {isLoading && <LoadingSpinner />}
      <AnimatePresence>
        {showNotification && <Notification message="Success! Your action was completed." type="success" />}
      </AnimatePresence>

      <EnhancedNavbar />
      <EnhancedHeroSection />
      <PromotionBanner setShowLoginModal={setShowLoginModal} />
      <StatsSection />
      <CategorySection />
      <FeaturedClasses />
      <TeachersSection />
      {/* <UpcomingWebinars /> */}
      <ParentResources />
      <TestimonialsSection />
      <CallToAction />
      <Footer />
      <Tooltip id="tooltip" />
    </div>
  );
}

export default App;