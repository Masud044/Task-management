import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Art and Craft', 'Nature', 'Family', 'Sport', 'Friends', 'Meditation'], default: 'Art and Craft' },
  status: { type: String, enum: ['Pending', 'InProgress', 'Done'], default: 'Pending' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
