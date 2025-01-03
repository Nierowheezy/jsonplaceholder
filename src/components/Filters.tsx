import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  selectedCompany: string;
  selectedCity: string;
  companies: string[];
  cities: string[];
  onCompanyChange: (company: string) => void;
  onCityChange: (city: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedCompany,
  selectedCity,
  companies,
  cities,
  onCompanyChange,
  onCityChange,
}) => (
  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-gray-600" />
      <span className="text-gray-600 font-medium">Filters:</span>
    </div>
    <select
      value={selectedCompany}
      onChange={(e) => onCompanyChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">All Companies</option>
      {companies.map((company) => (
        <option key={company} value={company}>{company}</option>
      ))}
    </select>
    <select
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">All Cities</option>
      {cities.map((city) => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  </div>
);