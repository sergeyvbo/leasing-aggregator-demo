import React, { useState } from 'react';
import { VersionComponent } from './VersionComponent';
import type { EntityVersion } from '../../types/clients';

// Mock version data for testing
const mockVersions: Record<string, EntityVersion> = {
  'v1': {
    id: 'v1',
    number: 1,
    date: '2025-07-01',
    status: 'archived',
    nextVersionId: 'v2'
  },
  'v2': {
    id: 'v2',
    number: 2,
    date: '2025-08-15',
    status: 'archived',
    previousVersionId: 'v1',
    nextVersionId: 'v3'
  },
  'v3': {
    id: 'v3',
    number: 3,
    date: '2025-09-01',
    status: 'active',
    previousVersionId: 'v2'
  }
};

/**
 * Demo component to test VersionComponent functionality
 * This is for development/testing purposes only
 */
export const VersionComponentDemo: React.FC = () => {
  const [currentVersionId, setCurrentVersionId] = useState('v3');
  const currentVersion = mockVersions[currentVersionId];

  const handleVersionChange = (versionId: string) => {
    if (mockVersions[versionId]) {
      setCurrentVersionId(versionId);
    }
  };

  if (!currentVersion) {
    return <div>Version not found</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">VersionComponent Demo</h2>
      <VersionComponent
        version={currentVersion}
        onVersionChange={handleVersionChange}
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Current Version ID: {currentVersionId}</p>
        <p>Available versions: v1 (archived), v2 (archived), v3 (active)</p>
      </div>
    </div>
  );
};

export default VersionComponentDemo;