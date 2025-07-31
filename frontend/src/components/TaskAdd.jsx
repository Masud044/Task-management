import { useState } from 'react';
import apiClient from '../api/apiClient';
import TaskModal from './TaskModal';
import toast from 'react-hot-toast';

const TaskAdd = ({ onTaskAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (taskData) => {
    try {
      await apiClient.post('/tasks', taskData);
      toast.success('Task added successfully!');
      setIsModalOpen(false);
      if (onTaskAdded) onTaskAdded(); 
    } catch (error) {
      toast.error('Failed to add task');
      console.error(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="cursor-pointer bg-emerald-400 text-black px-6 py-2 rounded mt-4"
        onClick={handleOpenModal}
      >
        Add new task
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TaskAdd;
