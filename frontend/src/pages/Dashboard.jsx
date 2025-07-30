import { useEffect, useState, useCallback } from 'react';

import TaskAdd from '../components/TaskAdd';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import img from '../assets/task-empty.jpg'; // Adjust the path as necessary
import apiClient from '../api/ApiClient';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: '', status: '' });

  const fetchTasks = useCallback(async () => {
    const res = await apiClient.get('/tasks', { params: { category: filter.category, status: filter.status } });
    setTasks(res.data);
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to Dashboard</h1>
      <div className="flex-none md:flex gap-4 mb-4  justify-end">
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskAdd onTaskAdded={fetchTasks} />
      </div>

      {tasks.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        
        <div className=" flex flex-col items-center text-center">
            <img
            src={img} 
            alt="No tasks"
            className="w-100 h-100"
          />
           <p>
            No Task is Available yet, Please Add your New Task
            </p> 
            </div>
      )}
    </div>
  );
};

export default Dashboard;