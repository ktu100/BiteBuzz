import React, { useState } from 'react';
import { FaRegEnvelope, FaXTwitter } from 'react-icons/fa6';
import { BiChevronRight } from 'react-icons/bi';
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Menu', link: '/menu' },
  { name: 'About Us', link: '/about' },
  { name: 'Contact', link: '/contact' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const socialIcons = [
      { icon: FaLinkedin, link: 'https://www.linkedin.com/in/kartikey-ameta-4b992a35a/', color: '#3b5998', label: 'LinkedIn' },
      { icon: FaInstagram, link: 'https://www.instagram.com/kartikey._ameta?utm_source=qr&igsh=MWFzZDdubWp4cmNrdg==', color: '#E1306C', label: 'Instagram' },
      { icon: FaXTwitter, link: 'https://x.com/KTU100', color: '#000', label: 'X' },
      { icon: FaYoutube, link: 'https://www.youtube.com/channel/UCQpIVXRcgGjcSepUwD2pt6g', color: '#FF0000', label: 'Youtube' },
  ];

  return (
    <footer className="bg-[#2A211C] text-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold font-sacramento text-rose-400 animate-pulse">
              Bite-Buzz
            </h2>
            <p className="text-emerald-300 text-2xl font-sacramento italic">
              Makes wonderful dishes available to you.<br />
              Eat Delicious Food And Enjoy Life.
            </p>
            
          </div>

         
          <div className="flex justify-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-rose-400 pl-3 font-merriweather italic text-rose-300">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navItems.map(item => (
                  <li key={item.name}>
                    <a href={item.link} className="flex items-center hover:text-rose-400 transition-all group font-lora hover:pl-2">
                      <BiChevronRight className="mr-2 text-rose-400 group-hover:animate-bounce" />
                      <span className="hover:italic">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
          <div className="flex justify-center md:justify-end">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-rose-400 pl-3 font-merriweather italic text-rose-300">
                Social Connect
              </h3>
              <div className="flex space-x-4">
                {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl bg-amber-400/10 p-3 rounded-full hover:bg-amber-400/20 hover:scale-110 transition-all duration-300 relative group"
                    style={{ color }}
                  >
                    <Icon className="hover:scale-125 transition-transform" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-rose-400 text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

       
        <div className="border-t border-rose-800 pt-8 mt-8 text-center">
          <p className="text-rose-400 text-lg mb-2 font-playfair">
            © 2025 Bite-Buzz. All rights reserved.
          </p>
          <div className="group inline-block">
            <a
              href="https://www.linkedin.com/in/kartikey-ameta-4b992a35a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-sacramento bg-gradient-to-r from-rose-400 via-rose-500 to-amber-400 bg-clip-text  hover:text-purple-300 transition-all duration-500"
            >
              Designed by Kartikey Ameta
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
