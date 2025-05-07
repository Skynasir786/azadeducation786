import React, { useState, useEffect ,useRef} from 'react';
import axios from "axios"; // Upar import kar lena
import { io } from 'socket.io-client';
import {Link} from "react-router-dom"
import JitsiMeeting from "./Jistsimeet.jsx"


import { 
  FiUsers, 
  FiBookOpen, 
  FiCreditCard ,
  FiTrendingUp, 
  FiDollarSign,
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiSettings,
  FiMonitor,
  FiFileText,
  FiClipboard,
  FiPhoneOff,
  FiCalendar,
  FiVideo,
  FiMessageCircle,
  FiMic,
  FiX,
  FiUserMinus,
  FiShare2,
  FiLogOut,
  FiPlay,
  FiDownload,
  FiUserPlus,
  FiUserCheck ,
  FiAward,
  FiBook,
  FiBarChart2,
  FiPlus,
  FiFilter,
  FiMoreVertical,
  FiSearch ,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiEye ,
  FiTrash2 ,
  FiChevronDown,
  FiCode,
  FiClock,
  FiMessageSquare,
  FiActivity,
  FiStar
} from 'react-icons/fi';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const TeacherDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // For preview
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [activeSession, setActiveSession] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [students, setStudents] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);  // To hold the socket reference
  const studentsRef = useRef(students);
 

 

  
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    price: "",
    level: "",
    language: "",
    whatYouWillLearn: "",
    requirements: "",
    courseType: "", // Video, Online, InPerson
    videoFile: null,
    classTime: "",
    classDaysPerWeek: "",
    courseDuration: "",
    inPersonDetails: "",
    userId:""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId from localStorage:", storedUserId);
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, userId: storedUserId }));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      setSelectedFile(file);
  
      // Show file preview if it's an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.onerror = () => {
          console.error('Error reading file');
          setPreviewUrl(null);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file)); // Set preview image
      // Save file locally to upload later with form submission
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: file, // Store the file object for later upload
      }));
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ⛔ Don't rely on formData.userId
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("User ID not found! Please log in first.");
      return;
    }
  
    const formDataToSubmit = new FormData();
  
    // Append all fields except thumbnail and userId
    for (const key in formData) {
      if (key !== "thumbnail" && key !== "userId") {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
    // Append thumbnail
    if (formData.thumbnail) {
      formDataToSubmit.append("thumbnail", formData.thumbnail);
    }
  
    // ✅ Append userId directly from localStorage
    formDataToSubmit.append("userId", storedUserId);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/users/createcourse",
        formDataToSubmit,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course created:", response.data.course);
      alert("Course created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data?.message || error.message);
      alert("Failed to create course: " + (error.response?.data?.message || "Unknown error"));
    }
  };
  

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
  
    // Fetch all approved users
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/users/getallapproved');
        const data = await res.json();
        console.log("Fetched students:", data);
  
        if (Array.isArray(data.data)) {
          setStudents(data.data);
          studentsRef.current = data.data;
        } else {
          console.error("Fetched data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  
    // Initialize socket connection if not already created
    if (!socketRef.current) {
      const newSocket = io('http://localhost:5000', {
        withCredentials: true,
      });
  
      socketRef.current = newSocket;
  
      // 🔐 Register user with backend
      newSocket.emit('register', userId);
  
      // 📩 Handle incoming message
      const handleMessage = (message) => {
        const isFromCurrent = selectedStudentId === message.senderId;
  
        if (!isFromCurrent) {
          setUnreadMessages((prev) => ({
            ...prev,
            [message.senderId]: (prev[message.senderId] || 0) + 1,
          }));
        }
  
        setMessages((prev) => [...prev, message]);
      };
  
      newSocket.on('receiveMessage', handleMessage);
  
      // Cleanup on unmount
      return () => {
        newSocket.off('receiveMessage', handleMessage);
        newSocket.close();
        socketRef.current = null;
      };
    }
  
    return () => {
      socketRef.current?.off('receiveMessage');
    };
  }, [selectedStudentId]);
  
  // Handle student selection and reset unread messages count
  const handleSelectStudent = (id) => {
    setSelectedStudentId(id);
    setUnreadMessages((prev) => ({
      ...prev,
      [id]: 0,
    }));
  };

  // Function to send message
  const sendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !selectedStudentId || !socketRef.current) return;
  
    let fileUrl = '';
    let fileName = '';
    let fileType = '';
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      try {
        setUploadProgress(0);
        const response = await fetch("http://localhost:5000/users/file", {
          method: "POST",
          body: formData,
        });
  
        const data = await response.json();
        fileUrl = data.fileUrl || "";
        fileName = selectedFile.name;
        fileType = selectedFile.type;
        setUploadProgress(100);
        
        setTimeout(() => {
          setUploadProgress(0);
        }, 500);
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadProgress(0);
        return;
      }
    }
  
    const messageObj = {
      senderId: localStorage.getItem('userId'),
      receiverId: selectedStudentId,
      message: newMessage.trim(),
      fileUrl,
      fileName,
      fileType,
      timestamp: new Date().toISOString(),
    };
  
    socketRef.current.emit('sendMessage', messageObj);
    setNewMessage('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalViews: 0,

    recentActivities: [
      { id: 1, student: "Alex Johnson", action: "Enrolled", course: "Advanced React Patterns", time: "2 minutes ago" },
      { id: 2, student: "Sarah Smith", action: "Completed", course: "JavaScript Masterclass", time: "15 minutes ago" },
      { id: 3, student: "Michael Brown", action: "Reviewed", course: "Vue.js Advanced", time: "1 hour ago" },
      { id: 4, student: "Emily Davis", action: "Enrolled", course: "Node.js Backend", time: "2 hours ago" },
    ],
    topCourses: [
      { id: 1, name: "Advanced React Patterns", students: 456, progress: 85, revenue: 12500 },
      { id: 2, name: "JavaScript Masterclass", students: 385, progress: 72, revenue: 9800 },
      { id: 3, name: "Vue.js Advanced", students: 245, progress: 65, revenue: 6500 },
    ]
  });

  // Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [15000, 18000, 21000, 19000, 25000, 28000],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const studentsData = {
    labels: ['React', 'JavaScript', 'Vue', 'Node'],
    datasets: [
      {
        data: [456, 385, 245, 178],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };
  // Add this in your state declarations
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
    <div className={`dashboard-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
     <aside 
     className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800 border-r border-gray-200/80 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out z-50 backdrop-blur-xl
       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
   >
     <div className="flex flex-col h-full">
       {/* Sidebar Header with Gradient */}
       <div className="p-6 border-b border-gray-200/80 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-800/30">
  <div className="flex items-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 p-0.5">
        {/* Profile Picture or Initials */}
        {user && user.profilePicture ? (
          <img 
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white text-xl font-bold rounded-xl">
            {user ? user.fullName?.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      {/* Status Indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
    </div>
    <div>
      {/* Full Name */}
      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        {user ? user.fullName : 'Guest'}
      </h2>
      {/* Date and Time */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {new Date().toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
  </div>
</div>


   
       {/* Enhanced Navigation Menu */}
       <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto scrollbar-thin">
         {[
           { icon: FiBarChart2, label: 'Dashboard', id: 'dashboard', gradient: 'from-blue-500 to-indigo-500' },
           { icon: FiBookOpen, label: 'Courses', id: 'courses', gradient: 'from-emerald-500 to-teal-500' },
           { icon: FiUsers, label: 'Students', id: 'students', gradient: 'from-violet-500 to-purple-500' },
           { icon: FiPlay, label: 'Live Sessions', id: 'live-sessions', gradient: 'from-pink-500 to-rose-500' },
           { icon: FiDollarSign, label: 'Revenue', id: 'revenue', gradient: 'from-amber-500 to-orange-500' },
           { icon: FiSettings, label: 'Settings', id: 'settings', gradient: 'from-gray-500 to-slate-500' },
           { icon: FiMessageSquare, label: 'Messages', id: 'messenger', gradient: 'from-gray-500 to-slate-500' }

         ].map(({ icon: Icon, label, id, gradient }) => (
           <button
             key={id}
             onClick={() => setCurrentPage(id)}
             className={`w-full group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 
               ${currentPage === id 
                 ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
                 : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/50'}`}
           >
             <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
               currentPage === id 
                 ? 'bg-white/20' 
                 : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white group-hover:shadow-md'
             }`}>
               <Icon className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                 currentPage === id 
                   ? 'text-white' 
                   : 'text-gray-500 dark:text-gray-400 group-hover:text-indigo-500'
               }`} />
             </div>
             <span className="font-medium">{label}</span>
             {currentPage === id && (
               <div className="ml-auto flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
               </div>
             )}
           </button>
         ))}
       </nav>
   
       {/* Enhanced User Profile & Logout */}
       <div className="p-4 border-t border-gray-200/80 dark:border-gray-700/50 bg-gradient-to-t from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-800/30">
         <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-300 group shadow-sm hover:shadow-md">
           <div className="relative">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 p-0.5">
  <img 
    src={user?.profilePicture || "https://img.freepik.com/free-photo/closeup-young-hispanic-man-casuals-studio_662251-600.jpg"} 
    alt="Profile" 
    className="w-full h-full rounded-lg object-cover"
  />
