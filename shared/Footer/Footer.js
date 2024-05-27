import Link from 'next/link';
import React from 'react';

import { footerData } from 'data/content';

import Logo from '../Logo/Logo';
import Subscribe from './Subscribe';

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 ">
          <div className="space-y-10">
            <Logo className="" />
            <p className="text-xs">{footerData.description}</p>
            <Subscribe />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
       
          {footerData.footerLinks.map((item, index) => (
            <div key={index} className="space-y-4 ">
              <h4 className="text-base font-semibold">{item.title}</h4>
              <div className="space-y-2">
                {item.links.map((link) => (
                  <Link key={link.name} href={link.href} className="text-xs block hover:underline">
                    {link.name}
                  </Link>
                ))}
              </div>
              </div>
           
          ))} </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
