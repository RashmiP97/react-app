import { NavLink } from 'react-router-dom';

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      <nav
        className={`
          fixed md:static top-16 md:top-0 left-0 bottom-0 z-30
          w-64 bg-white shadow-sm p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="h-full overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/borrowers" 
                className={({ isActive }) => 
                  `block px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                Borrower Pipeline
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        />
      )}
    </>
  );
};