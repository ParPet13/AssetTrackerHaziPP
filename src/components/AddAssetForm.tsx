import React, { useState } from 'react';
import type { FormEvent } from 'react';
import type { AssetCategory, NewAssetInput } from '../../types/Types';

interface AddAssetFormProps {
  onAddAsset: (newAsset: NewAssetInput) => void;
}

export const AddAssetForm: React.FC<AddAssetFormProps> = ({ onAddAsset }) => {
  const [name, setName] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [category, setCategory] = useState<AssetCategory>('Laptop');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const parsedPrice = Number(purchasePrice);

    // Validáció
    if (!name.trim()) {
      setError('Az eszköz megnevezésének megadása kötelező!');
      return;
    }
    if (!serialNumber.trim()) {
      setError('A sorozatszám megadása kötelező!');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('A beszerzési árnak 0-nál nagyobb pozitív számnak kell lennie!');
      return;
    }

    // Új eszköz átadása a szülő komponensnek
    onAddAsset({
      name: name.trim(),
      serialNumber: serialNumber.trim(),
      purchasePrice: parsedPrice,
      category,
      notes: notes.trim() ? notes.trim() : undefined
    });

    // Mezők alaphelyzetbe állítása
    setName('');
    setSerialNumber('');
    setPurchasePrice('');
    setCategory('Laptop');
    setNotes('');
  };

  return (
    <div className="card shadow-sm mb-4 border-0 bg-light">
      <div className="card-header bg-primary text-white fw-semibold">
        <i className="bi bi-plus-circle me-2"></i>Új IT eszköz rögzítése
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Megnevezés *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pl. ASUS Zenbook 14"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Sorozatszám *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pl. AS-2026-001"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <label className="form-label">Beszerzési ár (Ft) *</label>
              <input
                type="number"
                className="form-control"
                placeholder="350000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Kategória</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
              >
                <option value="Laptop">Laptop</option>
                <option value="Monitor">Monitor</option>
                <option value="Projektor">Projektor</option>
                <option value="Kiegészítő">Kiegészítő</option>
              </select>
            </div>

            <div className="col-md-9">
              <label className="form-label">Megjegyzés (opcionális)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Pl. Tartozékok, állapot leírása..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Eszköz hozzáadása
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};