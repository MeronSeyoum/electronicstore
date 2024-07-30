import Image from 'next/image';
import Link from 'next/link';
import { pathOr } from 'ramda';
import React from 'react';

import { contactSection } from 'data/content';
import ButtonCircle3 from 'shared/Button/ButtonCircle3';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Heading from 'shared/Heading/Heading';

import ContactForm from './ContactForm';

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        <Heading desc={contactSection.description} isMain isCenter>
          {contactSection.heading}
        </Heading>

        <div className="mx-auto max-w-3xl rounded-xl bg-gray-200 p-5 lg:p-8 ">
          <ContactForm />
        </div>
      </div>

      <div className="my-24">
        <Heading
          desc={contactSection.directContactInfoHeader.description}
          isMain
          isCenter
        >
          {contactSection.directContactInfoHeader.heading}
        </Heading>

        <div className="grid gap-8 lg:grid-cols-3">
          {contactSection.directContactInfo.map((info) => (
            <div
              key={info.title}
              className="flex flex-col items-center justify-center gap-7 text-center border p-6 rounded-lg bg-gray-200"
            >
              <ButtonCircle3 className="bg-neutral-light text-primary" size="w-16 h-16">
                {info.icon}
              </ButtonCircle3>

              <h2 className="text-xl font-medium">{info.title}</h2>
              <p className="text-neutral-500 text-sm lg:w-80">{info.description}</p>
              <Link
                className="border-b border-black py-2 text-xl font-medium hover:border-primary hover:text-primary"
                href={info.contactLink.href}
              >
                {info.contactLink.title}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="mb-32">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Follow us on Instagram</h2>
          <ButtonSecondary className="border-2 border-primary text-primary">
            Visit
          </ButtonSecondary>
        </div>
        
         <div className="grid gap-5 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-5">
            {contactSection.instagramPhotos.slice(0, 4).map((photo) => (
              <div key={photo} className="relative h-44 w-full">
                <Image
                  src={photo}
                  alt="Instagram photo"
                  className="object-contain object-center"
                  layout="fill"
                />
              </div>
            ))}
          </div>
          <div className="relative h-44 w-full">
            <Image
              src={pathOr('', ['instagramPhotos', 4], contactSection)}
              alt="Instagram photo"
              className="object-contain object-center"
              layout="fill"
            />
          </div>
        </div> 
      </div>*/}
    </div>
  );
};

export default page;
