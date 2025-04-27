import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud,FiBriefcase, FiBook, FiLayers, FiBookOpen, FiUsers,FiClock, FiMonitor, FiDollarSign,FiUpload, FiFile, FiCheckCircle, FiX ,FiMail,FiPhone, FiCalendar, FiMapPin,FiUser} from 'react-icons/fi';
import Select from 'react-select';

const TeacherForm = () => {
  const currentDate = new Date('2025-02-13T06:00:08Z');
  const currentUser = 'huzaifa8883';

  const [currentStep, setCurrentStep] = useState(1);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);  // 🔹 Loading state added

  const [formSubmitted, setFormSubmitted] = useState(false);


  const [formData, setFormData] = useState({
    // Personal Information
    username:'',
    fullName: '',
    email: '',
    password:'',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    profilePicture: null,
    bio: '',
    submissionDate: currentDate.toISOString(),
    submittedBy: currentUser,

    // Educational Background
    qualification: '',
    university: '',
    graduationYear: '',
    specialization: '',
    certificates: [],
    
    // Professional Information
    experience: '',
    subjects: [],
    teachingLevel: [],
    previousInstitutions: [],
    references: [],
    
    // Teaching Preferences
    availableTimings: [],
    preferredMode: '', // Online, Physical, Both
    expectedSalary: '',
    teachingMethodology: '',
    
    // Documents
   
    cnicFront: null,
    cnicBack: null,
    lastDegree: null,
    
    // Additional Information
    languages: [],
    skills: [],
    achievements: []
  });
 

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  const inputClasses = "mt-2 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none font-medium text-gray-700";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '0.75rem',
      borderColor: state.isFocused ? '#8b5cf6' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#8b5cf6',
      },
      padding: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(8px)',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#8b5cf6' 
        : state.isFocused 
          ? '#f3f4f6' 
          : 'transparent',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#8b5cf6' : '#f3f4f6',
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#f3f4f6',
      borderRadius: '0.5rem',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#374151',
      fontWeight: 500,
    }),
    multiValueRemove: (base) => ({
      ...base,
      '&:hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
    }),
  };
  const timingOptions = [
    { value: 'morning', label: '🌅 Morning (8 AM - 12 PM)' },
    { value: 'afternoon', label: '☀️ Afternoon (12 PM - 4 PM)' },
    { value: 'evening', label: '🌆 Evening (4 PM - 8 PM)' },
    { value: 'night', label: '🌙 Night (8 PM - 12 AM)' },
  ];

  const modeOptions = [
    { value: 'online', label: '💻 Online' },
    { value: 'physical', label: '🏫 Physical' },
    { value: 'both', label: '🔄 Both' },
  ];
  
  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Educational Background' },
    { id: 3, title: 'Professional Details' },
    { id: 4, title: 'Teaching Preferences' },
    { id: 5, title: 'Documents Upload' }
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English',
    'Computer Science', 'History', 'Geography', 'Economics', 'Arts'
  ];

  const teachingLevels = [
    'Primary (1-5)',
    'Middle (6-8)',
    'Secondary (9-10)',
    'Higher Secondary (11-12)',
    'Undergraduate',
    'Graduate'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (file, field) => {
    if (!file || !(file instanceof File)) {
      console.error(`Invalid file for field ${field}:`, file);
      return;
    }
  
    setFormData(prev => ({
      ...prev,
      [field]: file, // ✅ Only store if it's a valid file
    }));
  };
  
  
  // };
  

  const handleMultiSelect = (e, field) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
    } else {
        try {
            setLoading(true);  // 🔹 Start loading when form submission starts
  
            const formDataToSubmit = new FormData();
            
            // Append basic form data
            Object.keys(formData).forEach(key => {
                if (key !== 'documents' && key !== 'certificates' && 
                    key !== 'cnicFront' && key !== 'cnicBack' && 
                    key !== 'lastDegree' && key !== 'profilePicture') {
                    formDataToSubmit.append(key, 
                        Array.isArray(formData[key]) 
                            ? JSON.stringify(formData[key]) 
                            : formData[key]
                    );
                }
            });
  
            // Append files
            if (formData.profilePicture) {
                formDataToSubmit.append('profilePicture', formData.profilePicture);
            }
            formData.certificates?.forEach((file, index) => {
                formDataToSubmit.append(`certificates[${index}]`, file);
            });
            formData.documents?.forEach((file, index) => {
                formDataToSubmit.append(`documents[${index}]`, file);
            });
  
            if (formData.cnicFront) {
                formDataToSubmit.append('cnicFront', formData.cnicFront);
            }
            if (formData.cnicBack) {
                formDataToSubmit.append('cnicBack', formData.cnicBack);
            }
            if (formData.lastDegree) {
                formDataToSubmit.append('lastDegree', formData.lastDegree);
            }
  
            // Submit the form to the backend API
            const response = await fetch('http://localhost:5000/users/register', {
                method: 'POST',
                body: formDataToSubmit,
            });
            const result = await response.json();
            console.log('Submission result:', result);
  
            setFormSubmitted(true); // 🔹 Mark form as submitted
  
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);  // 🔹 Stop loading whether success or error
        }
    }
  };
  
  
  
  
  const DocumentsUploadStep = ({ handleFileUpload }) => {
    const [files, setFiles] = useState({
        cnicFront: null,
        cnicBack: null,
        lastDegree: null
    });

    const [previews, setPreviews] = useState({
        cnicFront: null,
        cnicBack: null,
        lastDegree: null
    });

    // Generate Preview URLs when files change
    useEffect(() => {
        const newPreviews = {};

        Object.keys(files).forEach((key) => {
            if (files[key] instanceof File) {
                newPreviews[key] = URL.createObjectURL(files[key]);
            }
        });

        setPreviews({ ...newPreviews }); // ✅ Fix: React ko batane ke liye new object spread kara

        return () => {
            Object.values(newPreviews).forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [files]);

    const UploadBox = ({ field, label, accept }) => (
        <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 relative">
                <input
                    type="file"
                    accept={accept}
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                            setFiles((prev) => ({
                                ...prev,
                                [field]: selectedFile
                            }));
                            handleFileUpload(selectedFile, field);
                        }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="text-center">
                    {files[field] ? (
                        <FiCheckCircle className="mx-auto h-8 w-8 text-green-500" />
                    ) : (
                        <FiUpload className="mx-auto h-8 w-8 text-violet-500" />
                    )}
                    <p className="mt-2 text-sm text-gray-600">
                        {files[field] ? files[field].name : (
                            <>
                                <span className="text-violet-600 font-medium">Click to upload</span> or drag and drop
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Show Either Preview or File Name */}
            {files[field] && (
                <div className="mt-2 flex items-center space-x-4">
                    {previews[field] ? (
                        <img
                            src={previews[field]}
                            alt="Preview"
                            className="w-24 h-24 rounded-md shadow-md object-cover"
                            onError={(e) => console.error("Image Load Error:", e)}
                        />
                    ) : (
                        <p className="text-xs text-gray-500 break-all">{files[field].name}</p>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">
            <UploadBox field="cnicFront" label="CNIC Front" accept="image/*" />
            <UploadBox field="cnicBack" label="CNIC Back" accept="image/*" />
            <UploadBox field="lastDegree" label="Last Degree" accept="image/*" />
        </div>
    );
};

  
  // File Upload Handler

  
    
   
  

  
  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Submission Info */}
      <div className="mb-4 text-sm text-gray-600">
        <p>Submission Date: {currentDate.toLocaleString()}</p>
       
      </div>

      {formSubmitted && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-green-600">Form Submitted Successfully!</h2>
      <p className="text-gray-600 mt-2">You can now proceed to login.</p>
      <button 
        onClick={() => window.location.href = "/login"} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  </div>
)}


      {/* Progress Steps */}
      {!formSubmitted && (
  <div className="w-full max-w-4xl mx-auto px-4 py-8">
    <div className="relative">
      {/* Steps Container */}
      <div className="flex justify-between items-center relative z-10">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            {/* Step Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                relative flex items-center justify-center w-12 h-12 rounded-full
                shadow-lg transform transition-all duration-300 ease-in-out
                ${currentStep >= step.id 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700' 
                  : 'bg-white text-gray-500 border-2 border-gray-200'}
                ${currentStep === step.id ? 'scale-110' : ''}
              `}
            >
              {currentStep > step.id ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <span className="text-lg font-semibold">{step.id}</span>
              )}
              
              {/* Pulsing Effect for Current Step */}
              {currentStep === step.id && (
                <div className="absolute w-full h-full rounded-full animate-ping opacity-20 bg-blue-500" />
              )}
            </motion.div>

            {/* Step Title */}
            <motion.span
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              className={`
                mt-4 text-sm font-medium tracking-wide
                ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}
              `}
            >
              {step.title}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Progress Lines */}
      <div className="absolute top-6 left-0 w-full z-0">
        <div className="h-1 flex items-center justify-between">
          {steps.map((step, index) => (
            index < steps.length - 1 && (
              <motion.div
                key={step.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  flex-1 h-1 mx-2 rounded
                  ${currentStep > step.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gray-200'}
                `}
              />
            )
          ))}
        </div>
      </div>
    </div>
  </div>
)}


      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Step 1 - Personal Information */}
        {currentStep === 1 && (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl"
      >
        {/* Header Section */}
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Personal Information
          </h3>
          <p className="text-gray-600">Tell us about yourself and make your profile stand out</p>
        </motion.div>
  
        {/* Main Form Content */}
        <div className="space-y-10">
          {/* Profile Picture Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="flex-shrink-0 relative group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-44 h-44 rounded-full overflow-hidden ring-4 ring-violet-100 shadow-xl"
              >
                {formData.profilePicture instanceof File ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
                    <FiUser className="w-16 h-16 text-violet-300" />
                  </div>
                )}
              </motion.div>
              <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0]; // ✅ Extract file properly
    if (file) {
      handleFileUpload(file, 'profilePicture'); // ✅ Pass only file, not event
    }
  }}
  className="hidden"
  id="profile-upload"
/>

              <motion.label
                htmlFor="profile-upload"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 right-2 p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.label>
            </div>
  
            {/* Name and Email Section */}
            <div className="flex-grow space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }} className="form-group">
                  <label className={labelClasses}>
                    <FiUser className="text-violet-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter your full name"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="form-group">
                  <label className={labelClasses}>
                    <FiUser className="text-violet-500" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter your Username"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="form-group">
                  <label className={labelClasses}>
                    <FiMail className="text-violet-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="your@email.com"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="form-group">
                  <label className={labelClasses}>
                    <FiUser className="text-violet-500" />
                    password
                  </label>
                  <input
                    type="text"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={inputClasses}
                    placeholder="Enter your Username"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
  
          {/* Contact and Personal Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiPhone className="text-violet-500" />
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="+1 (234) 567-8900"
                />
              </div>
            </motion.div>
  
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiCalendar className="text-violet-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={inputClasses}
              />
            </motion.div>
  
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiUser className="text-violet-500" />
                Gender
              </label>
              <select
  name="gender"
  value={formData.gender}
  onChange={handleInputChange}
  className={`${inputClasses} appearance-none cursor-pointer`}
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

            </motion.div>
  
            <motion.div whileHover={{ scale: 1.02 }} className="form-group">
              <label className={labelClasses}>
                <FiMapPin className="text-violet-500" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="Enter your address"
              />
            </motion.div>
          </motion.div>
  
          {/* Bio Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="form-group"
          >
            <label className={labelClasses}>
              <FiBook className="text-violet-500" />
              Bio
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className={`${inputClasses} resize-none`}
              placeholder="Tell us about your teaching experience, interests, and what makes you unique..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Share your teaching philosophy and what makes you stand out as an educator
            </p>
          </motion.div>
        </div>
      </motion.div>
        )}

        {/* Step 2 - Educational Background */}
        {currentStep === 2 && (
         <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         className="max-w-4xl mx-auto p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
       >
         <div className="border-b border-gray-200 pb-4">
           <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
             Educational Background
           </h3>
           <p className="mt-2 text-gray-600">Please provide your educational details below</p>
         </div>
   
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div {...fadeInUp}>
             <label className={labelClasses}>
               Highest Qualification *
             </label>
             <input
               type="text"
               name="qualification"
               required
               value={formData.qualification}
               onChange={handleInputChange}
               className={inputClasses}
               placeholder="e.g., Bachelor's in Computer Science"
             />
           </motion.div>
   
           <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
             <label className={labelClasses}>
               University/Institution *
             </label>
             <input
               type="text"
               name="university"
               required
               value={formData.university}
               onChange={handleInputChange}
               className={inputClasses}
               placeholder="e.g., Stanford University"
             />
           </motion.div>
   
           <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
             <label className={labelClasses}>
               Graduation Year *
             </label>
             <input
               type="number"
               name="graduationYear"
               required
               value={formData.graduationYear}
               onChange={handleInputChange}
               className={inputClasses}
               placeholder="YYYY"
               min="1900"
               max="2099"
             />
           </motion.div>
   
           <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
             <label className={labelClasses}>
               Specialization
             </label>
             <input
               type="text"
               name="specialization"
               value={formData.specialization}
               onChange={handleInputChange}
               className={inputClasses}
               placeholder="e.g., Artificial Intelligence"
             />
           </motion.div>
         </div>
   
         <motion.div 
           {...fadeInUp} 
           transition={{ delay: 0.4 }}
           className="mt-8"
         >
           <label className={labelClasses}>
             Certificates & Achievements
           </label>
           <div className="mt-2 flex justify-center px-6 py-8 border-2 border-dashed border-violet-200 rounded-xl bg-violet-50/30 hover:bg-violet-50/50 transition-colors duration-200">
             <div className="text-center">
               <FiUploadCloud className="mx-auto h-12 w-12 text-violet-500" />
               <div className="mt-4">
                 <label htmlFor="certificates" className="cursor-pointer">
                   <span className="inline-flex items-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                     Choose Files
                   </span>
                   <input
                     id="certificates"
                     name="certificates"
                     type="file"
                     multiple
                     className="sr-only"
                     onChange={(e) => handleFileUpload(e, 'certificates')}
                   />
                 </label>
                 <p className="mt-2 text-sm text-gray-500">
                   or drag and drop your files here
                 </p>
               </div>
               <p className="mt-1 text-xs text-gray-400">
                 Supported formats: PNG, JPG, PDF (Max 10MB each)
               </p>
             </div>
           </div>
         </motion.div>
       </motion.div>
        )}

        {/* Step 3 - Professional Details */}
        {currentStep === 3 && (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-8 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
      >
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Professional Details
          </h3>
          <p className="mt-2 text-gray-600">Share your professional experience and expertise</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className={labelClasses}>
              <FiBriefcase className="text-violet-500" />
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              required
              value={formData.experience}
              onChange={handleInputChange}
              className={inputClasses}
              placeholder="Enter years of experience"
              min="0"
              max="50"
            />
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className={labelClasses}>
              <FiBook className="text-violet-500" />
              Subjects
            </label>
            <Select
              isMulti
              name="subjects"
              options={subjects.map(subject => ({ value: subject, label: subject }))}
              value={formData.subjects.map(subject => ({ value: subject, label: subject }))}
              onChange={(selected) => setFormData({
                ...formData,
                subjects: selected ? selected.map(option => option.value) : []
              })}
              styles={customSelectStyles}
              placeholder="Select subjects..."
            />
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className={labelClasses}>
              <FiLayers className="text-violet-500" />
              Teaching Levels
            </label>
            <Select
              isMulti
              name="teachingLevel"
              options={teachingLevels.map(level => ({ value: level, label: level }))}
              value={formData.teachingLevel.map(level => ({ value: level, label: level }))}
              onChange={(selected) => setFormData({
                ...formData,
                teachingLevel: selected ? selected.map(option => option.value) : []
              })}
              styles={customSelectStyles}
              placeholder="Select teaching levels..."
            />
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className={labelClasses}>
              <FiBookOpen className="text-violet-500" />
              Previous Institutions
            </label>
            <input
              type="text"
              name="previousInstitutions"
              value={formData.previousInstitutions.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                previousInstitutions: e.target.value.split(',').map(item => item.trim())
              })}
              className={inputClasses}
              placeholder="Enter institutions separated by commas"
            />
          </motion.div>
        </div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <label className={labelClasses}>
            <FiUsers className="text-violet-500" />
            Professional References
          </label>
          <textarea
            name="references"
            rows={4}
            value={formData.references.join('\n')}
            onChange={(e) => setFormData({
              ...formData,
              references: e.target.value.split('\n').filter(ref => ref.trim())
            })}
            className={`${inputClasses} resize-none`}
            placeholder="Enter each reference on a new line&#10;Example:&#10;Dr. John Doe - Professor at XYZ University&#10;Jane Smith - Department Head at ABC College"
          />
        </motion.div>
      </motion.div>
        )}

        {/* Step 4 - Teaching Preferences */}
        {currentStep === 4 && (
           <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl shadow-xl space-y-8"
         >
           <div className="border-b border-gray-200 pb-6">
             <motion.h3 
               className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
             >
               Teaching Preferences
             </motion.h3>
             <p className="mt-2 text-gray-600">Configure your teaching schedule and preferences</p>
           </div>
     
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.1 }}
             >
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                 <FiClock className="text-violet-500" />
                 Available Timings
               </label>
               <Select
                 isMulti
                 options={timingOptions}
                 styles={customSelectStyles}
                 value={timingOptions.filter(option => 
                   formData.availableTimings.includes(option.value)
                 )}
                 onChange={(selected) => {
                   handleInputChange({
                     target: {
                       name: 'availableTimings',
                       value: selected.map(item => item.value)
                     }
                   });
                 }}
                 placeholder="Select available times..."
               />
             </motion.div>
     
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
             >
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                 <FiMonitor className="text-violet-500" />
                 Preferred Mode
               </label>
               <Select
                 isMulti
                 options={modeOptions}
                 styles={customSelectStyles}
                 value={modeOptions.filter(option =>
                   formData.preferredMode.includes(option.value)
                 )}
                 onChange={(selected) => {
                   handleInputChange({
                     target: {
                       name: 'preferredMode',
                       value: selected.map(item => item.value)
                     }
                   });
                 }}
                 placeholder="Select teaching mode..."
               />
             </motion.div>
     
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
             >
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                 <FiDollarSign className="text-violet-500" />
                 Expected Salary (PKR)
               </label>
               <div className="relative">
                 <input
                   type="number"
                   name="expectedSalary"
                   value={formData.expectedSalary}
                   onChange={handleInputChange}
                   className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none"
                   placeholder="Enter amount in PKR"
                 />
                 <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                   PKR
                 </span>
               </div>
             </motion.div>
     
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="md:col-span-2"
             >
               <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                 <FiBookOpen className="text-violet-500" />
                 Teaching Methodology
               </label>
               <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
                 <textarea
                   name="teachingMethodology"
                   value={formData.teachingMethodology}
                   onChange={handleInputChange}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}
                   className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none resize-none"
                   placeholder="Describe your teaching approach, methods, and techniques you use to ensure effective learning..."
                   rows={4}
                 />
               </div>
               <p className="mt-2 text-xs text-gray-500">
                 Tip: Include your teaching philosophy, assessment methods, and how you handle different learning styles
               </p>
             </motion.div>
           </div>
         </motion.div>
        )}

        {/* Step 5 - Documents Upload */}
        {!formSubmitted && currentStep === 5 && (
  <div className="flex flex-col space-y-6">
    {[
      { key: 'cnicFront', label: 'CNIC Front' },
      { key: 'cnicBack', label: 'CNIC Back' },
      { key: 'lastDegree', label: 'Last Degree' }
    ].map(({ key, label }) => (
      <div key={key} className="flex flex-col items-center space-y-2">
        <span className="text-lg font-semibold text-gray-700">{label}</span>
        <div className="w-44 h-44 rounded-lg overflow-hidden ring-4 ring-violet-100 shadow-xl">
          {formData[key] instanceof File ? (
            <img
              src={URL.createObjectURL(formData[key])}
              alt={label}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 flex items-center justify-center">
              <FiUser className="w-16 h-16 text-violet-300" />
            </div>
          )}
        </div>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleFileUpload(file, key);
              }
            }}
            className="hidden"
            id={`${key}-upload`}
          />
          <motion.label
            htmlFor={`${key}-upload`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md shadow-lg cursor-pointer"
          >
            Upload {label}
          </motion.label>
        </div>
      </div>
    ))}
  </div>
)}


        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
        <button
  type="submit"
  disabled={loading} // 🔹 Form submit होते ही बटन disable हो जाएगा
  className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    ${currentStep === 1 ? 'ml-auto' : ''}`}
>
  {loading ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
        ></path>
      </svg>
      Submitting...
    </>
  ) : (
    currentStep === steps.length ? 'Submit' : 'Next'
  )}
</button>

        </div>
       

      </motion.form>
    




    </div>
    

  );
};

export default TeacherForm;