import { useState } from 'react';
import type { Asset, AssetCategory, AssetStatus, NewAssetInput } from '../types/Types';
import { initialAssets } from '../data/initialAssets';
import { StatsBar } from './components/StatsBar';
import { FilterBar } from './components/FilterBar';
import { AssetList } from './components/AssetList';
import { AddAssetForm } from './components/AddAssetForm';

export function App() {
  // Fő állapotok generikus típusokkal
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'ALL'>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<AssetStatus | 'ALL'>('ALL');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Új eszköz hozzáadása
  const handleAddAsset = (newAssetData: NewAssetInput): void => {
    const newAsset: Asset = {
      ...newAssetData,
      id: crypto.randomUUID(), // Egyedi azonosító generálása
      status: 'Elérhető'
    };
    setAssets((prevAssets) => [newAsset, ...prevAssets]);
    setShowAddForm(false); // Űrlap bezárása mentés után
  };

  // Eszköz kikölcsönzése
  const handleBorrowAsset = (id: string, borrowerName: string): void => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id
          ? { ...asset, status: 'Kikölcsönözve', borrowerName }
          : asset
      )
    );
  };

  // Eszköz visszavétele
  const handleReturnAsset = (id: string): void => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset.id === id
          ? { ...asset, status: 'Elérhető', borrowerName: undefined }
          : asset
      )
    );
  };

  // Eszköz törlése
  const handleDeleteAsset = (id: string): void => {
    setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
  };

  // Szűrési logika (név/sorozatszám, kategória és státusz alapján)
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || asset.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'ALL' || asset.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-vh-100 bg-body-tertiary pb-5">
      {/* Fejléc sáv */}
      <nav className="navbar navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-pc-display-horizontal me-2"></i>
            AssetTracker – IT Eszközleltár
          </span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <>
                <i className="bi bi-x-lg me-1"></i> Űrlap elrejtése
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-1"></i> Új eszköz felvétele
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Fő tartalom */}
      <main className="container">
        {/* Statisztikai sáv */}
        <StatsBar assets={assets} />

        {/* Lenyitható új eszköz űrlap */}
        {showAddForm && <AddAssetForm onAddAsset={handleAddAsset} />}

        {/* Kereső és szűrő panel */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Eszközök listája */}
        <AssetList
          assets={filteredAssets}
          onBorrow={handleBorrowAsset}
          onReturn={handleReturnAsset}
          onDelete={handleDeleteAsset}
        />
      </main>
    </div>
  );
}

export default App;