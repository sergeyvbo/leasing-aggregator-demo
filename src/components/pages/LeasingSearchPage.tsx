import React from 'react';
import type { Filter, LeasingProduct } from '../../types';
import LeasingFilters from '../ui/LeasingFilters';
import LeasingResults from '../ui/LeasingResults';
import ActiveFilters from '../ui/ActiveFilters';

interface LeasingSearchPageProps {
  filters: Filter[];
  leasingProducts: LeasingProduct[];
  loading: boolean;
  onAddFilter: () => void;
  onRemoveFilter: (id: number) => void;
  onUpdateFilter: (id: number, field: string, value: string) => void;
  onSearchLeasingProducts: () => void;
  onCreateProposal: (product: LeasingProduct) => void;
  onClearAllFilters: () => void;
}

const LeasingSearchPage: React.FC<LeasingSearchPageProps> = ({
  filters,
  leasingProducts,
  loading,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  onSearchLeasingProducts,
  onCreateProposal,
  onClearAllFilters
}) => {
  return (
    <>
      <div className="space-y-8">
        <LeasingFilters
          filters={filters}
          loading={loading}
          onAddFilter={onAddFilter}
          onRemoveFilter={onRemoveFilter}
          onUpdateFilter={onUpdateFilter}
          onSearchLeasingProducts={onSearchLeasingProducts}
        />

        <ActiveFilters
          filters={filters}
          onRemoveFilter={onRemoveFilter}
          onClearAllFilters={onClearAllFilters}
        />

        <LeasingResults
          leasingProducts={leasingProducts}
          onCreateProposal={onCreateProposal}
        />
      </div>
    </>
  );
};

export default LeasingSearchPage;