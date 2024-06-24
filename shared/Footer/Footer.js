import Link from "next/link";
import React from "react";
import { footerData } from "data/content";
import Logo from "../Logo/Logo";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container py-10 space-y-10">
        <Subscribe />

        <div className="flex flex-wrap justify-between pb-10">
          <div className="flex flex-col w-full lg:w-1/5 mb-8 lg:mb-0 ">
            <Logo className="" />
            <span className="text-xs mt-4">{footerData.description}</span>
          </div>
          
          <div className="flex flex-grow pl-10">
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-5 w-full">
              {footerData.footerLinks.map((item, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-base font-semibold">{item.title}</h4>
                  <div className="space-y-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm block hover:underline"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
