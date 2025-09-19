import React from 'react';
import { OrganizationRequisitesCard } from './OrganizationRequisitesCard';
import { mockOrganization, getOrganizationByVersionId } from '../../data/organizationData';

/**
 * Test component to verify OrganizationRequisitesCard functionality
 * This component demonstrates the integration with mock data and version management
 */
export const OrganizationRequisitesCardTest: React.FC = () => {
  const [currentOrganization, setCurrentOrganization] = React.useState(mockOrganization);

  const handleVersionChange = (versionId: string) => {
    const versionData = getOrganizationByVersionId(versionId);
    if (versionData) {
      setCurrentOrganization(versionData);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Organization Requisites Card Test</h1>
      <OrganizationRequisitesCard
        organization={currentOrganization}
        version={currentOrganization.version}
        onVersionChange={handleVersionChange}
      />
    </div>
  );
};

export default OrganizationRequisitesCardTest;