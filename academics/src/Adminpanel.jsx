import React from "react";
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, User2Icon } from "lucide-react";

import axios from "axios"
import { 
  HomeIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  CheckCircleIcon, 
  UserIcon,
  ChartBarIcon,
  LogoutIcon,
  CogIcon,
  BellIcon,
  SearchIcon
} from '@heroicons/react/outline';
import { FiDownload, FiSearch, FiFilter, FiActivity,FiUser, FiBookOpen, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// Header Component
const Header = ({ currentTime, formatDateTime, notifications, userProfile, markNotificationAsRead }) => (
  <div className="bg-white shadow-lg px-6 py-4 mb-6 backdrop-blur-md bg-opacity-95 sticky top-0 z-50">
    <div className="flex justify-between items-center max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {/* DateTime Display with Animation */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="bg-white px-4 py-2 rounded-md flex items-center space-x-2">
            <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-gray-800 tracking-wide">
              {formatDateTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative group">
          <SearchIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
          <input 
            type="text" 
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2.5 w-64 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400 text-gray-600"
          />
          <kbd className="absolute right-3 top-2.5 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded hidden group-hover:block">
            ⌘ K
          </kbd>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-8">
        {/* Enhanced Notifications Dropdown */}
        <div className="relative group">
          <button className="relative p-2 hover:bg-blue-50 rounded-lg transition duration-200 group-hover:ring-2 group-hover:ring-blue-100">
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse shadow-lg">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
            <BellIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
          </button>
          
          {/* Enhanced Notifications Panel */}
          <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl py-2 hidden group-hover:block border border-gray-100 transform transition-all duration-200 ease-out opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Mark all as read</span>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                    !notification.read ? 'bg-blue-50 hover:bg-blue-100' : ''
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`h-2 w-2 mt-2 rounded-full flex-shrink-0 ${
                      notification.read ? 'bg-gray-300' : 'bg-blue-600'
                    }`} />
                    <div className="ml-3">
                      <p className="text-sm text-gray-800 font-medium">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-gray-100 mt-2">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all notifications
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced User Profile Dropdown */}
        <div className="relative group">
          <div className="flex items-center space-x-3 cursor-pointer p-1 rounded-lg group-hover:bg-gray-50 transition-all duration-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{userProfile.name}</p>
              <p className="text-xs text-gray-500 font-medium">{userProfile.role}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div className="h-full w-full rounded-md bg-white flex items-center justify-center overflow-hidden">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {userProfile.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Profile Dropdown */}
          <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 hidden group-hover:block border border-gray-100 transform transition-all duration-200 ease-out opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-900">{userProfile.username}</p>
            </div>
            <div className="py-1">
              <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 space-x-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Your Profile</span>
              </a>
              <a href="#settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 space-x-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </a>
            </div>
            <div className="border-t border-gray-100 my-1"></div>
            <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 space-x-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign out</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Settings Panel Component
const SettingsPanel = ({ settings, toggleSetting }) => (
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
    {/* Header Section */}
    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Settings & Preferences
        </h3>
        <p className="text-gray-500 mt-1">Manage your application preferences and system settings</p>
      </div>
      <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
        <svg 
          className="h-6 w-6 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>

    {/* Settings Grid */}
    <div className="grid gap-6">
      {Object.entries(settings).map(([key, value]) => (
        <div 
          key={key} 
          className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                {/* Setting Icon based on type */}
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  value ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {key === 'emailNotifications' && (
                    <svg className={`h-5 w-5 ${value ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {key === 'autoApproveStudents' && (
                    <svg className={`h-5 w-5 ${value ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {key === 'darkMode' && (
                    <svg className={`h-5 w-5 ${value ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                  {key === 'twoFactorAuth' && (
                    <svg className={`h-5 w-5 ${value ? 'text-blue-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {`Manage ${key.split(/(?=[A-Z])/).join(' ').toLowerCase()} settings`}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Toggle Switch */}
            <div className="ml-6">
              <button
                onClick={() => toggleSetting(key)}
                className={`${
                  value 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gray-200'
                } relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none group`}
              >
                <span className="sr-only">Toggle {key}</span>
                <span
                  className={`${
                    value ? 'translate-x-7' : 'translate-x-1'
                  } inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out mt-1 group-hover:scale-110`}
                />
                {value && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-white opacity-75"></span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Additional Info or Quick Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Learn more
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Footer Section */}
    <div className="mt-8 pt-6 border-t border-gray-100">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>Some settings may require a page reload to take effect</p>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Reset all settings
        </button>
      </div>
    </div>
  </div>
);

// Main Dashboard Component
function AdminDashboard() {
  // States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [approvedUsers, setApprovedUsers] = useState([]);

  const [stats, setStats] = useState({
    teacherRequests: 15,
    academyRequests: 8,
    totalStudents: 450,
    completedRequests: 125
  });
  
  const [teacherRequests, setTeacherRequests] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]); // Store multiple expanded rows

  const toggleExpand = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter((rowId) => rowId !== id) // Remove if already expanded
        : [...prevExpandedRows, id] // Add if not expanded
    );
  };


  const [academyRequests, setAcademyRequests] = useState([
    {
      id: 1,
      name: 'Excellence Academy',
      email: 'info@excellenceacademy.com',
      location: 'New York',
      courses: ['Mathematics', 'Physics'],
      status: 'pending',
      date: '2025-02-17'
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      grade: '10th',
      joinDate: '2025-02-17',
      status: 'active'
    }
  ]);

  const [userProfile] = useState({
    name: 'Huzaifa',
    username: 'huzaifa8883',
    role: 'Administrator',
    lastLogin: '2025-02-17 01:51:16'
  });

  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New teacher registration request from John Doe',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      message: 'New academy registration request from Excellence Academy',
      time: '10 minutes ago',
      read: false
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoApproveStudents: true,
    darkMode: false,
    twoFactorAuth: false
  });
  const approveTeacher = async (userId) => {
    try {
      const response = await fetch("http://localhost:5000/users/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("User Approved Successfully!");
        // Yahan aap state update kar sakte hain
      } else {
        alert(data.message || "Approval Failed");
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  useEffect(() => {
    const fetchTeacherRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/getalluser"); // Adjust API URL
        const pendingRequests = response.data.filter(user => user.
          isApproved === false);
        setTeacherRequests(pendingRequests);
      } catch (error) {
        console.error("Error fetching teacher requests:", error);
      }
    };
  
    fetchTeacherRequests();
  }, []);
  

  
  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/getallapproved");
        const data = await response.json();
        setApprovedUsers(data.data); // ✅ Setting approved users in state
      } catch (error) {
        console.error("Error fetching approved users:", error);
      }
    };

   fetchApprovedUsers()
  }, []); // ✅ Fetch only when tab changes to 'completed'

  
  
  
  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const handleExport = () => {
    const csvData = approvedTeachers.map(teacher => ({
      Name: teacher.fullName,
      Username: teacher.username,
      Email: teacher.email,
      'Request Date': new Date(teacher.createdAt).toLocaleDateString(),
      'Approved Date': new Date(teacher.approvedAt).toLocaleDateString(),
      Status: 'Approved'
    }));
    
    // Create CSV content
    const csv = Papa.unparse(csvData);
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `approved-teachers-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  

  // Functions
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const handleTeacherAction = (id, action) => {
    setTeacherRequests(teacherRequests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
    
    // Update stats
    if (action === 'approved') {
      setStats(prev => ({
        ...prev,
        completedRequests: prev.completedRequests + 1,
        teacherRequests: prev.teacherRequests - 1
      }));
    }
  };

  const handleAcademyAction = (id, action) => {
    setAcademyRequests(academyRequests.map(req => 
      req.id === id ? { ...req, status: action } : req
    ));
    
    // Update stats
    if (action === 'approved') {
      setStats(prev => ({
        ...prev,
        completedRequests: prev.completedRequests + 1,
        academyRequests: prev.academyRequests - 1
      }));
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'teachers', name: 'Teacher Requests', icon: UserGroupIcon },
    { id: 'academies', name: 'Academy Requests', icon: AcademicCapIcon },
    { id: 'students', name: 'Students', icon: UserIcon },
        { id: 'settings', name: 'Settings', icon: CogIcon },
        { id: 'approvedTeachers', name: 'ApprovedTeachers', icon: User2Icon },

  ];

  // Render Stats Card
  const StatCard = ({ title, value, icon: Icon, color, trend = null }) => (
    <div className={`
      relative overflow-hidden bg-white rounded-xl shadow-md 
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-xl
      group
      ${color}
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
  
      {/* Main Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          {/* Icon Section with Enhanced Animation */}
          <div className={`
            p-3 rounded-xl 
            ${color.replace('border-l-4', 'bg-opacity-10')}
            transform transition-all duration-300 group-hover:scale-110
            group-hover:rotate-12
          `}>
            <Icon className={`
              h-8 w-8 
              ${color.includes('blue') ? 'text-blue-600' : 
                color.includes('green') ? 'text-green-600' : 
                color.includes('purple') ? 'text-purple-600' : 
                'text-yellow-600'}
            `} />
          </div>
  
          {/* Trend Indicator */}
          {trend && (
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-lg text-sm
              ${trend > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}
            `}>
              {trend > 0 ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <span className="font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
  
        {/* Text Content with Enhanced Typography */}
        <div className="mt-4">
          <h3 className="text-gray-500 text-sm font-medium mb-1 group-hover:text-gray-700 transition-colors duration-200">
            {title}
          </h3>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-gray-900">
              {value.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">total</p>
          </div>
        </div>
  
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out
                ${color.includes('blue') ? 'bg-blue-600' : 
                  color.includes('green') ? 'bg-green-600' : 
                  color.includes('purple') ? 'bg-purple-600' : 
                  'bg-yellow-600'}
              `}
              style={{ width: `${Math.min(100, (value / 1000) * 100)}%` }}
            />
          </div>
        </div>
  
        {/* Bottom Section with Additional Info */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <button className={`
            text-sm font-medium 
            ${color.includes('blue') ? 'text-blue-600 hover:text-blue-700' : 
              color.includes('green') ? 'text-green-600 hover:text-green-700' : 
              color.includes('purple') ? 'text-purple-600 hover:text-purple-700' : 
              'text-yellow-600 hover:text-yellow-700'}
            transition-colors duration-200
          `}>
            View Details
          </button>
          <p className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
  
        {/* Hover Effect Overlay */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
          ${color.includes('blue') ? 'bg-blue-600' : 
            color.includes('green') ? 'bg-green-600' : 
            color.includes('purple') ? 'bg-purple-600' : 
            'bg-yellow-600'}
        `} />
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${settings.darkMode ? 'dark' : ''}`}>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white shadow-xl min-h-screen relative z-10">
    <div className="p-6">
      {/* Logo and Title Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <div className="mt-2 text-xs text-gray-500 text-center">
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="font-mono">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="space-y-1">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-4">
            Main Navigation
          </p>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex items-center w-full p-3 mb-1 rounded-xl
                transition-all duration-200 group relative
                ${activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {/* Hover Effect Background */}
              <div className={`
                absolute inset-0 rounded-xl transition-opacity duration-200
                ${activeTab === item.id
                  ? 'opacity-0'
                  : 'opacity-0 group-hover:opacity-5 bg-blue-600'
                }
              `} />

              {/* Icon */}
              <div className={`
                p-2 rounded-lg mr-3 transition-colors duration-200
                ${activeTab === item.id
                  ? 'bg-white bg-opacity-20'
                  : 'bg-gray-100 group-hover:bg-gray-200'
                }
              `}>
                <item.icon className={`
                  h-5 w-5 transition-colors duration-200
                  ${activeTab === item.id
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-blue-600'
                  }
                `} />
              </div>

              {/* Text */}
              <span className="flex-1 font-medium">{item.name}</span>

              {/* Active Indicator */}
              {activeTab === item.id && (
                <div className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-4">
            Account
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
               huzaifa8883 
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">huzaifa8883</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {/* Add logout logic */}}
            className="flex items-center w-full p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg mr-3 bg-red-100 group-hover:bg-red-200 transition-colors duration-200">
              <LogoutIcon className="h-5 w-5" />
            </div>
            <span className="flex-1 font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </div>

    {/* Bottom Section */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-gray-600">System Status</p>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-1" />
            <span className="text-xs text-green-600">Online</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          <p>Last Login: {new Date().toLocaleString()}</p>
          <p className="mt-1">Version 2.0.1</p>
        </div>
      </div>
    </div>
  </div>

        {/* Main Content */}
        <div className="flex-1">
          <Header 
            currentTime={currentTime}
            formatDateTime={formatDateTime}
            notifications={notifications}
            userProfile={userProfile}
            markNotificationAsRead={markNotificationAsRead}
          />
          
          <div className="p-8">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard
                    title="Teacher Requests"
                    value={stats.teacherRequests}
                    icon={UserGroupIcon}
                    color="border-l-4 border-blue-500"
                  />
                  <StatCard
                    title="Academy Requests"
                    value={stats.academyRequests}
                    icon={AcademicCapIcon}
                    color="border-l-4 border-green-500"
                  />
                  <StatCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={UserIcon}
                    color="border-l-4 border-purple-500"
                  />
                  <StatCard
                    title="Completed Requests"
                    value={stats.completedRequests}
                    icon={CheckCircleIcon}
                    color="border-l-4 border-yellow-500"
                  />
                </div>
                
                {/* Recent Activity */}
            {/* Recent Activity Section */}
            <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-3 rounded-xl">
            <FiActivity className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-500 mt-1">Latest registration requests and updates</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            <FiClock className="inline-block mr-1" />
            Last updated: {format(new Date(), 'HH:mm')}
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...teacherRequests, ...academyRequests]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((item, index) => (
                <motion.tr
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${
                        'name' in item 
                          ? 'bg-indigo-50 text-indigo-600' 
                          : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {'name' in item ? <FiUser className="h-5 w-5" /> : <FiBookOpen className="h-5 w-5" />}
                      </div>
                      <span className={`ml-3 text-sm font-medium ${
                        'name' in item ? 'text-indigo-600' : 'text-emerald-600'
                      }`}>
                        {'name' in item ? 'Teacher' : 'Academy'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 
                                    flex items-center justify-center text-gray-600 font-medium">
                        {item.name}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      Registration Request
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      <time dateTime={item.date}>{formatDateTime(item.date)}</time>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                      ${item.status === 'pending' 
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' 
                        : item.status === 'approved'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full mr-2
                        ${item.status === 'pending'
                          ? 'bg-yellow-500'
                          : item.status === 'approved'
                          ? 'bg-green-500'
                          : 'bg-red-500'
                        }`}
                      />
                      {item.status + item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Showing last 5 activities</span>
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
          View All Activities
        </button>
      </div>
    </motion.div>
</div>
)}

{/* Teacher Requests Tab */}
{activeTab === 'teachers' && (
  <div className="overflow-x-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
    <table className="min-w-full bg-white border-0 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl overflow-hidden">
      <thead>
        <tr className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 backdrop-blur-sm">
          <th className="px-10 py-6 font-bold text-white text-left tracking-wider text-lg">Full Name</th>
          <th className="px-10 py-6 font-bold text-white text-left tracking-wider text-lg">Email</th>
          <th className="px-10 py-6 font-bold text-white text-left tracking-wider text-lg">Phone</th>
          <th className="px-10 py-6 font-bold text-white text-left tracking-wider text-lg">Gender</th>
          <th className="px-10 py-6 font-bold text-white text-center tracking-wider text-lg">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-100">
        {teacherRequests.map((teacher) => (
          <React.Fragment key={teacher._id}>
            {/* Basic Info Row */}
            <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-500 ease-in-out">
              <td className="px-10 py-6 font-semibold text-gray-800 text-lg">{teacher.fullName}</td>
              <td className="px-10 py-6 text-gray-600">{teacher.email}</td>
              <td className="px-10 py-6 text-gray-600">{teacher.phone}</td>
              <td className="px-10 py-6 text-gray-600">{teacher.gender}</td>
              <td className="px-10 py-6 text-center">
                <div className="flex items-center gap-3 justify-center">
                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpand(teacher._id)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all duration-300 
                    hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-300 hover:scale-105 
                    focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform active:scale-95"
                  >
                    {expandedRows.includes(teacher._id) ? (
                      <>
                        <ChevronUp size={20} className="animate-bounce" />
                        <span className="font-semibold">Less Details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={20} className="animate-bounce" />
                        <span className="font-semibold">More Details</span>
                      </>
                    )}
                  </button>

                  {/* Approve Button */}
                  <button
                    onClick={() => approveTeacher(teacher._id)}
                    className="bg-green-600 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300 
                    hover:bg-green-700 hover:shadow-green-300 focus:outline-none focus:ring-4 focus:ring-green-500/50 active:scale-95"
                  >
                    Approve
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => rejectTeacher(teacher._id)}
                    className="bg-red-600 text-white px-5 py-2 rounded-full shadow-lg transition-all duration-300 
                    hover:bg-red-700 hover:shadow-red-300 focus:outline-none focus:ring-4 focus:ring-red-500/50 active:scale-95"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>

            {/* Expanded Details Row */}
            {expandedRows.includes(teacher._id) && (
              <tr>
                <td colSpan="5" className="px-10 py-8 bg-gradient-to-b from-blue-50/80 to-white">
                  {/* Images Gallery Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <span className="text-2xl">📷</span>
                      Documents & Images
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { 
                          src: teacher.profilePicture, 
                          title: "Profile Image",
                          icon: "👤"
                        },
                        { 
                          src: teacher.cnicFront, 
                          title: "CNIC Front",
                          icon: "🪪"
                        },
                        { 
                          src: teacher.cnicBack, 
                          title: "CNIC Back",
                          icon: "🪪"
                        },
                        { 
                          src: teacher.lastDegree, 
                          title: "Last Degree",
                          icon: "📜"
                        }
                      ].map((image, idx) => (
                        <div 
                          key={idx}
                          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                          <div className="aspect-w-3 aspect-h-4">
                            <img
                              src={image.src}
                              alt={image.title}
                              className="object-cover w-full h-full rounded-t-2xl"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">{image.icon}</span>
                                  <h4 className="font-semibold">{image.title}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* View Full Image Button */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                              onClick={() => window.open(image.src, '_blank')}
                              className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
                            >
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { label: "Username", value: teacher.username, icon: "👨‍💻", color: "from-cyan-500 to-blue-600" },
                      { label: "Date of Birth", value: teacher.dateOfBirth, icon: "🎂", color: "from-pink-500 to-red-500" },
                      { label: "Address", value: teacher.address, icon: "📍", color: "from-green-500 to-emerald-600" },
                      { label: "Qualification", value: teacher.qualification, icon: "🎓", color: "from-purple-500 to-indigo-600" },
                      { label: "Specialization", value: teacher.specialization, icon: "🎯", color: "from-indigo-500 to-purple-600" },
                      { label: "University", value: teacher.university, icon: "🏛️", color: "from-yellow-500 to-orange-600" },
                      { label: "Graduation Year", value: teacher.graduationYear, icon: "📅", color: "from-blue-500 to-cyan-600" },
                      { label: "Experience", value: `${teacher.experience} years`, icon: "⭐", color: "from-amber-500 to-yellow-600" },
                      { label: "Previous Institution", value: teacher.previousInstitutions, icon: "🏫", color: "from-red-500 to-pink-600" },
                      { label: "Subjects", value: teacher.subjects.join(", "), icon: "📚", color: "from-teal-500 to-green-600" },
                      { label: "Teaching Level", value: teacher.teachingLevel.join(", "), icon: "📝", color: "from-rose-500 to-pink-600" },
                      { label: "Teaching Methodology", value: teacher.teachingMethodology, icon: "👨‍🏫", color: "from-orange-500 to-red-600" },
                      { label: "Available Timings", value: teacher.availableTimings, icon: "⏰", color: "from-green-500 to-teal-600" },
                      { label: "References", value: teacher.references, icon: "👥", color: "from-violet-500 to-purple-600" },
                      { label: "Expected Salary", value: teacher.expectedSalary, icon: "💰", color: "from-lime-500 to-green-600" },
                      { 
                        label: "Status", 
                        value: (
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            {teacher.status}
                          </span>
                        ),
                        icon: "🔄",
                        color: "from-blue-500 to-indigo-600"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 
                        hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
                      >
                        <div className={`flex items-center gap-4 mb-3 p-3 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10`}>
                          <span className="text-2xl">{item.icon}</span>
                          <strong className="text-gray-800 text-lg">{item.label}</strong>
                        </div>
                        <div className="text-gray-600 ml-4 mt-4 text-lg">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)}

{/* Academy Requests Tab */}
{activeTab === 'academies' && (
   <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5 }}
   className="p-6 bg-gray-50"
 >
   {/* Header Section */}
   <div className="mb-8">
     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
       <div>
         <h2 className="text-3xl font-bold text-gray-800 mb-2">Academy Requests</h2>
         <p className="text-gray-500">Manage and review academy registration requests</p>
       </div>
       
       <div className="flex flex-col sm:flex-row gap-4">
         {/* Search Bar */}
         <div className="relative">
           <input
             type="text"
             placeholder="Search academies..."
             className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
           />
           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
         </div>

         {/* Filter Dropdown */}
         <div className="relative">
           <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl 
                            px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
             <option value="all">All Requests</option>
             <option value="pending">Pending</option>
             <option value="approved">Approved</option>
             <option value="rejected">Rejected</option>
           </select>
           <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
         </div>

         {/* Export Button */}
         <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 
                        rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg 
                        hover:shadow-blue-500/30">
           <FiDownload />
           <span>Export</span>
         </button>
       </div>
     </div>
   </div>

   {/* Table Section */}
   <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
     <div className="overflow-x-auto">
       <table className="min-w-full divide-y divide-gray-200">
         <thead>
           <tr className="bg-gray-50">
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Academy
             </th>
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Email
             </th>
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Location
             </th>
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Courses
             </th>
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Status
             </th>
             <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
               Actions
             </th>
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
           {academyRequests.map((academy) => (
             <motion.tr
               key={academy.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.3 }}
               className="hover:bg-gray-50 transition-colors duration-200"
             >
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="flex items-center">
                   <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 
                                 flex items-center justify-center text-white shadow-lg">
                     <span className="text-xl font-semibold">
                       {academy.name.charAt(0)}
                     </span>
                   </div>
                   <div className="ml-4">
                     <div className="text-sm font-semibold text-gray-900">{academy.name}</div>
                     <div className="text-xs text-gray-500">Applied on {formatDateTime(academy.date)}</div>
                   </div>
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{academy.email}</div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <div className="text-sm text-gray-900">{academy.location}</div>
               </td>
               <td className="px-6 py-4">
                 <div className="flex flex-wrap gap-2">
                   {academy.courses.map((course, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 
                                border border-blue-100 font-medium"
                     >
                       {course}
                     </span>
                   ))}
                 </div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                   academy.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-200' :
                   academy.status === 'approved' ? 'bg-green-50 text-green-600 border border-green-200' :
                   'bg-red-50 text-red-600 border border-red-200'
                 }`}>
                   {academy.status.charAt(0).toUpperCase() + academy.status.slice(1)}
                 </span>
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                 {academy.status === 'pending' && (
                   <div className="flex space-x-3">
                     <button
                       onClick={() => handleAcademyAction(academy.id, 'approved')}
                       className="px-4 py-1 text-sm font-medium text-green-600 bg-green-50 
                                rounded-lg hover:bg-green-100 transition-colors duration-200"
                     >
                       Approve
                     </button>
                     <button
                       onClick={() => handleAcademyAction(academy.id, 'rejected')}
                       className="px-4 py-1 text-sm font-medium text-red-600 bg-red-50 
                                rounded-lg hover:bg-red-100 transition-colors duration-200"
                     >
                       Reject
                     </button>
                   </div>
                 )}
               </td>
             </motion.tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
 </motion.div>
)}

{/* Students Tab */}
{activeTab === 'students' && (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold">Students</h2>
      <div className="flex items
-center space-x-4">
        <input
          type="text"
          placeholder="Search students..."
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Grades</option>
          <option value="10">10th Grade</option>
          <option value="11">11th Grade</option>
          <option value="12">12th Grade</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Export Data
        </button>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white">
                    <span className="text-lg font-medium">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-500">Joined {formatDateTime(student.joinDate)}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                  {student.grade}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDateTime(student.joinDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">{stats.totalStudents}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* Completed Requests Tab */}

{activeTab === 'approvedTeachers' && (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Approved Teachers</h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvedUsers.map((teacher, index) => (
                <tr key={`${teacher._id}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-600">
                        <span className="text-lg font-medium">
                          {teacher.fullName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.fullName}</div>
                        <div className="text-sm text-gray-500">{teacher.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {teacher.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(teacher.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(teacher.approvedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleExpand(teacher._id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-3"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => window.open(`/teacher-profile/${teacher._id}`, '_blank')}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
)}
{/* Settings Tab */}
{activeTab === 'settings' && (
  <div>
    <h2 className="text-3xl font-bold mb-8">Settings</h2>
    <SettingsPanel settings={settings} toggleSetting={toggleSetting} />
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;