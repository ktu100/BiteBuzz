
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaHeart, FaPlus, FaFire } from 'react-icons/fa';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useCart } from '../../CartContext/CartContext';
import FloatingParticle from '../FloatingParticle/FloatingParticle';

const SpecialOffer = () => {
  const [showAll, setShowAll] = useState(false);
  const [items, setItems] = useState([]);
  const { addToCart, updateQuantity, removeFromCart, cartItems: rawCart } = useCart();

  
  const cartItems = rawCart.filter(ci => ci.item);



  useEffect(() => {
    axios
      .get('http://localhost:4000/api/items')
      .then(res => setItems(res.data.items ?? res.data))
      .catch(err => console.error(err));
  }, []);

  const displayList = Array.isArray(items) ? items.slice(0, showAll ? 8 : 4) : [];

  return (
    <div className="bg-gradient-to-b from-[#1a1212] to-[#2a1e1e] text-white py-16 px-4 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent italic">
            Today's <span className="text-stroke-gold">Special</span> Offers
          </h1>
          <p className=" text-emerald-300 text-xl">
            Savour Wonderful Dishes prepared by our Experienced Chefs
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayList.map(item => {
            const cartItem = cartItems.find(ci => ci.item?._id === item._id);
            const qty = cartItem?.quantity ?? 0;
            const cartId = cartItem?._id;

            return (
              <div
                key={item._id}
                className="relative group bg-[#4b3b3b] rounded-3xl overflow-hidden shadow-2xl hover:-translate-y-4 transition duration-500 hover:shadow-red-900/40 border-2 border-transparent hover:border-amber-500/20"
              >
                
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover brightness-90 group-hover:brightness-110 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="flex items-center gap-2 text-rose-400">
                      <FaStar /><b>{item.rating}</b>
                    </span>
                    <span className="flex items-center gap-2 text-red-400">
                      <FaHeart /><b>{item.hearts}</b>
                    </span>
                  </div>
                </div>

                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-rose-300 to-rose-500 bg-clip-text text-transparent italic">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 mb-5 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-rose-400">
                      ₹{Number(item.price).toFixed(2)}
                    </span>

                    {qty > 0 ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            qty > 1
                              ? updateQuantity(cartId, qty - 1)
                              : removeFromCart(cartId)
                          }
                          className="w-8 h-8 rounded-full bg-rose-900/40 flex items-center justify-center"
                        >
                          <HiMinus className="w-4 h-4 text-amber-100" />
                        </button>
                        <span className="w-8 text-center text-rose-100">{qty}</span>
                        <button
                          onClick={() => updateQuantity(cartId, qty + 1)}
                          className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center"
                        >
                          <HiPlus className="w-4 h-4 text-amber-100" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold"
                      >
                        <FaPlus />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>

              
                <FloatingParticle className="opacity-0 group-hover:opacity-100 absolute inset-0 pointer-events-none" />
              </div>
            );
          })}
        </div>


        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-3 bg-gradient-to-r from-red-700 to-rose-700 text-white px-8 py-4 rounded-2xl font-bold uppercase"
          >
            <FaFire className="animate-pulse" />
            <span>{showAll ? 'Show Less' : 'Show More'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
