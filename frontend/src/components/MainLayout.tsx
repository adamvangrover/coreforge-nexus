import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
// DEV_NOTE: Could also include a Sidebar here if the design evolves to need one.
// import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />
      {/* <div className="flex flex-1"> */}
        {/* <Sidebar /> */} {/* Uncomment if a sidebar is added */}
        {/* <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full"> */}
        {/* DEV_NOTE: The 'max-w-7xl mx-auto' and padding were previously in App.tsx's main tag.
            Moving it here makes MainLayout control the main content area's styling.
            If some pages need full width, this might need adjustment or conditional application.
        */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet /> {/* Child routes will render here */}
        </main>
      {/* </div> */}
      {/* DEV_NOTE: Footer could be added here as well */}
      {/* <Footer /> */}
    </div>
  );
};
