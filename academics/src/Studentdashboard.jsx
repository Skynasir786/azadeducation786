import React, { useState, useRef,useEffect } from 'react';
import { 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaVideo, 
  FaEnvelope,
  FaCalendar,
  FaFilter,
  FaCheckCircle,
  FaCertificate,
  FaHistory,
    FaClipboardCheck,
    FaTrophy,
    FaHourglassHalf,
    FaCamera,
    FaPen,
    FaCopy ,
     FaPlus ,
     FaArrowRight,
     FaCreditCard,
     FaWifi,
     FaDownload,
     FaArrowUp,

  FaStar,
  FaClock,
  FaChevronLeft,
  FaChevronRight ,
  FaBook,
  FaChartLine,
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaList,
  FaClipboardList,
  FaComments,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaUser,
  FaLock,
  FaPalette,
  FaGlobe,
  FaPlay,
  FaFileAlt,
  FaUsers,
  FaMicrophone,
  FaDesktop,
  FaPhone,
  FaPaperclip
} from 'react-icons/fa';

const StudentDashboard = () => {
  // Main dashboard state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Messaging component state
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Smith', avatar: 'https://via.placeholder.com/40', status: 'online' },
    { id: 2, name: 'Prof. Johnson', avatar: 'https://via.placeholder.com/40', status: 'offline' },
  ]);

  // Meetings component state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  
  // Sample Data
  const notifications = [
    { id: 1, text: 'New assignment due tomorrow', time: '5m ago', type: 'warning' },
    { id: 2, text: 'Your payment was successful', time: '1h ago', type: 'success' },
    { id: 3, text: 'Upcoming class in 30 minutes', time: '25m ago', type: 'info' },
  ];

//   const courses = [
//     {
//       id: 1,
//       name: 'Mathematics 101',
//       instructor: 'Dr. Smith',
//       progress: 65,
//       totalLessons: 24,
//       completedLessons: 16,
//       assignments: 8,
//       completedAssignments: 5,
//       thumbnail: 'https://via.placeholder.com/300x200'
//     },
//     {
//       id: 2,
//       name: 'Physics Advanced',
//       instructor: 'Prof. Johnson',
//       progress: 40,
//       totalLessons: 18,
//       completedLessons: 7,
//       assignments: 6,
//       completedAssignments: 2,
//       thumbnail: 'https://via.placeholder.com/300x200'
//     }
//   ];

  const upcomingClasses = [
    {
      id: 1,
      course: 'Mathematics 101',
      instructor: 'Dr. Smith',
      time: '10:00 AM',
      date: '2025-05-14',
      duration: '1 hour',
      zoomLink: 'https://zoom.us/j/123456'
    },
    {
      id: 2,
      course: 'Physics Advanced',
      instructor: 'Prof. Johnson',
      time: '2:00 PM',
      date: '2025-05-14',
      duration: '1.5 hours',
      zoomLink: 'https://zoom.us/j/789012'
    }
  ];

  const payments = [
    { 
      id: 1, 
      course: 'Mathematics 101',
      amount: 299,
      dueDate: '2025-05-20',
      status: 'Pending'
    },
    { 
      id: 2, 
      course: 'Physics Advanced',
      amount: 349,
      dueDate: '2025-05-25',
      status: 'Paid',
      paidDate: '2025-05-10'
    }
  ];

  const sidebarLinks = [
    { id: 'dashboard', icon: FaTachometerAlt, text: 'Dashboard' },
    { id: 'courses', icon: FaGraduationCap, text: 'My Courses' },
    { id: 'meetings', icon: FaVideo, text: 'Meetings' },
    { id: 'messages', icon: FaEnvelope, text: 'Messages' },
    // { id: 'assignments', icon: FaClipboardList, text: 'Assignments' },
    { id: 'payments', icon: FaMoneyBillWave, text: 'Payments' },
    // { id: 'calendar', icon: FaCalendar, text: 'Calendar' },
    { id: 'settings', icon: FaCog, text: 'Settings' },
    { id: 'help', icon: FaQuestionCircle, text: 'Help & Support' }
  ];

  // Message handling functions
  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date().toISOString(),
        file: selectedFile
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  // File handling
  const [selectedFile, setSelectedFile] = useState(null);
    const [messagess, setMessagess] = useState([]);
  const [input, setInput] = useState("");
