import { useState, useEffect, useMemo } from 'react';
import { User } from '../types/user';

const ITEMS_PER_PAGE = 6;

export const useUsers = (initialPage?: number) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage || 1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Reset page only when filters change, not on initial mount
  useEffect(() => {
    if (searchQuery || selectedCompany || selectedCity) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedCompany, selectedCity]);

  const companies = useMemo(() => 
    [...new Set(users.map(user => user.company.name))],
    [users]
  );

  const cities = useMemo(() => 
    [...new Set(users.map(user => user.address.city))],
    [users]
  );

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCompany = !selectedCompany || user.company.name === selectedCompany;
      const matchesCity = !selectedCity || user.address.city === selectedCity;

      return matchesSearch && matchesCompany && matchesCity;
    });
  }, [users, searchQuery, selectedCompany, selectedCity]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return {
    users: paginatedUsers,
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
  };
};