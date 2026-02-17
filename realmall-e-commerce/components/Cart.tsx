
import React from 'react';
import { CartItem } from '../types';
import Button from './Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold">Your Selection</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <p className="text-sm font-medium">Your boutique bag is empty</p>
                <Button variant="ghost" className="mt-4" onClick={onClose}>Explore Collections</Button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-stone-900 truncate">{item.name}</h3>
                    <p className="text-stone-500 text-sm mt-1">{item.category}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold">${item.price.toLocaleString()}</span>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors text-xs font-medium uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-stone-50 border-t border-stone-100 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-2xl font-serif font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <Button className="w-full py-4 text-base font-bold tracking-wide">Proceed to Checkout</Button>
                <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em]">Complimentary shipping on all orders</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
