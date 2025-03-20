import React from 'react'
import Navigation from './Navbar'
import Footer from './Footer';

export const Layout = ({children}) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}
