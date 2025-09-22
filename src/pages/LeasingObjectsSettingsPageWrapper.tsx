import React from 'react';
import LeasingObjectsSettingsPage from './LeasingObjectsSettingsPage';
import { leasingObjectAvailabilityRules } from '../data/leasingObjectsData';
import type { LeasingObjectAvailabilityRule } from '../types/leasingObjects';

const LeasingObjectsSettingsPageWrapper: React.FC = () => {
  const handleAddRule = () => {
    console.log('Adding new leasing object availability rule');
  };

  const handleEditRule = (rule: LeasingObjectAvailabilityRule) => {
    console.log('Editing leasing object availability rule:', rule.id);
  };

  const handleDeleteRule = (rule: LeasingObjectAvailabilityRule) => {
    console.log('Deleting leasing object availability rule:', rule.id);
  };

  return (
    <LeasingObjectsSettingsPage
      rules={leasingObjectAvailabilityRules}
      onAddRule={handleAddRule}
      onEditRule={handleEditRule}
      onDeleteRule={handleDeleteRule}
    />
  );
};

export default LeasingObjectsSettingsPageWrapper;
