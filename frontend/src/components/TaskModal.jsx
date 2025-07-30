import React, { useState } from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: 'Art and Craft',
    status: 'Pending',
    dueDate: '',
  });

  const handleSubmit = () => {
    onSubmit(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-2 mb-3 rounded"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <select
          className="w-full border p-2 mb-3 rounded"
          value={task.category}
          onChange={(e) => setTask({ ...task, category: e.target.value })}
        >
          <option>Art and Craft</option>
          <option>Nature</option>
          <option>Family</option>
          <option>Sport</option>
          <option>Friends</option>
          <option>Meditation</option>
        </select>
        <input
          type="date"
          className="w-full border p-2 mb-3 rounded"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <div className="flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >Cancel</button>
          <button
            className="bg-emerald-400 text-black px-4 py-2 rounded"
            onClick={handleSubmit}
          >Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
