import React, { useState, FormEvent } from 'react';
import { Asset, AssetStatus } from '../../types/Types';

interface AssetCardProps {
  asset: Asset;
  onBorrow: (id: string, borrowerName: string) => void;
  onReturn: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  onBorrow,
  onReturn,
  onDelete
}) => {
  const [isBorrowing, setIsBorrowing] = useState<boolean>(false);
  const [borrowerInput, setBorrowerInput] = useState<string>('');

  // Státuszhoz tartozó Bootstrap badge szín meghatározása
  const getBadgeClass = (status: AssetStatus): string => {
    switch (status) {
      case 'Elérhető':
        return 'bg-success';
      case 'Kikölcsönözve':
        return 'bg-warning text-dark';
      case 'Szervizben':
        return 'bg-danger';
    }
  };

  const handleBorrowSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!borrowerInput.trim()) return;
    onBorrow(asset.id, borrowerInput.trim());
    setBorrowerInput('');
    setIsBorrowing(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Biztosan törölni szeretnéd a(z) "${asset.name}" eszközt?`)) {
      onDelete(asset.id);
    }
  };

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-white">
          <span className="badge bg-secondary">{asset.category}</span>
          <span className={`badge ${getBadgeClass(asset.status)}`}>
            {asset.status}
          </span>
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{asset.name}</h5>
          <p className="card-text text-muted small mb-2">
            S/N: <strong>{asset.serialNumber}</strong>
          </p>
          <p className="card-text mb-2">
            Érték: <strong>{asset.purchasePrice.toLocaleString('hu-HU')} Ft</strong>
          </p>

          {asset.status === 'Kikölcsönözve' && asset.borrowerName && (
            <div className="alert alert-warning py-2 px-3 small mb-2">
              <i className="bi bi-person-fill me-1"></i>
              Kölcsönző: <strong>{asset.borrowerName}</strong>
            </div>
          )}

          {asset.notes && (
            <p className="card-text small text-secondary fst-italic mt-auto pt-2 border-top">
              <i className="bi bi-info-circle me-1"></i>
              {asset.notes}
            </p>
          )}
        </div>

        <div className="card-footer bg-white border-top-0 pb-3">
          {isBorrowing ? (
            <form onSubmit={handleBorrowSubmit} className="d-flex gap-1">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Kölcsönző neve..."
                value={borrowerInput}
                onChange={(e) => setBorrowerInput(e.target.value)}
                autoFocus
                required
              />
              <button type="submit" className="btn btn-sm btn-success">
                OK
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsBorrowing(false)}
              >
                Mégse
              </button>
            </form>
          ) : (
            <div className="d-flex justify-content-between gap-2">
              {asset.status === 'Elérhető' && (
                <button
                  className="btn btn-sm btn-primary flex-grow-1"
                  onClick={() => setIsBorrowing(true)}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Kölcsönzés
                </button>
              )}

              {asset.status === 'Kikölcsönözve' && (
                <button
                  className="btn btn-sm btn-outline-success flex-grow-1"
                  onClick={() => onReturn(asset.id)}
                >
                  <i className="bi bi-box-arrow-in-left me-1"></i> Visszavétel
                </button>
              )}

              {asset.status === 'Szervizben' && (
                <button className="btn btn-sm btn-secondary flex-grow-1" disabled>
                  Szerviz alatt
                </button>
              )}

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleDeleteClick}
                title="Eszköz törlése"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};