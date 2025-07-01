import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main 
          className="flex-1 p-4 md:p-6 bg-gray-50 transition-all duration-300"
          style={{
            marginLeft: isSidebarOpen ? '16rem' : '0',
          }}
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <Outlet />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};