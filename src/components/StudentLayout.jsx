import React from 'react';
import Layout from './Layout';

const StudentLayout = ({ children, activePage, pageTitle, showSearch = true }) => {
  return (
    <Layout 
      activePage={activePage} 
      pageTitle={pageTitle} 
      showSearch={showSearch}
      showSidebar={true}
      showTopbar={true}
    >
      {children}
    </Layout>
  );
};

export default StudentLayout;