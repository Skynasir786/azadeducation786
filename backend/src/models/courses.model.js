import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
    },
    thumbnail: {
      type: String, // Thumbnail image URL
      required: false,
    },
    price: {
      type: Number,
      required: false,
      default: 0, // By default, free course
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    whatYouWillLearn: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model for user references
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin approval
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
