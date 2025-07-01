interface StatusBadgeProps {
    status?: string;
    className?: string;
  }
  
  export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
    const statusClasses = {
      New: 'bg-blue-100 text-blue-800',
      'In Review': 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Renew: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800',
    };
  
    const statusKey = status || 'default';
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    const variantClasses = statusClasses[statusKey as keyof typeof statusClasses] || statusClasses.default;
  
    return (
      <span className={`${baseClasses} ${variantClasses} ${className}`}>
        {status || 'Unknown'}
      </span>
    );
  };