import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <div className="container">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  </>
);

export default Layout;
