import React, { ChangeEvent } from 'react';
import { AssetCategory, AssetStatus } from '../../types/Types';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: AssetCategory | 'ALL';
  onCategoryChange: (category: AssetCategory | 'ALL') => void;
  selectedStatus: AssetStatus | 'ALL';
  onStatusChange: (status: AssetStatus | 'ALL') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value as AssetCategory | 'ALL');
  };

  const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as AssetStatus | 'ALL');
  };

  return (
    <div className="card bg-light mb-4 shadow-sm">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="searchInput" className="form-label fw-semibold">
              Keresés név vagy sorozatszám alapján
            </label>
            <input
              id="searchInput"
              type="text"
              className="form-control"
              placeholder="Pl. Dell vagy DL-2024..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="categorySelect" className="form-label fw-semibold">
              Kategória
            </label>
            <select
              id="categorySelect"
              className="form-select"
              value={selectedCategory}
              onChange={handleCategorySelect}
            >
              <option value="ALL">Minden kategória</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Projektor">Projektor</option>
              <option value="Kiegészítő">Kiegészítő</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="statusSelect" className="form-label fw-semibold">
              Státusz
            </label>
            <select
              id="statusSelect"
              className="form-select"
              value={selectedStatus}
              onChange={handleStatusSelect}
            >
              <option value="ALL">Minden státusz</option>
              <option value="Elérhető">Elérhető</option>
              <option value="Kikölcsönözve">Kikölcsönözve</option>
              <option value="Szervizben">Szervizben</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};