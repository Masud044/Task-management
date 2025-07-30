import React, { useState } from 'react';

const categories = ['Art and Craft', 'Nature', 'Family', 'Sport', 'Friends', 'Meditation'];
const statuses = ['Pending', 'InProgress', 'Done'];

const TaskFilter = ({ filter, setFilter }) => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <div className="flex gap-4 mt-4 ">
      <div className="relative">
        <select
          className="border px-6 py-2 rounded-lg appearance-none pr-10"
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          onMouseDown={() => setCategoryOpen(true)}
          onBlur={() => setCategoryOpen(false)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <span className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${categoryOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      <div className="relative">
        <select
          className="border w-full px-6 py-2 rounded-lg appearance-none pr-10"
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          onMouseDown={() => setStatusOpen(true)}
          onBlur={() => setStatusOpen(false)}
        >
          <option value="">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <span className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform ${statusOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default TaskFilter;