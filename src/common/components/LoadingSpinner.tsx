export const LoadingSpinner = ({ className = '' }: { className?: string }) => {
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  };