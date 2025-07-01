import { FileSearch } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  className?: string;
}

export const NotFound = ({
  title = 'Page Not Found',
  description = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  className = ''
}: NotFoundProps) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <FileSearch className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>
      
      {showBackButton && (
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      )}
    </div>
  );
};