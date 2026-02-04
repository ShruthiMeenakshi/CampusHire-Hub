import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({
    children,
    activePage,
    pageTitle,
    showSearch = true,
    showSidebar = true,
    showTopbar = true,
    themeClass = ''
}) => {
    return (
        <div className={`min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-white font-inter ${themeClass}`}>
            {showSidebar && <Sidebar activePage={activePage} />}

            <div className={showSidebar ? 'md:ml-64' : ''}>
                {showTopbar && <Topbar pageTitle={pageTitle} showSearch={showSearch} />}

                <main className={showTopbar ? 'p-6' : ''}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;