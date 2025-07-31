import { useParams, useNavigate } from 'react-router-dom';
import { BsPalette } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    apiClient.get(`/tasks/${id}`).then(res => {
      setTask(res.data);
      setStatus(res.data.status);
    }).catch(() => navigate('/'));
  }, [id, navigate]);

  const handleUpdate = async () => {
  try {
    await apiClient.put(`/tasks/${id}`, { status });
    toast.success('Task status Submit successfully!');
    navigate('/');
  } catch (error) {
    toast.error('Failed to status submit task');
    console.error(error);
  }
};

  const handleDelete = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the task permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await apiClient.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      navigate('/dashboard');
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to delete task');
    }
  }
};
  if (!task) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task Details</h2>
        <div className="flex gap-2">
          <button onClick={() => navigate(-1)} className="bg-emerald-400 text-black text-sm px-8 py-2 rounded-md cursor-pointer">
             Back
          </button>
          <button className="bg-yellow-100 text-yellow-500 px-8 py-2 font-medium rounded-md cursor-pointer text-sm">
            ✎ Edit Task
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-100 text-emerald-900 p-4 rounded-full text-3xl"> <BsPalette className="text-green-600 text-xl" /></div>
        <div>
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <p className="text-gray-600">{task.description}</p>
        </div>
      </div>

      <div className="mb-6 space-y-2">
         <div className='md:flex flex-none gap-16'>
          <div>
             <p className="text-gray-700 font-medium">End Date</p>
        <div className="flex items-center gap-2 text-gray-700">
          📅 {format(new Date(task.dueDate), 'EEEE, MMMM d - yyyy')}
        </div>
          </div>

         <div>
          <p className="mt-4 text-gray-700 font-medium">Current Status</p>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${
            status === 'Pending' ? 'bg-yellow-400' :
            status === 'InProgress' ? 'bg-blue-400' :
            status === 'Done' ? 'bg-green-500' : 'bg-gray-400'
          }`} />
          <span className="text-lg font-semibold text-orange-500">{task.status}</span>
        </div>
         </div>
         </div>

        <label className="block mt-6 text-gray-700 font-medium">Change Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 px-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="md:flex flex-none justify-end md:gap-4 space-x-2 mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-200 text-red-600  px-8 py-2 rounded-md  cursor-pointer"
        >
          Delete Task
        </button>
        <button
          onClick={handleUpdate}
          className="bg-emerald-400 text-black px-8 py-2 rounded-md cursor-pointer" 
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
