import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    apiClient.get(`/tasks/${id}`).then(res => {
      setTask(res.data);
      setStatus(res.data.status);
    });
  }, [id]);

  const handleUpdate = async () => {
    await apiClient.put(`/tasks/${id}`, { status });
    navigate('/dashboard');
  };

  const handleDelete = async () => {
    await apiClient.delete(`/tasks/${id}`);
    navigate('/dashboard');
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
      <p className="mb-4">{task.description}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="select mb-4">
        <option>All Task</option>
        <option>Ongoing</option>
        <option>Pending</option>
        <option>Collaborative Task</option>
        <option>Done</option>
      </select>
      <div className="flex gap-2">
        <button className="btn bg-red-500" onClick={handleDelete}>Delete Task</button>
        <button className="btn" onClick={handleUpdate}>Submit</button>
      </div>
    </div>
  );
};

export default TaskDetails;
