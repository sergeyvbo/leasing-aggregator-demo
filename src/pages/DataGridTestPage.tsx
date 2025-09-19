import { DataGridTest } from '../components/DataGrid';

export function DataGridTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DataGridTest />
      </div>
    </div>
  );
}