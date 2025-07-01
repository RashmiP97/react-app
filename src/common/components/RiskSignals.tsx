import { AlertTriangle, Flag } from 'lucide-react';

interface RiskSignalsProps {
  riskSignal?: string;
  aiFlags?: string[];
  className?: string;
}

export const RiskSignals = ({ 
  riskSignal, 
  aiFlags = [], 
  className = '' 
}: RiskSignalsProps) => {
  const hasRiskSignals = riskSignal || aiFlags.length > 0;

  if (!hasRiskSignals) {
    return (
      <div className={`p-4 bg-green-50 rounded-md ${className}`}>
        <p className="text-green-800 flex items-center">
          <span className="mr-2">✅</span>
          No risk signals detected
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {riskSignal && (
        <div className="p-3 bg-red-50 rounded-md">
          <p className="text-red-800 font-medium flex items-start">
            <AlertTriangle className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{riskSignal}</span>
          </p>
        </div>
      )}

      {aiFlags.length > 0 && (
        <div className="p-3 bg-yellow-50 rounded-md">
          <h4 className="text-yellow-800 font-medium flex items-center mb-2">
            <Flag className="mr-2 h-4 w-4" />
            AI Detection Flags
          </h4>
          <ul className="space-y-1 pl-6">
            {aiFlags.map((flag, index) => (
              <li key={index} className="text-yellow-700 list-disc">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};