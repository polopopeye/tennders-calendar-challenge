import React from 'react';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    <div className="container">{children}</div>
    <Footer />
  </>
);

export default Layout;
