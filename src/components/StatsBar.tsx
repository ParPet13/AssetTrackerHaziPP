import React from 'react';
import { Asset } from '../../types/Types';

interface StatsBarProps {
  assets: Asset[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ assets }) => {
  const totalCount = assets.length;
  const availableCount = assets.filter((asset) => asset.status === 'Elérhető').length;
  const totalValue = assets.reduce((sum, asset) => sum + asset.purchasePrice, 0);

  // Forint formázása szóközökkel (pl. 1 993 000 Ft)
  const formattedValue = new Intl.NumberFormat('hu-HU', {
    style: 'currency',
    currency: 'HUF',
    maximumFractionDigits: 0
  }).format(totalValue);

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card border-primary h-100 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Összes eszköz</h6>
            <h3 className="card-title text-primary mb-0">{totalCount} db</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-success h-100 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Jelenleg elérhető</h6>
            <h3 className="card-title text-success mb-0">{availableCount} db</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card border-dark h-100 shadow-sm">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">Teljes készletérték</h6>
            <h3 className="card-title text-dark mb-0">{formattedValue}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};