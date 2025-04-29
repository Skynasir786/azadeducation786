import { Course } from "../models/courses.model.js";
import { uploadoncloudinary } from "../utils/cloudinary.js"; // ✅ Import cloudinary uploader

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      level,
      language,
      whatYouWillLearn,
      requirements,
      userId,
    } = req.body;

    let thumbnail = "";

    // Check if thumbnail is provided and handle Cloudinary upload
    if (req.files?.thumbnail && req.files.thumbnail.length > 0) {
      try {
        const uploadedFile = await uploadoncloudinary(req.files.thumbnail[0].path);
        thumbnail = uploadedFile?.url || "";
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ success: false, message: "Thumbnail upload failed" });
      }
    }

    const newCourse = await Course.create({
      title,
      description,
      category,
      thumbnail, // Save the Cloudinary URL
      price,
      level,
      language,
      whatYouWillLearn,
      requirements,
     userId,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("userId", "fullName email");
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single course by ID
export const getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("uploadedBy", "fullName email");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

