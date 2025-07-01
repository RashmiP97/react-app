interface InfoItem {
  label: string;
  value: string | React.ReactNode;
}

interface InfoCardProps {
  title: string;
  items: InfoItem[];
  className?: string;
}

export const InfoCard = ({ title, items, className = '' }: InfoCardProps) => {
  return (
    <div className={`border rounded-lg p-4 bg-white overflow-hidden ${className}`}>
      <h3 className="font-semibold text-lg mb-3 truncate">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-gray-600 shrink-0">{item.label}:</span>
            <span className="font-medium text-left break-words min-w-0">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};