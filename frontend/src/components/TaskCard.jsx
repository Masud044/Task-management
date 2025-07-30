import React from 'react';

const statusColors = {
  Pending: 'text-yellow-500',
  InProgress: 'text-orange-500',
  Done: 'text-green-500',
};

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 border border-gray-200">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className={`font-medium ${statusColors[task.status]}`}>
          • {task.status}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
