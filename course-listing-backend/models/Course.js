const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId : {type: String, required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  imgUrl: { type: String },
  enrollmentStatus: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  prerequisites: { type: [String] },
  syllabus: { type: [String] },
  duedate: { type: Date },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
