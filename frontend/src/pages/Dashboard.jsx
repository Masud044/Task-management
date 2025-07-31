import { useEffect, useState, useContext } from 'react';
import TaskAdd from '../components/TaskAdd';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import img from '../assets/task-empty.jpg';
import apiClient from '../api/apiClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: '', status: '' });

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks with filter:", filter);
      const res = await apiClient.get('/tasks', {
        params: {
          category: filter.category || undefined,
          status: filter.status || undefined,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // 🔥 Break out the dependencies
  useEffect(() => {
    // if (!user) {
    //   navigate('/login');
    //   return;
    // }

    fetchTasks();
  }, [filter.category, filter.status, user]); // ✅ primitive deps only

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Welcome to Dashboard</h1>

      <div className="flex-none md:flex gap-4 mb-4 justify-end">
        <TaskFilter filter={filter} setFilter={setFilter} />
        <TaskAdd onTaskAdded={fetchTasks} />
      </div>

      {tasks.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <img src={img} alt="No tasks" className="w-100 h-100" />
          <p>No Task is Available yet, Please Add your New Task</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
