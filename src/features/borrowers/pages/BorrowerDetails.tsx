import { useParams, useNavigate } from 'react-router-dom';
import { useGetBorrowerDetail, useRequestDocuments, useSendToValuer, useApproveLoan, useEscalate } from '../api/borrowerApi';
import { useGetBrokerInfo } from '../../brokers/api/brokerApi';
import { NotFound } from '../../../common/components/NotFound';
import { StatusBadge } from '../../../common/components/StatusBadge';
import { InfoCard } from '../../../common/components/InfoCard';
import { formatCurrency } from '../../../common/utils/format';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { Button } from '../../../common/components/Button';
import { RiskSignals } from '../../../common/components/RiskSignals';

export const BorrowerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: borrower, isFetching, error } = useGetBorrowerDetail(id || '');
  const { data: broker } = useGetBrokerInfo('1'); 
  
  const requestDocs = useRequestDocuments();
  const sendToValuer = useSendToValuer();
  const approveLoan = useApproveLoan();
  const escalate = useEscalate();

  if (isFetching) return <LoadingSpinner />;
  if (error || !borrower) return <NotFound />;

  const handleActionSuccess = () => {
    navigate('/borrowers');
  };

  return (
    <div className="borrower-detail space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{borrower.name}</h1>
          <div className="flex items-center mt-2">
            <StatusBadge status={borrower.status} />
            {broker && (
              <span className="ml-4 text-sm text-gray-600">
                Broker: {broker.name} (Approval rate: {broker.approval_rate})
              </span>
            )}
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate('/borrowers')}>
          Back to Pipeline
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard 
          title="Contact Information" 
          items={[
            { label: 'Email', value: borrower.email || 'N/A' },
            { label: 'Phone', value: borrower.phone || 'N/A' },
            { label: 'Employment', value: borrower.employment || 'N/A' }
          ]} 
        />
        
        <InfoCard 
          title="Financial Information" 
          items={[
            { label: 'Loan Amount', value: formatCurrency(borrower.loan_amount) },
            { label: 'Income', value: formatCurrency(borrower.income) },
            { label: 'Existing Loan', value: formatCurrency(borrower.existing_loan) },
            { label: 'Credit Score', value: borrower.credit_score?.toString() || 'N/A' }
          ]} 
        />
        
        <div className="space-y-6">
          <RiskSignals 
            riskSignal={borrower.risk_signal} 
            aiFlags={borrower.ai_flags} 
          />
          
          <InfoCard
            title="Loan Details"
            items={[
              { label: 'Loan Type', value: borrower.loan_type || 'N/A' },
              { label: 'Source of Funds', value: borrower.source_of_funds || 'N/A' }
            ]}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 pt-4 border-t">
        {borrower.status === 'New' && (
          <Button
            loading={requestDocs.isPending}
            onClick={() => requestDocs.mutate(id!, { onSuccess: handleActionSuccess })}
          >
            Request Documents
          </Button>
        )}
        
        {borrower.status === 'In Review' && (
          <>
            <Button
              variant="secondary"
              loading={sendToValuer.isPending}
              onClick={() => sendToValuer.mutate(id!, { onSuccess: handleActionSuccess })}
            >
              Send to Valuer
            </Button>
            <Button
              variant="success"
              loading={approveLoan.isPending}
              onClick={() => approveLoan.mutate(id!, { onSuccess: handleActionSuccess })}
            >
              Approve Loan
            </Button>
            <Button
              variant="warning"
              loading={escalate.isPending}
              onClick={() => escalate.mutate(id!, { onSuccess: handleActionSuccess })}
            >
              Escalate to Credit Committee
            </Button>
          </>
        )}
      </div>
    </div>
  );
};