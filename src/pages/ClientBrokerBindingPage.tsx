import React from 'react';
import { ClientBrokerBindingPage } from '../components/clientBrokerBinding';
import { clientBrokerBindingRules } from '../data/clientBrokerBindingData';

const ClientBrokerBindingPageWrapper: React.FC = () => {
  const handleAddRule = () => {
    console.log('Add rule clicked');
    // TODO: Implement add rule logic
  };

  const handleEditRule = (ruleId: string) => {
    console.log('Edit rule clicked:', ruleId);
    // TODO: Implement edit rule logic
  };

  const handleDeleteRule = (ruleId: string) => {
    console.log('Delete rule clicked:', ruleId);
    // TODO: Implement delete rule logic
  };

  const handleVersionChange = (ruleId: string, versionId: string) => {
    console.log('Version change:', ruleId, versionId);
    // TODO: Implement version change logic
  };

  return (
    <ClientBrokerBindingPage
      rules={clientBrokerBindingRules}
      onAddRule={handleAddRule}
      onEditRule={handleEditRule}
      onDeleteRule={handleDeleteRule}
      onVersionChange={handleVersionChange}
    />
  );
};

export default ClientBrokerBindingPageWrapper;
