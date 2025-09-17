import React from 'react';
import type { Filter, LeasingProduct } from '../../types';
import LeasingFilters from '../ui/LeasingFilters';
import LeasingResults from '../ui/LeasingResults';
import ProposalModal from '../ui/ProposalModal';
import ActiveFilters from '../ui/ActiveFilters';

interface LeasingSearchPageProps {
  filters: Filter[];
  leasingProducts: LeasingProduct[];
  loading: boolean;
  showModal: boolean;
  onAddFilter: () => void;
  onRemoveFilter: (id: number) => void;
  onUpdateFilter: (id: number, field: string, value: string) => void;
  onSearchLeasingProducts: () => void;
  onShowModal: () => void;
  onCloseModal: () => void;
  onSendProposal: () => void;
  onClearAllFilters: () => void;
}

const LeasingSearchPage: React.FC<LeasingSearchPageProps> = ({
  filters,
  leasingProducts,
  loading,
  showModal,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  onSearchLeasingProducts,
  onShowModal,
  onCloseModal,
  onSendProposal,
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
          onShowModal={onShowModal}
        />
      </div>

      <ProposalModal
        isOpen={showModal}
        onClose={onCloseModal}
        onSendProposal={onSendProposal}
      />
    </>
  );
};

export default LeasingSearchPage;