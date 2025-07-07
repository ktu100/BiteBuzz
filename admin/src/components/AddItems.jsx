
import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiHeart, FiStar } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';


import AdminNavbar from './Navbar.jsx';


const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: ''
  });
  const [categories] = useState([
    'Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'
  ]);
  const [hoverRating, setHoverRating] = useState(0);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file)
      }));
    }
  };

  const handleRating = rating =>
    setFormData(prev => ({ ...prev, rating }));

  const handleHearts = () =>
    setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'preview') return;
        payload.append(key, val);
      });
      const res = await axios.post(
        'http://localhost:4000/api/items',
        payload,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Created Item:', res.data);
      setFormData({
        name: '', description: '', category: '',
        price: '', rating: 0, hearts: 0,
        total: 0, image: null, preview: ''
      });
    } catch (err) {
      console.error('Error uploading item:', err.response || err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gradient-to-br from-rose via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-rose-300 to-rose-500 bg-clip-text text-transparent text-center">Add New Menu Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="flex justify-center">
                <label className="w-full max-w-xs sm:w-72 h-56 sm:h-72 bg-[#3a2b2b]/50 border-2 border-dashed border-rose-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-rose-400 transition-all">
                  {formData.preview ? (
                    <img
                      src={formData.preview}
                      alt="Preview"
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FiUpload className='text-3xl sm:text-4xl text-rose-500 mb-2 mx-auto animate-pulse' />
                      <p className="text-rose-400 text-sm">
                        Click to upload product image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-base sm:text-lg text-rose-400">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-rose-400 text-rose-100'
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base sm:text-lg text-rose-400">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={'w-full bg-[#3a2b2b]/50 border border-rose-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-rose-400 text-amber-100 h-32 sm:h-40'}
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  <div>
                    <label className="block mb-2 text-base sm:text-lg text-rose-400">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className='w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-rose-400 text-amber-100'
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => (
                        <option key={c} value={c} className="bg-[#3a2b2b]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-base sm:text-lg text-rose-400">
                      Price (₹)
                    </label>
                    <div className='relative'>
                      <FaRupeeSign className='absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 text-lg sm:text-xl' />
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={'w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-rose-400 text-amber-100 pl-10 sm:pl-12'}
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                  <div>
                    <label className="block mb-2 text-base sm:text-lg text-rose-400">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl sm:text-3xl transition-transform hover:scale-110"
                        >
                          <FiStar
                            className={
                              star <= (hoverRating || formData.rating)
                                ? 'text-rose-400 fill-current'
                                : 'text-amber-100/30'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-base sm:text-lg text-rose-400">
                      Popularity
                    </label>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={handleHearts}
                        className="text-2xl sm:text-3xl text-rose-400 hover:text-rose-300 transition-colors animate-pulse"
                      >
                        <FiHeart />
                      </button>
                      <input
                        type="number"
                        name="hearts"
                        value={formData.hearts}
                        onChange={handleInputChange}
                        className={'w-full bg-[#3a2b2b]/50 border border-amber-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-rose-400 text-amber-100 pl-10 sm:pl-12'}
                        placeholder="Enter Likes"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className='w-full bg-gradient-to-r from-rose-600 to-amber-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-95 mt-6'>
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItems;
