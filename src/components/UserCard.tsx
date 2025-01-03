import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';
import { Users, ArrowRight } from 'lucide-react';

interface UserCardProps {
  user: User;
  currentPage: number;
}

export const UserCard: React.FC<UserCardProps> = ({ user, currentPage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        <p className="text-gray-600 dark:text-gray-300">{user.company.name}</p>
      </div>
      <button
        onClick={() => navigate(`/user/${user.id}`, { state: { currentPage } })}
        className="mt-4 w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        <span>View Details</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};