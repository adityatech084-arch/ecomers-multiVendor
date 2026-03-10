import React from 'react';
import { MapPin, Phone, Clock, Mail, Youtube, Github, Linkedin, Facebook, Slack } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Info Bar: 4-Column Contact Info */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-slate-100">
          <ContactItem icon={<MapPin />} title="Visit Us" detail="New Orleans, USA" />
          <ContactItem icon={<Phone />} title="Call Us" detail="+12 958 648 597" />
          <ContactItem icon={<Clock />} title="Working Hours" detail="Mon - Sat: 10AM - 7PM" />
          <ContactItem icon={<Mail />} title="Email Us" detail="hello@shopcart.com" />
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <h2 className="text-2xl font-black tracking-tighter text-indigo-700 uppercase">
              SHOPCAR<span className="text-slate-900">T</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Elevate your lifestyle with our curated furniture collections, where modern design meets everyday comfort.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink icon={<Youtube size={18} />} />
              <SocialLink icon={<Github size={18} />} />
              <SocialLink icon={<Linkedin size={18} />} />
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Slack size={18} />} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterLinks title="Quick Links" links={['About Us', 'Contact Us', 'Terms', 'Privacy Policy']} />
          <FooterLinks title="Categories" links={['Mobiles', 'Appliances', 'Smartphones', 'Gadgets']} />

          {/* Newsletter Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Join Our Newsletter</h3>
            <p className="text-slate-500 text-sm mb-4">Get the latest updates on new arrivals and sales.</p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              />
              <button className="w-full bg-amber-600 hover:bg-orange-400 text-white font-semibold py-2 rounded-md transition-all text-sm">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-xs tracking-wide">
            © 2026 SHOPCART. All rights reserved. Designed for Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Sub-Components ---

const ContactItem = ({ icon, title, detail }) => (
  <div className="flex items-center gap-4 p-6 group hover:bg-indigo-50/50 transition-colors cursor-default">
    <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-600">{title}</h3>
      <p className="text-sm font-medium text-slate-700">{detail}</p>
    </div>
  </div>
);

const SocialLink = ({ icon }) => (
  <a href="#" className="p-2 border border-slate-200 rounded-full text-slate-500 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300">
    {icon}
  </a>
);

const FooterLinks = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-slate-900 mb-5">{title}</h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-slate-500 hover:text-indigo-600 text-sm transition-colors">{link}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;