const [imagePreview, setImagePreview] = useState(null);
  const fileInputReff = useRef(null);
  const messagesEndRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
   useEffect(() => {
    scrollToBottom();
  }, [messagess]);
  const currentUser = 'huzaifa8883';
const currentTime = new Date().toLocaleString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});
  const courses = [
  {
    id: 1,
    name: 'Advanced Web Development',
    instructor: 'Dr. Sarah Smith',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    assignments: 8,
    completedAssignments: 5,
    thumbnail: 'https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg',
    category: 'Development',
    rating: 4.8,
    students: 1234,
    duration: '12 weeks',
    level: 'Advanced',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    name: 'Machine Learning Fundamentals',
    instructor: 'Prof. John Johnson',
    progress: 40,
    totalLessons: 18,
    completedLessons: 7,
    assignments: 6,
    completedAssignments: 2,
    thumbnail: 'https://img.freepik.com/free-vector/artificial-intelligence-ai-robot-circuit-brain-machine-learning-digital-brain-artificial-thinking-mind-digital-technology-analysis_127544-800.jpg',
    category: 'AI & ML',
    rating: 4.9,
    students: 892,
    duration: '16 weeks',
    level: 'Intermediate',
    tags: ['Python', 'TensorFlow', 'Data Science']
  },
  {
    id: 3,
    name: 'UI/UX Design Masterclass',
    instructor: 'Lisa Anderson',
    progress: 85,
    totalLessons: 20,
    completedLessons: 17,
    assignments: 10,
    completedAssignments: 8,
    thumbnail: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg',
    category: 'Design',
    rating: 4.7,
    students: 1567,
    duration: '8 weeks',
    level: 'All Levels',
    tags: ['Figma', 'Adobe XD', 'Design Thinking']
  },
  {
    id: 4,
    name: 'Blockchain Development',
    instructor: 'Michael Chen',
    progress: 25,
    totalLessons: 22,
    completedLessons: 5,
    assignments: 7,
    completedAssignments: 2,
    thumbnail: 'https://img.freepik.com/free-vector/gradient-cryptocurrency-concept_23-2149215736.jpg',
    category: 'Blockchain',
    rating: 4.6,
    students: 645,
    duration: '14 weeks',
    level: 'Advanced',
    tags: ['Ethereum', 'Solidity', 'Web3']
  },
  {
    id: 5,
    name: 'Digital Marketing Strategy',
    instructor: 'Emma Williams',
    progress: 55,
    totalLessons: 16,
    completedLessons: 9,
    assignments: 5,
    completedAssignments: 3,
    thumbnail: 'https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb-marketing-team-metrics-marketing-team-lead-responsibilities-concept_335657-258.jpg',
    category: 'Marketing',
    rating: 4.5,
    students: 2134,
    duration: '10 weeks',
    level: 'Intermediate',
    tags: ['SEO', 'Social Media', 'Analytics']
  },
  {
    id: 6,
    name: 'iOS App Development',
    instructor: 'David Miller',
    progress: 15,
    totalLessons: 25,
    completedLessons: 4,
    assignments: 8,
    completedAssignments: 1,
    thumbnail: 'https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg',
    category: 'Development',
    rating: 4.9,
    students: 876,
    duration: '15 weeks',
    level: 'Intermediate',
    tags: ['Swift', 'iOS', 'XCode']
  }
];

  // Render functions for different sections
 const renderDashboard = () => {
  // Sample data for activities and deadlines
  const recentActivities = [
    {
      id: 1,
      type: 'assignment',
      title: 'Submitted Assignment: React Components',
      course: 'Advanced Web Development',
      time: '2 hours ago',
      icon: FaFileAlt,
      color: 'blue'
    },
    {
      id: 2,
      type: 'quiz',
      title: 'Completed Quiz: Machine Learning Basics',
      course: 'Machine Learning Fundamentals',
      score: '85/100',
      time: '5 hours ago',
      icon: FaClipboardCheck,
      color: 'green'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Attended Live Session',
      course: 'UI/UX Design Masterclass',
      time: 'Yesterday',
      icon: FaVideo,
      color: 'purple'
    },
    {
      id: 4,
      type: 'certificate',
      title: 'Earned Certificate',
      course: 'Digital Marketing Strategy',
      time: '2 days ago',
      icon: FaCertificate,
      color: 'yellow'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Final Project Submission',
      course: 'Advanced Web Development',
      dueDate: '2025-05-15',
      type: 'assignment',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Mid-term Exam',
      course: 'Machine Learning Fundamentals',
      dueDate: '2025-05-20',
      type: 'exam',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Group Presentation',
      course: 'UI/UX Design Masterclass',
      dueDate: '2025-05-25',
      type: 'presentation',
      priority: 'medium'
    }
  ];

  const courseProgress = [
    { id: 1, name: 'Advanced Web Development', progress: 65 },
    { id: 2, name: 'Machine Learning Fundamentals', progress: 40 },
    { id: 3, name: 'UI/UX Design Masterclass', progress: 85 },
    { id: 4, name: 'Blockchain Development', progress: 25 }
  ];

  return (
       <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Enhanced Welcome Section with 3D Effect */}
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-2xl p-10 mb-10
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10
                    hover:shadow-blue-500/10 transition-all duration-500">
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="text-sm font-medium px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full">
                Dashboard Overview
              </span>
            </div>
            <h1 className="text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                           text-transparent bg-clip-text">
                Welcome back,
              </span>
              <br />
              <span className="text-gray-900">{currentUser}! 👋</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Track your progress, manage deadlines, and achieve your learning goals efficiently.
            </p>
          </div>
          <div className="md:text-right">
            <div className="inline-block p-6 bg-white rounded-2xl shadow-lg">
              <p className="text-sm font-medium text-gray-500 mb-2">Current Time (UTC)</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-transparent bg-clip-text">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards with 3D Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {[
          {
            icon: FaBook,
            label: 'Enrolled Courses',
            value: courses.length,
            change: '+2 this month',
            color: 'blue',
            gradient: 'from-blue-500 to-blue-600'
          },
          {
            icon: FaChartLine,
            label: 'Average Progress',
            value: '47%',
            change: '↑ 12% improvement',
            color: 'emerald',
            gradient: 'from-emerald-500 to-emerald-600'
          },
          {
            icon: FaClock,
            label: 'Learning Hours',
            value: '26h',
            change: 'This week',
            color: 'violet',
            gradient: 'from-violet-500 to-violet-600'
          },
          {
            icon: FaStar,
            label: 'Achievement Points',
            value: '850',
            change: 'Gold Level',
            color: 'amber',
            gradient: 'from-amber-500 to-amber-600'
          }
        ].map((stat, index) => (
          <div key={index} 
               className="group relative bg-white rounded-2xl p-6 transition-all duration-300
                        hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
                        hover:-translate-y-1">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-50/50 to-white/50 opacity-0 
                          group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${stat.gradient} 
                           shadow-lg mb-4 text-white transform group-hover:scale-110 
                           transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm font-medium text-${stat.color}-600 
                           flex items-center gap-1`}>
                  {stat.change.includes('↑') && 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  }
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Course Progress Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Course Progress</h2>
                <p className="text-gray-500 mt-1">Track your learning journey</p>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white 
                             rounded-xl hover:bg-blue-700 transition-colors duration-200
                             shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40">
                <span>View All Courses</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {courseProgress.map(course => (
                <div key={course.id} className="group bg-gray-50 rounded-xl p-6 
                                            hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                    <span className="text-lg font-bold text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-700
                               animate-pulse"
                      style={{
                        width: `${course.progress}%`,
                        background: `linear-gradient(90deg, 
                          ${course.progress < 30 ? '#EF4444' : 
                            course.progress < 70 ? '#F59E0B' : '#10B981'} 0%,
                          ${course.progress < 30 ? '#EF4444' : 
                            course.progress < 70 ? '#FBBF24' : '#059669'} 100%)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Activity Feed */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-500 mt-1">Your latest learning activities</p>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700
                             rounded-xl hover:bg-gray-200 transition-colors duration-200">
                <span>View All</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              {recentActivities.map(activity => (
                <div key={activity.id} 
                     className="group relative bg-gray-50 rounded-xl p-6 hover:bg-white
                              hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className={`shrink-0 p-4 rounded-xl bg-gradient-to-br 
                                 from-${activity.color}-500 to-${activity.color}-600
                                 text-white shadow-lg transform group-hover:scale-110 
                                 transition-transform duration-300`}>
                      <activity.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-lg mb-1">{activity.title}</p>
                      <p className="text-gray-500">{activity.course}</p>
                      {activity.score && (
                        <p className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 
                                    rounded-full text-sm font-medium">{activity.score}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Right Sidebar */}
        <div className="space-y-8">
          {/* Enhanced Calendar Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Calendar</h2>
            <div className="relative p-8 bg-gradient-to-br from-blue-500 to-indigo-600 
                          rounded-xl shadow-lg text-white text-center transform 
                          hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-white opacity-10 
                           background-pattern rotate-45"></div>
              <p className="text-6xl font-bold mb-2">{new Date().getDate()}</p>
              <p className="text-xl font-medium opacity-90">
                {new Date().toLocaleString('default', { month: 'long' })}
              </p>
            </div>
          </div>

          {/* Enhanced Deadlines Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
              <p className="text-gray-500 mt-1">Stay on track with your tasks</p>
            </div>
            <div className="space-y-6">
              {upcomingDeadlines.map(deadline => (
                <div
                  key={deadline.id}
                  className="group relative bg-gray-50 rounded-xl p-6 hover:bg-white 
                           hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      deadline.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {deadline.priority.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium px-4 py-1.5 bg-gray-100 
                                 text-gray-600 rounded-full">
                      {new Date(deadline.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {deadline.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{deadline.course}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    {deadline.type === 'assignment' && 
                      <FaFileAlt className="text-blue-500 mr-2 group-hover:scale-125 
                                        transition-transform duration-300" />}
                    {deadline.type === 'exam' && 
                      <FaClipboardCheck className="text-green-500 mr-2 group-hover:scale-125 
                                              transition-transform duration-300" />}
                    {deadline.type === 'presentation' && 
                      <FaUsers className="text-purple-500 mr-2 group-hover:scale-125 
                                     transition-transform duration-300" />}
                    <span className="capitalize">{deadline.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600
                           text-white rounded-xl hover:from-blue-700 hover:to-indigo-700
                           transition-all duration-300 text-sm font-medium shadow-lg 
                           shadow-blue-500/30 hover:shadow-blue-500/40">
              View All Deadlines
            </button>
          </div>

          {/* Enhanced Achievement Badge */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 
                       to-amber-600 rounded-2xl shadow-lg p-8 text-white group">
            <div className="absolute inset-0 bg-white/10 background-pattern opacity-30 
                        group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative text-center">
              <div className="inline-block p-6 bg-white/20 rounded-full mb-6 backdrop-blur-sm
                          transform group-hover:scale-110 transition-transform duration-300">
                <FaTrophy className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3">Gold Achiever</h3>
              <p className="text-amber-100 text-lg">
                Completed 5 courses this semester!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  const renderMessages = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="flex h-[calc(100vh-10rem)]">
        {/* Users list */}
        <div className="w-1/4 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {users.map(user => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedUser?.id === user.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.status}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    } mb-4`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-4 ${
                        message.sender === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaPaperclip className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

 const renderMeetings = () => (
  <div className="space-y-8 p-6">
    {/* Active Meeting Controls with Glass Effect */}
    <div className="relative overflow-hidden bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-blue-500/5 before:to-purple-500/5">
      <div className="relative">
        {/* Meeting Info */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-700 
                        rounded-full text-sm font-medium mb-3">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Meeting in Progress
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Current Meeting Controls</h2>
          <p className="text-gray-500 mt-1">
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </p>
        </div>

        {/* Enhanced Control Buttons */}
        <div className="flex items-center justify-center space-x-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`group relative p-6 rounded-2xl transition-all duration-300 
                     transform hover:scale-105 hover:-translate-y-1
                     ${isMuted 
                       ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30' 
                       : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 shadow-gray-500/10'
                     } shadow-lg`}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 
                          group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <FaMicrophone className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full 
                           bg-white shadow flex items-center justify-center">
                {isMuted && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
              </span>
            </div>
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`group relative p-6 rounded-2xl transition-all duration-300 
                     transform hover:scale-105 hover:-translate-y-1
                     ${!isVideoOn 
                       ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/30' 
                       : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 shadow-gray-500/10'
                     } shadow-lg`}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 
                          group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <FaVideo className="h-7 w-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full 
                           bg-white shadow flex items-center justify-center">
                {!isVideoOn && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
              </span>
            </div>
          </button>

          <button
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 
                     text-gray-700 shadow-lg shadow-gray-500/10 transition-all duration-300 
                     transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 
                          group-hover:opacity-100 transition-opacity" />
            <FaDesktop className="h-7 w-7" />
          </button>

          <button
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 
                     text-white shadow-lg shadow-red-500/30 transition-all duration-300 
                     transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 
                          group-hover:opacity-100 transition-opacity" />
            <FaPhone className="h-7 w-7 rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>

    {/* Enhanced Upcoming Meetings */}
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Upcoming Meetings</h3>
            <p className="text-gray-500 mt-1">Your scheduled classes and sessions</p>
          </div>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {upcomingClasses.length} Upcoming
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          {upcomingClasses.map(meeting => (
            <div key={meeting.id} 
                 className="group relative bg-gray-50 rounded-xl p-6 transition-all duration-300
                          hover:bg-white hover:shadow-lg hover:-translate-y-1">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex justify-between items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center mb-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm font-medium text-green-600">Starts in {meeting.time}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate">{meeting.course}</h4>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <FaUser className="w-4 h-4 mr-2" />
                    <span>Instructor: {meeting.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaClock className="w-4 h-4 mr-2" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaHourglassHalf className="w-4 h-4 mr-2" />
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={meeting.zoomLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl
                           hover:bg-blue-700 transition-colors duration-200 shadow-lg 
                           shadow-blue-500/30 hover:shadow-blue-500/40 whitespace-nowrap"
                >
                  <FaVideo className="mr-2 h-5 w-5" />
                  Join Meeting
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Added Navigation Controls */}
        <div className="mt-8 flex items-center justify-between">
          <button className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 
                         transition-colors">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map(page => (
              <button key={page} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center 
                                transition-colors ${
                                  page === 1 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}>
                {page}
              </button>
            ))}
          </div>
          <button className="flex items-center px-4 py-2 text-gray-500 hover:text-gray-700 
                         transition-colors">
            Next
            <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);
  const renderCourses = () => (
  <div className="space-y-8">
    {/* Course Search and Filters */}
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
          <FaSearch className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-4">
          <select className="px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>AI & ML</option>
            <option>Blockchain</option>
          </select>
          <select className="px-4 py-3 rounded-lg border border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FaFilter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>

    {/* Course Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <FaBook className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Enrolled Courses</p>
            <h3 className="text-2xl font-bold">{courses.length}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <FaChartLine className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Average Progress</p>
            <h3 className="text-2xl font-bold">47%</h3>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <FaCheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Completed Courses</p>
            <h3 className="text-2xl font-bold">2</h3>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-sm p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <FaCertificate className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">Certificates Earned</p>
            <h3 className="text-2xl font-bold">3</h3>
          </div>
        </div>
      </div>
    </div>

    {/* Course Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
          {/* Course Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Continue Learning
              </button>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
              {course.level}
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {course.instructor}
                </p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-400">
                <FaStar className="h-4 w-4" />
                <span className="text-sm font-medium text-gray-900">{course.rating}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium text-blue-600">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <FaBook className="h-4 w-4" />
                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <FaClock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
        <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
          <FaChevronLeft className="h-5 w-5" />
        </button>
        {[1, 2, 3].map(page => (
          <button
            key={page}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
          <FaChevronRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  </div>
);

 const renderPayments = () => {
  const currentBalance = 2500.00;
  
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                    from-gray-50 via-gray-100 to-gray-200 p-8">
      {/* Futuristic Balance Card */}
     {/* Enhanced Balance Card with Better Visibility */}
<div className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 
                rounded-[2.5rem] shadow-2xl p-12">
  {/* Decorative Elements */}
  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br 
                from-blue-400 to-blue-600 rounded-full blur-3xl opacity-20 
                transform translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br 
                from-indigo-400 to-blue-600 rounded-full blur-3xl opacity-20 
                transform -translate-x-1/2 translate-y-1/2"></div>

  {/* Balance Content with Enhanced Visibility */}
  <div className="relative">
    <div className="flex items-start justify-between">
      <div className="space-y-3">
        <div className="inline-flex items-center px-4 py-2 bg-white/15 
                     backdrop-blur-xl rounded-full space-x-2 mb-4
                     border border-white/20">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-white">Live Balance</span>
        </div>
        <div className="space-y-2">
          <p className="text-blue-200 text-lg font-medium">Available Balance</p>
          <h2 className="text-6xl font-bold text-white tracking-tight flex items-baseline
                       drop-shadow-lg">
            <span className="text-3xl mr-2 text-blue-200">$</span>
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text 
                         text-transparent">
              {currentBalance.toLocaleString()}
            </span>
            <span className="text-2xl text-blue-200 ml-2">.00</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div className="inline-flex items-center px-4 py-2 bg-white/15 
                     backdrop-blur-xl rounded-full space-x-2 mb-2
                     border border-white/20">
          <span className="text-sm font-medium text-blue-100">
            {new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="text-4xl font-bold text-white drop-shadow-lg">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </div>
    </div>

    {/* Enhanced Action Buttons */}
    <div className="flex items-center space-x-4 mt-12">
      <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl 
                      rounded-2xl hover:bg-white/15 transition-all duration-200 
                      flex items-center space-x-3 border border-white/20
                      shadow-lg shadow-black/5">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                     from-white/20 to-transparent opacity-0 
                     group-hover:opacity-100 transition-opacity"></div>
        <div className="relative">
          <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-500 
                       rounded-xl group-hover:scale-110 transition-transform
                       shadow-lg shadow-blue-500/30">
            <FaPlus className="h-5 w-5 text-white" />
          </div>
        </div>
        <span className="relative font-semibold text-white">Add Money</span>
      </button>

      <button className="group px-8 py-4 bg-blue-500/20 backdrop-blur-xl 
                      rounded-2xl hover:bg-blue-500/30 transition-all duration-200 
                      flex items-center space-x-3 border border-blue-400/20
                      shadow-lg shadow-black/5">
        <div className="p-2 bg-blue-400/20 rounded-xl group-hover:scale-110 
                     transition-transform">
          <FaArrowRight className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-white">Transfer</span>
      </button>
    </div>
  </div>
</div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Payment Methods Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-8 
                     border border-white/20">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full 
                           space-x-2">
                <FaCreditCard className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Payment Methods</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Your Cards</h3>
            </div>
            
            <button className="group relative px-6 py-3 bg-gradient-to-br from-blue-500 
                           to-violet-600 text-white rounded-2xl shadow-lg 
                           shadow-blue-500/25 hover:shadow-blue-500/40 
                           transition-all duration-200 flex items-center space-x-2
                           overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <FaPlus className="relative h-4 w-4 group-hover:rotate-180 
                              transition-transform duration-300" />
              <span className="relative font-medium">Add New Card</span>
            </button>
          </div>

          {/* Premium Card Design */}
          <div className="space-y-6">
            <div className="group relative h-56 w-full bg-[url('/card-bg.png')] bg-cover 
                         bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                         rounded-[1.5rem] p-8 overflow-hidden transition-transform 
                         duration-500 hover:scale-[1.02] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 
                          via-violet-500/10 to-transparent opacity-0 
                          group-hover:opacity-100 transition-opacity"></div>
              
              {/* Card Content */}
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 
                                to-yellow-300 flex items-center justify-center 
                                group-hover:scale-110 transition-transform duration-300">
                      <FaCreditCard className="h-6 w-6 text-yellow-900" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Card Number</p>
                      <p className="text-xl tracking-widest text-white font-medium">
                        •••• •••• •••• 4242
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="w-1 h-1 bg-white/60 rounded-full"></div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Card Holder</p>
                    <p className="text-lg text-white font-medium tracking-wide">
                      {currentUser}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Expires</p>
                    <p className="text-lg text-white font-medium">12/25</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative h-56 w-full bg-gradient-to-br from-gray-100 
                         to-gray-50 rounded-[1.5rem] p-8 border-2 border-dashed 
                         border-gray-200 hover:border-blue-500 transition-all 
                         duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-violet-50 
                          opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 
                            to-violet-100 flex items-center justify-center 
                            group-hover:scale-110 transition-transform duration-300">
                  <FaPlus className="h-8 w-8 text-blue-500 group-hover:rotate-180 
                                 transition-transform duration-500" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-900">Add New Card</p>
                  <p className="text-gray-500 mt-2">
                    Set up a new payment method
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-8 
                     border border-white/20">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <div className="inline-flex items-center px-4 py-2 bg-violet-50 
                           rounded-full space-x-2">
                <FaHistory className="h-4 w-4 text-violet-600" />
                <span className="text-sm font-semibold text-violet-600">
                  Transaction History
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Recent Activity</h3>
            </div>

            <div className="flex items-center space-x-4">
              <select className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
                              text-gray-700 text-sm font-medium focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                              appearance-none cursor-pointer shadow-sm
                              hover:bg-gray-100 transition-colors duration-200">
                <option>All Transactions</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
              
              <button className="group p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 
                             transition-all duration-200 shadow-sm">
                <FaDownload className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {payments.map(payment => (
              <div key={payment.id} 
                   className="group relative bg-gray-50/50 rounded-2xl p-6 
                            hover:bg-white transition-all duration-300 
                            hover:shadow-lg transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 
                            to-violet-50 opacity-0 group-hover:opacity-100 
                            transition-opacity rounded-2xl"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl shadow-lg ${
                      payment.type === 'credit'
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                        : 'bg-gradient-to-br from-red-400 to-rose-500'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {payment.type === 'credit' 
                        ? <FaArrowDown className="h-6 w-6 text-white" />
                        : <FaArrowUp className="h-6 w-6 text-white" />}
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-1">
                        {payment.description}
                      </h4>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-2 text-gray-500">
                          <FaClock className="h-4 w-4" />
                          <span className="font-medium">
                            {new Date(payment.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </span>
                        <span className={`inline-flex items-center px-3 py-1 
                                     rounded-full text-sm font-medium ${
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      payment.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {payment.type === 'credit' ? '+' : '-'}
                      ${payment.amount}
                    </p>
                    <p className="text-gray-500 font-medium mt-1">
                      {payment.method}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pagination */}
          <div className="mt-10 flex items-center justify-between">
            <button className="group flex items-center px-6 py-3 text-gray-600 
                           hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                          transition-transform" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map(page => (
                <button key={page}
                        className={`w-12 h-12 rounded-2xl flex items-center 
                                  justify-center transition-all duration-200 ${
                                    page === 1
                                      ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg'
                                      : 'text-gray-600 hover:bg-gray-100'
                                  }`}>
                  {page}
                </button>
              ))}
            </div>
            
            <button className="group flex items-center px-6 py-3 text-gray-600 
                           hover:text-gray-900 transition-colors">
              Next
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 
                          transition-transform" 
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HelpCenter = () => {
 

  

 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !imagePreview) return;

    const userMsg = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
      image: imagePreview
    };
    
    setMessagess((prev) => [...prev, userMsg]);

    // If you want to send the image to the backend:
    const payload = {
      message: input,
      image: imagePreview
    };

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const botMsg = {
      role: "bot",
      content: data.reply,
      timestamp: new Date().toISOString()
    };
    
    setMessagess((prev) => [...prev, botMsg]);
    setInput("");
    setImagePreview(null);
    if (fileInputReff.current) {
      fileInputReff.current.value = '';
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-title">
            <div className="header-logo">
              <svg className="bot-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor"/>
              </svg>
              <h3>AI Assistant</h3>
            </div>
          </div>
          <div className="header-actions">
            <div className="online-indicator">
              <span className="online-dot"></span>
              Online
            </div>
            <button className="clear-chat">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messagess.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="message-bubble">
                {msg.image && (
                  <div className="message-image">
                    <img src={msg.image} alt="Uploaded content" />
                  </div>
                )}
                <div className="message-content">{msg.content}</div>
                <div className="message-timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button 
                className="remove-image"
                onClick={() => setImagePreview(null)}
              >
                ×
              </button>
            </div>
          )}
          <div className="input-actions">
            <label className="upload-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" fill="currentColor"/>
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputReff}
                hidden
              />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button 
              onClick={sendMessage} 
              className="send-button"
              disabled={!input.trim() && !imagePreview}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderSettings = () => {
  // Mock data that would normally come from props or context
  const userData = {
    username: 'huzaifaquershi66',
    currentTime: '2025-05-13 19:06:25'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Settings Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 
                          flex items-center justify-center text-3xl font-bold text-white
                          overflow-hidden">
                {userData.username.charAt(0).toUpperCase()}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 flex items-center justify-center">
                  <FaCamera className="h-6 w-6 text-white" />
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-blue-500 
                             text-white shadow-lg hover:bg-blue-600 transition-colors">
                <FaPen className="h-3 w-3" />
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-8 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={userData.username}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition-all duration-200"
                    />
                    <button className="p-3 rounded-xl bg-gray-100 text-gray-600 
                                   hover:bg-gray-200 transition-colors">
                      <FaCopy className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Time Zone Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Time Zone Settings
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 
                            border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-900">
                        Current Date and Time (UTC)
                      </p>
                      <p className="text-2xl font-bold text-blue-700">
                        {userData.currentTime}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center 
                                justify-center">
                      <FaClock className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Time Zone
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border 
                                  border-gray-200 focus:ring-2 focus:ring-blue-500 
                                  focus:border-transparent transition-all duration-200
                                  appearance-none cursor-pointer">
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>EST (Eastern Standard Time)</option>
                      <option>PST (Pacific Standard Time)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Date Format
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border 
                                  border-gray-200 focus:ring-2 focus:ring-blue-500 
                                  focus:border-transparent transition-all duration-200
                                  appearance-none cursor-pointer">
                      <option>YYYY-MM-DD HH:mm:ss</option>
                      <option>MM/DD/YYYY HH:mm:ss</option>
                      <option>DD/MM/YYYY HH:mm:ss</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Security Settings
              </h2>
              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" id="tfa" />
                      <label htmlFor="tfa" className="w-14 h-7 bg-gray-200 
                                                  peer-focus:ring-2 peer-focus:ring-blue-500 
                                                  rounded-full cursor-pointer 
                                                  peer peer-checked:after:translate-x-full 
                                                  peer-checked:bg-blue-500
                                                  after:content-[''] after:absolute 
                                                  after:top-0.5 after:left-0.5 
                                                  after:bg-white after:rounded-full 
                                                  after:h-6 after:w-6 after:transition-all">
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">
                        Password
                      </h3>
                      <p className="text-sm text-gray-500">
                        Last changed 3 months ago
                      </p>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 
                                   text-gray-700 hover:bg-gray-50 transition-colors 
                                   shadow-sm">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t 
                         border-gray-100">
              <button className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 
                             font-medium hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 
                             to-blue-600 text-white font-medium hover:from-blue-600 
                             hover:to-blue-700 transition-colors shadow-lg 
                             shadow-blue-500/30">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Main render function to handle tab switching
  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return renderMessages();
      case 'meetings':
        return renderMeetings();
      case 'payments':
        return renderPayments();
      case 'settings':
        return renderSettings();
      case 'courses':
        return renderCourses();
        case 'help':
          return HelpCenter()
      default:
        return renderDashboard();
    }
  };

 return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* Sidebar */}
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <FaGraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Azad Education Student Portal</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === link.id
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span className="font-medium">{link.text}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <img
              src="data:image/jpeg;base64,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"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">huzaifa8883</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    {/* Main Content */}
    <div className={`${isSidebarOpen ? 'ml-72' : 'ml-0'} transition-margin duration-300`}>
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isSidebarOpen ? (
                <FaTimes className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <FaBars className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {sidebarLinks.find(link => link.id === activeTab)?.text || 'Dashboard'}
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            {/* Current Date/Time */}
            <div className="hidden md:block">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
              </p>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
              >
                <FaBell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                            notification.type === 'success' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <FaBell className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">{notification.text}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">huzaifa8883</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  <a href="#profile" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaUserCircle className="h-4 w-4" />
                    <span>View Profile</span>
                  </a>
                  <a href="#settings" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaCog className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                  <div className="border-t dark:border-gray-700 my-2"></div>
                  <a href="#logout" className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <FaSignOutAlt className="h-4 w-4" />
                    <span>Sign out</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-8">
        {renderContent()}
      </main>
    </div>
  </div>
);
};

export default StudentDashboard;