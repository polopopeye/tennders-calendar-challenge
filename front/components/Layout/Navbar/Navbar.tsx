import Link from 'next/link';
import React from 'react';
import Logo from './modules/Logo';

const Navbar = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <Logo />
        <hr></hr>
      </div>
    </>
  );
};

export default Navbar;