</div>

           </div>
           <div className="flex-1">
  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
    {user ? user.fullName : 'Guest'}
  </h4>
  <p className="text-xs text-gray-500 dark:text-gray-400">
    <Link to="/profile">View Profile</Link>
  </p>
</div>

           <button 
             className="p-2.5 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 hover:-translate-y-0.5"
             onClick={() => {/* handle logout */}}
           >
             <FiLogOut className="text-lg" />
           </button>
         </div>
       </div>
     </div>
   </aside>
      {/* Main Content */}
      {currentPage === 'dashboard' && (

<main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 transition-all duration-500">
  {/* Background Decoration */}
  <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent pointer-events-none"></div>

  {/* Header */}
  <header className="flex justify-between items-center mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
    <div className="flex items-center gap-4">
      <button 
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FiMenu className="text-2xl text-gray-600 dark:text-gray-300" />
      </button>
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">{new Date("2025-03-13 21:57:23").toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      {/* Theme Toggle */}
      <button 
        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        onClick={toggleTheme}
      >
        {darkMode ? 
          <FiSun className="text-2xl text-yellow-500 group-hover:rotate-180 transition-transform duration-500" /> : 
          <FiMoon className="text-2xl text-gray-600 group-hover:-rotate-180 transition-transform duration-500" />
        }
      </button>
      
      {/* Notifications */}
      <div className="relative group">
        <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95">
          <FiBell className="text-2xl text-gray-600 dark:text-gray-300 group-hover:animate-bell" />
        </button>
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">3</span>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 pl-6 border-l border-gray-200 dark:border-gray-700">
  <div className="hidden md:block text-right">
    {/* Full Name */}
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
      {user ? user.fullName : 'Guest'}
    </h4>
    {/* Role */}
    <p className="text-xs text-gray-500 dark:text-gray-400">Teacher</p>
  </div>
  <div className="relative group cursor-pointer">
    {/* Profile Picture or Initials */}
    {user && user.profilePicture ? (
      <img 
        src={user.profilePicture} 
        alt="Profile" 
        className="w-11 h-11 rounded-xl ring-2 ring-primary-500 transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <div className="w-11 h-11 flex items-center justify-center bg-gray-300 text-white text-xl font-bold rounded-xl ring-2 ring-primary-500">
        {user ? user.fullName?.charAt(0).toUpperCase() : 'U'}
      </div>
    )}
    {/* Status Indicator */}
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
  </div>
</div>

    </div>
  </header>

  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[
      { icon: FiUsers, title: 'Total Students', value: stats.totalStudents.toLocaleString(), trend: '+12.5%', color: 'blue', bgGradient: 'from-blue-500/20 to-cyan-500/20' },
      { icon: FiBookOpen, title: 'Total Courses', value: stats.totalCourses, trend: '+5.8%', color: 'emerald', bgGradient: 'from-emerald-500/20 to-teal-500/20' },
      { icon: FiDollarSign, title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+18.2%', color: 'violet', bgGradient: 'from-violet-500/20 to-purple-500/20' },
      { icon: FiTrendingUp, title: 'Total Views', value: stats.totalViews.toLocaleString(), trend: '+8.9%', color: 'orange', bgGradient: 'from-orange-500/20 to-amber-500/20' }
    ].map((stat, index) => (
      <div 
        key={index} 
        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.bgGradient} transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}>
            <stat.icon className={`text-2xl text-${stat.color}-500`} />
          </div>
          <span className={`text-sm font-semibold text-${stat.color}-500 bg-${stat.color}-100/50 dark:bg-${stat.color}-900/20 px-3 py-1.5 rounded-xl`}>
            {stat.trend}
          </span>
        </div>
        <div className="mt-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{stat.title}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Charts Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
        <select className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium border-0 focus:ring-2 focus:ring-primary-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
      <div className="h-[400px] w-full">
        <Line data={revenueData} options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.8)',
              padding: 12,
              borderRadius: 8,
              bodyFont: { size: 14 },
              titleFont: { size: 16 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(156, 163, 175, 0.1)' },
              ticks: { padding: 10 }
            },
            x: {
              grid: { display: false },
              ticks: { padding: 10 }
            }
          },
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 3,
              borderColor: '#6366f1'
            },
            point: {
              radius: 4,
              borderWidth: 2,
              backgroundColor: '#ffffff',
              borderColor: '#6366f1',
              hoverRadius: 6
            }
          }
        }} />
      </div>
    </div>

    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Students per Course</h3>
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          View All
        </button>
      </div>
      <div className="h-[400px]">
        <Doughnut data={studentsData} options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                font: { size: 12 }
              }
            }
          }
        }} />
      </div>
    </div>
  </div>

  {/* Bottom Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Top Courses */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Top Performing Courses</h3>
        <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">View All</button>
      </div>
      <div className="space-y-4">
        {stats.topCourses.map(course => (
          <div key={course.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {course.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.students.toLocaleString()} students enrolled
                </p>
              </div>
              <span className="text-sm font-bold text-primary-500 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-xl">
                ${course.revenue.toLocaleString()}
              </span>
            </div>
            <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500 group-hover:from-primary-500 group-hover:to-primary-300"
                style={{ width: `${course.progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Activity */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/30">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiFilter className="text-gray-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <FiMoreVertical className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {stats.recentActivities.map(activity => (
          <div key={activity.id} className="group flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${
              activity.action === 'Enrolled' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-500' :
              activity.action === 'Completed' ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-500' :
              'bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-500'
            }`}>
              {activity.action === 'Enrolled' && <FiUsers className="text-xl" />}
              {activity.action === 'Completed' && <FiBookOpen className="text-xl" />}
              {activity.action === 'Reviewed' && <FiTrendingUp className="text-xl" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {activity.student}
                </h4>
                <small className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</small>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activity.action} in <span className="font-medium text-gray-700 dark:text-gray-300">
                    {
                        activity.course}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
      )}

{currentPage === 'courses' && (
  <div className="min-h-[calc(100vh-var(--header-height))] translate-x-[300px] bg-gray-50 dark:bg-gray-900 p-8 relative overflow-hidden">
    {/* Background Gradient Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            My Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track your course content
          </p>
        </div>
       
        <div className="p-6">
      {/* Create New Course Button */}
      <button
        className="group flex items-center text-white gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
        onClick={() => setIsOpen(true)}
      >
        <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
        Create New Course
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 overflow-auto">
    <div className="absolute top-8 w-full max-w-3xl mx-4 bg-white rounded-3xl p-8 shadow-2xl animate-fadeIn overflow-hidden">

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Create New Course
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                  required
                />

<select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
  required
>
  <option value="">Select Category</option>

  <optgroup label="Academic Courses (School & College)">
    <option value="Matric & Intermediate">Matric & Intermediate (Science, Arts, Commerce)</option>
    <option value="O-Level & A-Level">O-Level & A-Level (Cambridge & Federal Board)</option>
    <option value="Engineering Entrance Exams">Engineering Entrance Exams (ECAT, NUST, PIEAS, GIKI)</option>
    <option value="Medical Entrance Exams">Medical Entrance Exams (MDCAT, NUMS, AKU)</option>
    <option value="CSS & FPSC Preparation">CSS & FPSC Preparation</option>
    <option value="Bachelors & Masters">Bachelors & Masters (BS, MS, MBA, MPhil, PhD)</option>
  </optgroup>

  <optgroup label="Professional & Skill-Based Courses">
    <option value="Freelancing">Freelancing (Fiverr, Upwork, PeoplePerHour)</option>
    <option value="Graphic Designing">Graphic Designing (Photoshop, Illustrator, Canva)</option>
    <option value="Digital Marketing">Digital Marketing (SEO, Facebook Ads, Google Ads, SMM)</option>
    <option value="E-commerce">E-commerce (Daraz, Amazon, Shopify, eBay, Etsy)</option>
    <option value="Web Development">Web Development (HTML, CSS, JS, React, WordPress, etc.)</option>
    <option value="App Development">App Development (Flutter, React Native, Android, iOS)</option>
    <option value="Cyber Security">Cyber Security & Ethical Hacking</option>
    <option value="Data Science & AI">Data Science & AI (Python, ML, DL, ChatGPT Tools)</option>
  </optgroup>

  <optgroup label="Language & Communication Courses">
    <option value="English Language">English Language (IELTS, TOEFL, Spoken English)</option>
    <option value="Urdu & Pashto Writing">Urdu & Pashto Writing</option>
    <option value="Foreign Languages">Chinese, German, French Language Courses</option>
  </optgroup>

  <optgroup label="Govt. & Competitive Exam Prep">
    <option value="Competitive Exams">CSS, PMS, FPSC, PPSC, SPSC, KPPSC, BPSC</option>
    <option value="Armed Forces Tests">Pak Army, Navy, Air Force Tests (ISSB, Initial Tests)</option>
    <option value="Police & FIA Exams">Police, FIA, ASF, NAB Exam Preparation</option>
    <option value="University Entry Tests">LUMS, IBA, FAST, GIKI Entry Tests</option>
  </optgroup>

  <optgroup label="Business & Finance">
    <option value="Accounting & Finance">Accounting & Finance (QuickBooks, Excel, SAP)</option>
    <option value="Trading">Stock Market & Crypto Trading</option>
    <option value="Entrepreneurship">Entrepreneurship & Business Startup Guide</option>
  </optgroup>

  <optgroup label="Personal Development">
    <option value="Time Management">Time Management & Productivity</option>
    <option value="Public Speaking">Public Speaking & Communication Skills</option>
    <option value="Leadership">Leadership & Team Management</option>
    <option value="Career Counseling">Career Counseling & Job Interview Prep</option>
  </optgroup>

  <optgroup label="Islamic & Religious Studies">
    <option value="Quran & Tajweed">Quran Tafseer & Tajweed</option>
    <option value="Hadith & Fiqh">Hadith & Fiqh Courses</option>
    <option value="Islamic Banking">Islamic Banking & Finance</option>
  </optgroup>
</select>

              </div>

              <textarea
                name="description"
                placeholder="Course Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                rows="2"
                required
              />

<input
                type="file"
                name="thumbnail"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                required
              />

              {/* Thumbnail Preview */}
              {thumbnailPreview && (
                <div className="mt-4">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                  required
                />

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <input
                type="text"
                name="language"
                placeholder="Language"
                value={formData.language}
                onChange={handleChange}
                className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                required
              />
              <select
  name="courseType"
  value={formData.courseType}
  onChange={handleChange}
  className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
  required
>
  <option value="">Select Course Type</option>
  <option value="Video">Video Course</option>
  <option value="Online">Online (Zoom)</option>
  <option value="InPerson">In-Person</option>
</select>

{/* Conditional Fields Based on Course Type */}
{formData.courseType === "Video" && (
  <div>
    <label className="block mt-4">Upload Video File:</label>
    <input
      type="file"
      name="videoFile"
      onChange={(e) =>
        setFormData({ ...formData, videoFile: e.target.files[0] })
      }
      accept="video/*"
      className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
    />
  </div>
)}

{formData.courseType === "Online" && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <input
      type="text"
      name="classTime"
      placeholder="Class Time (e.g. 7PM - 8PM)"
      value={formData.classTime}
      onChange={handleChange}
      className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
    />
    <input
      type="number"
      name="classDaysPerWeek"
      placeholder="Classes per Week"
      value={formData.classDaysPerWeek}
      onChange={handleChange}
      className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
    />
    <input
      type="text"
      name="courseDuration"
      placeholder="Course Duration (e.g. 2 months)"
      value={formData.courseDuration}
      onChange={handleChange}
      className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
    />
  </div>
)}

{formData.courseType === "InPerson" && (
  <textarea
    name="inPersonDetails"
    placeholder="Please describe your location and timing preference"
    value={formData.inPersonDetails}
    onChange={handleChange}
    className="w-full border-b-2 focus:border-purple-500 outline-none py-2 mt-4"
    rows="2"
  />
)}


              <textarea
                name="whatYouWillLearn"
                placeholder="What You Will Learn (comma separated)"
                value={formData.whatYouWillLearn}
                onChange={handleChange}
                className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                rows="2"
                required
              />

              <textarea
                name="requirements"
                placeholder="Requirements (comma separated)"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border-b-2 focus:border-purple-500 outline-none py-2"
                rows="2"
                required
              />

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border rounded-full text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:scale-105 transition-all"
                >
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>

      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {/* Search Box */}
            <div className="relative max-w-md">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filter Groups */}
            <div className="flex flex-wrap gap-4">
              {['All Categories', 'All Status', 'Sort By'].map((filter) => (
                <select key={filter} className="px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 cursor-pointer transition-all duration-300">
                  <option>{filter}</option>
                </select>
              ))}
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-primary-500 text-white flex items-center gap-2">
              <FiGrid /> Grid
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
              <FiList /> List
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2025</h3>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiChevronLeft />
          </button>
          <span className="font-medium">March</span>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
  {courses.map((course, index) => (
    <div 
      key={index}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-56">
        <img 
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay with Level & Price */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="bg-primary-500 text-white text-sm px-3 py-1 rounded-md">
              {course.level}
            </span>
            <span className="bg-white text-gray-900 font-bold text-sm px-3 py-1 rounded-md">
              {course.price}Pkr
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <div className="text-primary-500 text-sm font-medium mb-2">
          {course.category} • {course.language}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2">
          {course.description}
        </p>

        {/* What You Will Learn */}
        {course.whatYouWillLearn && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
              </svg>
              What you'll learn
            </h4>
            <ul className="space-y-2">
              {Array.isArray(course.whatYouWillLearn) 
                ? course.whatYouWillLearn.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))
                : <li className="text-gray-600 dark:text-gray-400">{course.whatYouWillLearn}</li>
              }
            </ul>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Edit Course
          </button>
          <button className="flex-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
          <FiChevronLeft /> Previous
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 12].map((num, i) => (
            <button 
              key={i}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                num === 1 
                  ? 'bg-primary-500 text-white' 
                  : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  </div>
)}

{currentPage === 'students' && (
  <main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all duration-500">
    {/* Decorative Background Effects */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
    </div>

    <div className="relative z-10 max-w-[2000px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title and Date */}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Students Management
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, <span className="font-semibold text-indigo-600 dark:text-indigo-400">{"huzaifa8883"}</span>
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {new Date("2025-03-13 22:24:58").toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiDownload className="text-lg" />
              <span className="font-medium">Export Data</span>
            </button>
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5">
              <FiUserPlus className="text-lg" />
              <span className="font-medium">Add New Student</span>
            </button>
            <button className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiMoreVertical className="text-lg" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { 
              label: 'Total Students',
              value: '2,845',
              change: '+12.5%',
              icon: FiUsers,
              gradient: 'from-blue-600 to-indigo-600',
              lightBg: 'bg-blue-50',
              darkBg: 'dark:bg-blue-900/20',
              textColor: 'text-blue-600 dark:text-blue-400'
            },
            {
              label: 'Active Students',
              value: '2,241',
              change: '+8.1%',
              icon: FiUserCheck,
              gradient: 'from-emerald-600 to-teal-600',
              lightBg: 'bg-emerald-50',
              darkBg: 'dark:bg-emerald-900/20',
              textColor: 'text-emerald-600 dark:text-emerald-400'
            },
            {
              label: 'Course Completion',
              value: '84%',
              change: '+5.4%',
              icon: FiAward,
              gradient: 'from-violet-600 to-purple-600',
              lightBg: 'bg-violet-50',
              darkBg: 'dark:bg-violet-900/20',
              textColor: 'text-violet-600 dark:text-violet-400'
            },
            {
              label: 'Average Grade',
              value: 'B+',
              change: '+2.2%',
              icon: FiTrendingUp,
              gradient: 'from-amber-600 to-orange-600',
              lightBg: 'bg-amber-50',
              darkBg: 'dark:bg-amber-900/20',
              textColor: 'text-amber-600 dark:text-amber-400'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                    <stat.icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.lightBg} ${stat.darkBg} ${stat.textColor}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
              {/* Decorative Elements */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search students by name, course, or ID..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Course', options: ['All Courses', 'Web Development', 'Mobile Development', 'UI/UX Design'] },
              { label: 'Status', options: ['All Status', 'Active', 'Inactive', 'On Hold'] },
              { label: 'Sort By', options: ['Latest', 'Name', 'Progress', 'Rating'] }
            ].map((filter, index) => (
              <div key={index} className="relative group">
                <select className="appearance-none w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 cursor-pointer">
                  {filter.options.map(option => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-300 pointer-events-none" />
              </div>
            ))}
            <button className="p-3 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
              <FiFilter className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
          >
            {/* Student Card Header */}
            <div className="relative h-40">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              </div>

              {/* Student Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="relative group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt="Student"
                      className="w-16 h-16 rounded-xl border-2 border-white/50 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">
                        Student {index + 1}
                      </h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-100 border border-indigo-500/30">
                        Pro
                      </span>
                    </div>
                    <p className="text-white/80 text-sm flex items-center gap-2">
                      <FiCode />
                      Full Stack Development
                    </p>
                  </div>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </div>

            {/* Student Card Body */}
            <div className="p-6 space-y-6">
              {/* Status and Level */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border border-green-500/30">
                  Active Student
                </span>
                <div className="flex items-center gap-2">
                  <FiStar className="text-amber-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Level {index + 5}
                  </span>
                </div>
              </div>

              {/* Progress Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Course Progress</span>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {78 + index}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full transition-all duration-500 relative group-hover:from-indigo-500 group-hover:to-pink-500"
                    style={{ width: `${78 + index}%` }}
                  >
                    <div className="absolute inset-0 bg-[length:20px_20px] animate-shimmer"
                         style={{
                           backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)'
                         }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: FiBook, label: 'Courses', value: 12 + index },
                  { icon: FiAward, label: 'Certificates', value: 8 + index },
                  { icon: FiClock, label: 'Hours', value: `${120 + index}h` }
                ].map((stat, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">
                    <stat.icon className="text-lg text-indigo-500 mb-1" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25">
                  View Profile
                </button>
                <button className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                  <FiMessageSquare className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Pagination */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-2 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <FiChevronLeft className="text-xl" />
          </button>
          
          {[1, 2, 3, '...', 8].map((page, index) => (
            <button
              key={index}
              className={`min-w-[40px] h-10 rounded-lg flex items-center justify-center font-medium transition-all duration-300 
                ${page === 1 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {page}
            </button>
          ))}
          
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Quick Stats Floating Card */}
      <div className="fixed bottom-6 right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-gray-700/30 shadow-lg animate-float">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <FiActivity className="text-2xl text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online Students</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">1,234</p>
          </div>
        </div>
      </div>
    </div>
  </main>
)}
{currentPage === 'live-sessions' && (
  <main className="flex-1 min-h-screen ml-72 bg-[#f8faff] dark:bg-gray-900 transition-all duration-500">
    {/* Top Banner */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Virtual Classroom</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                <span className="ml-2 text-sm font-medium">Live Session</span>
              </div>
              <div className="text-sm font-medium">
                <span>Session ID: AzadEducation-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold tracking-wider" id="session-timer">
                00:00:00
              </div>
              <div className="text-xs font-medium text-blue-200">Duration</div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-lg font-semibold">25</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">Students</div>
                <div className="text-blue-200">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-8 py-6">
      {/* Control Panel */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setMeetingStarted(true)}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 filter blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
                <span className="relative flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"/>
                  </svg>
                  Start Teaching
                </span>
              </button>
              
              <button 
                onClick={() => setMeetingStarted(false)}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-red-600 to-rose-600 filter blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></span>
                <span className="relative flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  End Class
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {/* Quick Actions */}
              <div className="flex -space-x-2">
                <button className="relative z-30 p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share Screen</span>
                </button>
                
                <button className="relative z-20 p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Record</span>
                </button>
                
                <button className="relative z-10 p-3 rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Container with Enhanced UI */}
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <JitsiMeeting
                roomName="AzadEducationLiveRoom1"
                configOverwrite={{
                  startWithAudioMuted: false,
                  disableModeratorIndicator: true,
                  startScreenSharing: false,
                  enableEmailInStats: false,
                  prejoinPageEnabled: false,
                  hideConferenceSubject: true,
                  hideConferenceTimer: true,
                  disableResponsiveTiles: true
                }}
                interfaceConfigOverwrite={{
                  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                  SHOW_JITSI_WATERMARK: false,
                  TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat',
                    'recording', 'livestreaming', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats',
                    'shortcuts', 'tileview', 'videobackgroundblur',
                    'download', 'help', 'mute-everyone'
                  ],
                }}
                getIFrameRef={(iframeRef) => { 
                  iframeRef.style.height = '600px';
                  iframeRef.style.width = '100%';
                }}
              />
            </div>
          </div>
        </div>

        {/* Participants Panel */}
        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[600px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center justify-between">
                Participants
                <span className="bg-indigo-100 text-indigo-600 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                  25 Online
                </span>
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Teacher */}
              <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                    HQ
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">Huzaifa Quershi</p>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">Teacher</p>
                </div>
              </div>

              {/* Students */}
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                      {String.fromCharCode(65 + i)}S
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">Student {i + 1}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Listening</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-50 dark:bg-gray-700 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span className="text-sm font-medium">Invite</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 dark:bg-gray-700 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
                  </svg>
                  <span className="text-sm font-medium">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
)}

{currentPage === 'messenger' && (
  <main className="flex-1 min-h-screen ml-72 bg-gray-50 dark:bg-gray-900">
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Teacher Messenger</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        {students.map((user) => {
  console.log("User ID:", user._id);
  messages.forEach((msg) => {
    console.log("Message senderId:", msg.senderId); // ya msg.userId
  });

  const userMsgCount =
  selectedStudentId !== user._id
    ? messages.filter((msg) => msg.senderId === user._id).length
    : 0;

  return (
    <div
    key={user._id}
    onClick={() => setSelectedStudentId(user._id)}
    className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
      userMsgCount > 0 ? 'bg-yellow-100 dark:bg-yellow-800' : ''
    }`}
  >
    <div className="flex items-center justify-between">
      <span className="text-gray-800 dark:text-white font-medium">{user.fullName}</span>
  
      {userMsgCount > 0 && (
        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {userMsgCount}
        </span>
      )}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">Status: online</div>
  </div>
  
  );
})}

</aside>



        {/* Chat Messages Area */}
        {selectedStudentId ? (
          <section className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, idx) => {
                  const isOwnMessage = msg.senderId === localStorage.getItem('userId');
                  return (
                    <div key={idx} className={`flex items-end space-x-2 ${isOwnMessage ? 'justify-end' : ''}`}>
                      {!isOwnMessage && (
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                            S
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                      <div className={`group relative max-w-md ${isOwnMessage ? 'order-first' : ''}`}>
                        <div className={`p-4 rounded-2xl ${
                          isOwnMessage
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                        } shadow-sm`}>
                          {msg.message && <p className="break-words mb-2">{msg.message}</p>}
                          
                          {msg.fileUrl && (
                            <div className="mt-2">
                              {msg.fileType?.startsWith('image/') ? (
                                <a 
                                  href={msg.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  <div className="relative bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                                    <img
                                      src={msg.fileUrl}
                                      alt={msg.fileName}
                                      className="max-w-full w-full h-auto object-cover rounded-lg"
                                      style={{ maxHeight: '200px' }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                      {msg.fileName}
                                    </div>
                                  </div>
                                </a>
                              ) : (
                                <a
                                  href={msg.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 p-2 rounded  bg-opacity-20 hover:bg-opacity-30 transition"
                                >
                                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium">{msg.fileName}</p>
                                    <p className="text-xs opacity-75">
  {msg.fileType ? msg.fileType.split('/')[1]?.toUpperCase() : ""}
</p>

                                  </div>
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                        <span className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message Input Area */}
            <div className="border-t dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
              <div className="max-w-3xl mx-auto">
                {/* File Preview */}
                {selectedFile && (
                  <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {selectedFile.type.startsWith('image/') && previewUrl ? (
                      <div className="relative">
                        <div className="relative bg-white dark:bg-gray-600 rounded-lg overflow-hidden">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-w-full w-full h-auto object-contain rounded-lg"
                            style={{ 
                              maxHeight: '200px',
                              minHeight: '100px',
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                            {selectedFile.name}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="ml-2 flex-1 truncate text-gray-600 dark:text-gray-300">{selectedFile.name}</span>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-end space-x-4">
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() && !selectedFile}
                    className={`px-6 py-3 ${
                      !newMessage.trim() && !selectedFile
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white font-medium rounded-xl transition-colors duration-200 flex items-center space-x-2`}
                  >
                    <span>Send</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            <div className="w-24 h-24 mb-4 text-gray-300 dark:text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
            <p className="text-gray-500">Choose a student from the list to start chatting</p>
          </section>
        )}
      </div>
    </div>
  </main>
)}


{currentPage === 'revenue' && (
  <main className="flex-1 min-h-screen ml-72 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-all duration-500">
    {/* Decorative Background */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>

    <div className="relative z-10 max-w-[2000px] mx-auto">
      {/* Header Section */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                Revenue Dashboard
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE UPDATES
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${"huzaifaquershi66"}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full bg-gray-100"
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{"huzaifaquershi66"}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <FiClock className="text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {new Date("2025-03-13 22:54:38").toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
              <FiDownload className="text-lg" />
              <span className="font-medium">Export Report</span>
            </button>
            <button className="px-4 py-2.5 rounded-xl flex items-center gap-2 text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5">
              <FiDollarSign className="text-lg" />
              <span className="font-medium">Withdraw Earnings</span>
            </button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              label: 'Total Earnings',
              value: '$48,265',
              change: '+22% vs last month',
              icon: FiDollarSign,
              gradient: 'from-emerald-600 to-teal-600',
              lightBg: 'bg-emerald-50',
              darkBg: 'dark:bg-emerald-900/20',
              textColor: 'text-emerald-600 dark:text-emerald-400'
            },
            {
              label: 'Active Students',
              value: '284',
              change: '+28 this month',
              icon: FiUsers,
              gradient: 'from-blue-600 to-indigo-600',
              lightBg: 'bg-blue-50',
              darkBg: 'dark:bg-blue-900/20',
              textColor: 'text-blue-600 dark:text-blue-400'
            },
            {
              label: 'Avg. Per Class',
              value: '$165',
              change: '+5% vs last month',
              icon: FiTrendingUp,
              gradient: 'from-purple-600 to-indigo-600',
              lightBg: 'bg-purple-50',
              darkBg: 'dark:bg-purple-900/20',
              textColor: 'text-purple-600 dark:text-purple-400'
            },
            {
              label: 'Pending Payout',
              value: '$2,840',
              change: 'Processing',
              icon: FiCreditCard,
              gradient: 'from-amber-600 to-orange-600',
              lightBg: 'bg-amber-50',
              darkBg: 'dark:bg-amber-900/20',
              textColor: 'text-amber-600 dark:text-amber-400'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} p-0.5 rotate-3 group-hover:rotate-6 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                    <stat.icon className={`text-2xl ${stat.textColor}`} />
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${stat.lightBg} ${stat.darkBg} ${stat.textColor}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>
        
        {/* Revenue Chart Placeholder */}
        <div className="h-80 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg">
          {/* Add your chart component here */}
        </div>
      </div>

      {/* Recent Transactions & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Transactions */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { student: 'Alex Johnson', amount: '$120', course: 'React Advanced', date: '2025-03-13' },
              { student: 'Sarah Wilson', amount: '$85', course: 'JavaScript Basics', date: '2025-03-12' },
              { student: 'Michael Brown', amount: '$150', course: 'Node.js Master', date: '2025-03-11' },
              { student: 'Emma Davis', amount: '$95', course: 'Web Design', date: '2025-03-10' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <FiDollarSign className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{transaction.student}</h3>
                    <p className="text-sm text-gray-500">{transaction.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">{transaction.amount}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue Analytics</h2>
          <div className="space-y-6">
            {[
              { label: 'Course Revenue', value: '$32,450', percentage: 68 },
              { label: 'Live Sessions', value: '$12,845', percentage: 25 },
              { label: 'Consulting', value: '$2,970', percentage: 7 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{item.percentage}% of total revenue</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payout History</h2>
          <button className="text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Transaction ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TRX-789012', date: '2025-03-13', amount: '$1,240', status: 'Completed' },
                { id: 'TRX-789011', date: '2025-03-06', amount: '$980', status: 'Completed' },
                { id: 'TRX-789010', date: '2025-02-28', amount: '$1,560', status: 'Completed' },
                { id: 'TRX-789009', date: '2025-02-21', amount: '$2,180', status: 'Completed' }
              ].map((payout, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{payout.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{payout.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{payout.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Need help? Contact{' '}
          <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  </main>
)}
    </div>
      
  );
};

export default TeacherDashboard;