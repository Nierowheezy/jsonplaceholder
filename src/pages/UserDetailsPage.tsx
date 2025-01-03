import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types/user';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowLeft, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.state?.currentPage || 1;
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/', { state: { currentPage } })}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Users</span>
          </button>
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-gray-700 dark:text-gray-300">{user.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-gray-700 dark:text-gray-300">{user.website}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{user.company.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{user.company.catchPhrase}</p>
                  <p className="text-gray-600 dark:text-gray-300">{user.company.bs}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{user.address.street}, {user.address.suite}</p>
                  <p className="text-gray-700 dark:text-gray-300">{user.address.city}, {user.address.zipcode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};