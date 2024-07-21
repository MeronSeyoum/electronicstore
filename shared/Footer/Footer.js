import Link from "next/link";
import React from "react";
import { footerData } from "data/content";
import Logo from "../Logo/Logo";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="container py-10 space-y-6">
        <Subscribe />

        <div className="flex flex-wrap justify-between pb-10">
          <div className="flex flex-col w-full lg:w-1/6 mb-8 lg:mb-0">
            <Logo className="" />
          </div>

          <div className="flex flex-wrap w-full lg:w-5/6">
            <div className="w-full lg:w-2/6 py-5 mb-8 lg:mb-0">
              <span className="text-xs  ">{footerData.description}</span>
            </div>
            <div className="w-full lg:w-2/6 lg:py-5">
              {/* Add the address map here */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.826247640557!2d-114.09160241264364!3d51.037829771966386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716e3d1d5aa4a9%3A0x93313f6fffbb1188!2s17%20Ave%20SW%2C%20Alberta%2C%20Canada!5e0!3m2!1sen!2sau!4v1721595546732!5m2!1sen!2sau"
                width="100%"
                height="250"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="grid gap-8 grid-cols-2 lg:grid-cols-5 w-full lg:w-2/6">
              {footerData.footerLinks.map((item, index) => (
                <div key={index} className="space-y-2 lg:pt-0 pt-6">
                  <h4 className="text-base font-semibold text-primary-light">
                    {item.title}
                  </h4>
                  <div className="space-y-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-xs block hover:underline text-gray-300"
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
