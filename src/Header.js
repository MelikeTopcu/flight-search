import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();

  return (
    <div className="app-header">
      <div className={`header ${pathname === '/' ? '-dark' : '-light'}`}><span>{'turkishairlines.com'}</span> <span><span className="search">{'search'}</span>{'Flight Challenge'}</span></div>
    </div>
  );
}
export default Header;

