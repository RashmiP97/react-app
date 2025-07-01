import { Menu, X } from 'lucide-react';

export const Header = ({ isSidebarOpen, toggleSidebar }: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <h1 className="text-xl font-bold text-gray-900">Loan Management System</h1>

        <div className="w-6"></div>
      </div>
    </header>
  );
};