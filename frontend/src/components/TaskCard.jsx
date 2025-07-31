import { FaTrashAlt, FaCalendarAlt } from 'react-icons/fa';
import { BsPalette } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const parts = date
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    .replace(',', '')
    .split(' ');

  return `${parts[0]}, ${parts[1]} ${parts[2]} - ${parts[3]}`;
};

const TaskCard = ({ task }) => {
  return (
    <Link to={`/tasks/${task._id}`}>
       <div className="relative bg-white p-4 rounded-xl shadow-md w-full max-w-sm border border-gray-200">
      {/* Delete icon */}
      <button className="absolute top-3 right-3 text-red-500 hover:text-red-700">
        <FaTrashAlt />
      </button>

      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-green-100 p-2 rounded-full">
          <BsPalette className="text-green-600 text-xl" />
        </div>
        <h3 className="text-lg font-semibold">{task.category}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">
  {task.description.length > 100
    ? task.description.slice(0, 50) + '...'
    : task.description}
</p>

      {/* Date and Status */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <FaCalendarAlt />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center gap-1 text-pink-500 font-medium">
          <span className="w-2 h-2 bg-pink-500 rounded-full inline-block"></span>
          {task.status}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default TaskCard;
