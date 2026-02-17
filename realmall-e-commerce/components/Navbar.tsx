
import React from 'react';
import Logo from './Logo';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo className="h-10" />

          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Collections</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Watches</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Sunglasses</a>
            </div>
            
            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-600 hover:text-indigo-600 transition-all hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
