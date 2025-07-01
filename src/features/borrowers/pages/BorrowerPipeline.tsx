import { useNavigate } from 'react-router-dom';
import { useGetBorrowerPipeline } from '../api/borrowerApi';
import type { Borrower } from '../types/borrowerTypes';
import { StatusBadge } from '../../../common/components/StatusBadge';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { formatCurrency } from '../../../common/utils/format';

export const BorrowerPipeline = () => {
  const navigate = useNavigate();
  const { data: pipeline, isLoading, error } = useGetBorrowerPipeline();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading pipeline data</div>;

  const handleBorrowerClick = (id: string) => {
    navigate(`/borrowers/${id}`);
  };

  return (
    <div className="pipeline-container">
      <h1 className="text-2xl font-bold mb-6">Borrower Pipeline</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PipelineColumn 
          title="New Applications" 
          borrowers={pipeline?.new || []} 
          status="new"
          onBorrowerClick={handleBorrowerClick}
        />
        <PipelineColumn 
          title="In Review" 
          borrowers={pipeline?.in_review || []} 
          status="in_review"
          onBorrowerClick={handleBorrowerClick}
        />
        <PipelineColumn 
          title="Approved" 
          borrowers={pipeline?.approved || []} 
          status="approved"
          onBorrowerClick={handleBorrowerClick}
        />
      </div>
    </div>
  );
};

interface PipelineColumnProps {
  title: string;
  borrowers: Borrower[];
  status: string;
  onBorrowerClick: (id: string) => void;
}

const PipelineColumn = ({ title, borrowers, status, onBorrowerClick }: PipelineColumnProps) => (
  <div className={`border rounded-lg p-4 ${status === 'new' ? 'bg-blue-50' : status === 'in_review' ? 'bg-yellow-50' : 'bg-green-50'}`}>
    <h2 className="font-semibold text-lg mb-4">
      {title} <span className="text-gray-500">({borrowers.length})</span>
    </h2>
    <div className="space-y-3">
      {borrowers.map(borrower => (
        <div 
          key={borrower.id} 
          className="border rounded p-3 bg-white cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onBorrowerClick(borrower.id)}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{borrower.name}</h3>
            <StatusBadge status={borrower.status} />
          </div>
          <p className="text-sm text-gray-600">{borrower.loan_type}</p>
          <p className="font-semibold mt-1">{formatCurrency(borrower.loan_amount)}</p>
        </div>
      ))}
      {borrowers.length === 0 && (
        <div className="text-center text-gray-500 py-4">No borrowers in this stage</div>
      )}
    </div>
  </div>
);