import { useState } from 'react';
import apiClient from '../api/ApiClient';
import TaskModal from './TaskModal';

const TaskAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal open
  const handleOpenModal = () => setIsModalOpen(true);

  // Handle modal close
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle submit from modal
  const handleSubmit = async (taskData) => {
    await apiClient.post('/tasks', taskData);
    setIsModalOpen(false);
    // Optionally, refresh tasks or show a success message here
  };

  return (
    <div>
      <button type="button" className=" cursor-pointer bg-emerald-400 text-black px-6 py-2 rounded mt-4" onClick={handleOpenModal}>
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