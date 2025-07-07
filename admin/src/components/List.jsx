import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2, FiStar, FiHeart } from 'react-icons/fi';
import AdminNavbar from './Navbar.jsx';

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/items');
        setItems(data);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  
  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/items/${itemId}`);
      setItems(prev => prev.filter(item => item._id !== itemId));
      console.log('Deleted item ID:', itemId);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`text-xl ${i < rating ? 'text-amber-400 fill-current' : 'text-amber-100/30'}`}
      />
    ));

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className={'min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-amber-100'}>
          Loading menu…
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className='min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8'>
        <div className="max-w-7xl mx-auto">
          <div className='bg-[#4b3b3b]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-rose-500/20'>
            <h2 className='text-3xl font-bold mb-8 bg-gradient-to-r from-rose-300 to-rose-500 bg-clip-text text-transparent text-center'>Manage Menu Items</h2>

            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-[#3a2b2b]/50'>
                  <tr>
                    <th className='p-4 text-left text-rose-400'>Image</th>
                    <th className='p-4 text-left text-rose-400'>Name</th>
                    <th className='p-4 text-left text-rose-400'>Category</th>
                    <th className='p-4 text-left text-rose-400'>Price (₹)</th>
                    <th className='p-4 text-left text-rose-400'>Rating</th>
                    <th className='p-4 text-left text-rose-400'>Hearts</th>
                    <th className='p-4 text-left text-rose-400'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} className='border-b border-amber-500/20 hover:bg-[#3a2b2b]/30 transition-colors'>
                      <td className='p-4'>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className='w-50 h-30 object-contain rounded-lg'
                        />
                      </td>
                      <td className='p-4'>
                        <div className="space-y-1">
                          <p className='text-rose-100 font-medium text-lg'>{item.name}</p>
                          <p className='text-sm text-rose-100/60'>{item.description}</p>
                        </div>
                      </td>
                      <td className='p-4 text-amber-100/80'>{item.category}</td>
                      <td className='p-4 text-amber-300 font-medium'>₹{item.price}</td>
                      <td className='p-4'>
                        <div className="flex gap-1">{renderStars(item.rating)}</div>
                      </td>
                      <td className='p-4'>
                        <div className='flex items-center gap-2 text-rose-400'>
                          <FiHeart className="text-xl" />
                          <span>{item.hearts}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleDelete(item._id)} className='text-rose-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-900/20'>
                          <FiTrash2 className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <div className='text-center py-12 text-rose-100/60 text-xl'>
                No items found in the menu
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;