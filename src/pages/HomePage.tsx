import React from 'react';
import { Users } from 'lucide-react';
import { UserCard } from '../components/UserCard';
import { UserCardSkeleton } from '../components/UserCardSkeleton';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { ThemeToggle } from '../components/ThemeToggle';
import { useUsers } from '../hooks/useUsers';
import { useLocation } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const location = useLocation();
  const savedPage = location.state?.currentPage;

  const {
    users,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCompany,
    setSelectedCompany,
    selectedCity,
    setSelectedCity,
    currentPage,
    setCurrentPage,
    totalPages,
    companies,
    cities,
  } = useUsers(savedPage);

  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Directory</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Filters
            selectedCompany={selectedCompany}
            selectedCity={selectedCity}
            companies={companies}
            cities={cities}
            onCompanyChange={setSelectedCompany}
            onCityChange={setSelectedCity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <UserCardSkeleton key={index} />
              ))
            : users.map((user) => (
                <UserCard key={user.id} user={user} currentPage={currentPage} />
              ))}
        </div>

        {!loading && totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};