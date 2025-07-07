import React, { useState } from 'react';
import { FaSearch, FaDownload, FaPlay, FaTimes } from 'react-icons/fa';
import BannerImage from "../../assets/dummybannerimage.png";
import Image1 from "../../assets/Image1.png";
import Image2 from "../../assets/Image2.png";
import Image3 from "../../assets/Image3.png";
import Image4 from "../../assets/Image4.png";
import Video from "../../assets/dummyvideo.mp4";
import "../../index.css";

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const bannerAssets = {
      bannerImage: BannerImage,
      orbitImages: [Image1, Image2, Image3, Image4],
      video: Video,
  };

  const { bannerImage, orbitImages, video } = bannerAssets;


  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-rose-900 via-red-800 to-emerald-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          <div className="flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
              We're Here <br />
              <span className="text-amber-400 bg-gradient-to-r from-rose-400 to-emerald-300 bg-clip-text">
                For Delivering Your Favourite Delicious Food
              </span>
            </h1>

            <p className="text-2xl text-gray-400 max-w-xl opacity-90 mx-auto md:mx-0">
              Best in the business
            </p>

           

            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
              <button className="group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm">
                <FaDownload className="text-xl text-amber-400 group-hover:animate-bounce" />
                <span className="text-lg" onClick={()=>alert("OOPS! Download Not Available")}>Download App</span>
              </button>

              <button
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-300/30"
              >
                <FaPlay className="text-xl text-emerald-900" />
                <span className="text-lg text-emerald-900 font-semibold">Are You Hungry?</span>
              </button>
            </div>
          </div>

          
          <div className="flex-1 relative group mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]">
           
            <div className="relative rounded-full p-1 bg-gradient-to-br from-emerald-700 via-rose-800 to-amber-400 shadow-2xl z-20 w-[200px] xs:w-[250px] sm:w-[222px] h-[250px] xs:h-[250px] sm:h-[280px] mx-auto">
              <img
                src={bannerImage}
                alt="Girl Banner"
                className="rounded-full border-4 xs:border-8 border-amber-900/50 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-amber-900/40 mix-blend-multiply" />
            </div>

           
            {orbitImages.map((imgSrc, index) => (
              <div
                key={index}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                  ${index === 0 ? 'orbit' : `orbit-delay-${index * 5}`} 
                  w-[80px] xs:w-[100px] sm:w-[150px] h-[80px] xs:h-[100px] sm:h-[150px]`}
              >
                <img
                  src={imgSrc}
                  alt={`Orbiting ${index + 1}`}
                  className="w-full h-full rounded-full border border-amber-500/30 shadow-lg bg-amber-900/20 p-1 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

     
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all"
          >
            <FaTimes />
          </button>
          <div className="w-full max-w-4xl mx-auto">
            <video
              controls
              autoPlay
              className="w-full aspect-video object-contain rounded-lg shadow-2xl"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
