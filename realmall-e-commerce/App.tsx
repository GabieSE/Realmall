
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import ImageEditor from './components/ImageEditor';
import Button from './components/Button';
import Logo from './components/Logo';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [filter, setFilter] = useState<'all' | 'watch' | 'sunglasses'>('all');

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter(p => p.category === filter);
  }, [products, filter]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const applyAiEdit = (newUrl: string) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, image: newUrl } : p));
      setEditingProduct(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-slate-900 py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=2000" 
              alt="Luxury Accessories" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-purple-900/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-bold tracking-[0.2em] uppercase">
              The Realmall Experience
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
              Elevate Your <span className="text-indigo-400">Daily Vision</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light">
              Premium timepieces and eyewear selected for quality and craftsmanship. 
              Shop securely with our trusted global network.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="px-10">Explore Catalog</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900">Virtual Fitting</Button>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-100 pb-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900">Exclusive Finds</h2>
              <p className="text-slate-500 mt-2">Authentic products with guaranteed secure shipping.</p>
            </div>
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl">
              {(['all', 'watch', 'sunglasses'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${filter === cat ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-indigo-600'}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {filteredProducts.map(product => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-6 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                    <div className="w-full space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Button 
                        variant="secondary" 
                        className="w-full bg-white/95 backdrop-blur shadow-xl"
                        onClick={() => setEditingProduct(product)}
                      >
                        AI Style Studio
                      </Button>
                      <Button 
                        className="w-full shadow-xl"
                        onClick={() => addToCart(product)}
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 shadow-sm border border-indigo-50">
                    {product.category}
                  </div>
                </div>

                <div className="flex-1 px-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                    <span className="font-bold text-lg text-slate-900">${product.price.toLocaleString()}</span>
                  </div>
                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">{product.description}</p>
                  
                  <div className="flex items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <div className="flex text-amber-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    {product.rating} Rating
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-white border-y border-slate-100 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Shop Securely</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">Our proprietary "Shop Securely With Us" protocol ensures end-to-end encryption for every transaction.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mb-8 -rotate-3 hover:rotate-0 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">AI Fitting Room</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">Gemini-powered customization allows you to see products in different lighting and environments.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 rotate-6 hover:rotate-0 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-4">Global Heritage</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">Sourcing the world's most unique accessories from artisan workshops directly to your door.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <Logo className="h-12 mb-6" light />
              <p className="text-slate-400 text-sm leading-relaxed">
                The world's leading destination for luxury watches and eyewear. Experience the future of shopping with Realmall.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold mb-6 text-indigo-400 uppercase tracking-widest text-xs">Collection</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Watches</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sunglasses</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Limited Series</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-indigo-400 uppercase tracking-widest text-xs">Service</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Authenticity</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Concierge</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-bold mb-6 text-indigo-400 uppercase tracking-widest text-xs">Newsletter</h4>
                <div className="flex">
                  <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded-l-lg px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500 w-full" />
                  <button className="bg-indigo-600 px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors">Join</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
            <p>&copy; 2024 Realmall Global. shop securely with us.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
      />

      {editingProduct && (
        <ImageEditor 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)} 
          onApply={applyAiEdit} 
        />
      )}
    </div>
  );
};

export default App;
