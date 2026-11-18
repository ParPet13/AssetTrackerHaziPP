import React from 'react';
import { Asset } from '../../types/Types.js';
import { AssetCard } from './AssetCard';

interface AssetListProps {
  assets: Asset[];
  onBorrow: (id: string, borrowerName: string) => void;
  onReturn: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AssetList: React.FC<AssetListProps> = ({
  assets,
  onBorrow,
  onReturn,
  onDelete
}) => {
  if (assets.length === 0) {
    return (
      <div className="alert alert-info text-center py-4">
        <i className="bi bi-search fs-3 d-block mb-2"></i>
        Nincs a keresési feltételeknek megfelelő eszköz a nyilvántartásban.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          onBorrow={onBorrow}
          onReturn={onReturn}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};