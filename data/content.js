import { BsBoxFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { FiBox } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { PiPercentFill } from "react-icons/pi";

import { NavItemType } from "components/NavItem";
import CablesPackages1 from "images/Cables-Packages.png";
import power_charger from "images/power_charger.png";
import microinfinitysilver from "images/micro-a_infinity_silver.webp";
import brsb from "images/brsb.webp";
import samsung_profile from "images/samsung_profile.png";
import samsung1 from "images/samsung1.webp";
import samsung2 from "images/samsung2.webp";
import samsung3 from "images/samsung3.webp";
import samsung4 from "images/samsung4.webp";

import metcon5 from "images/metcon5.webp";
import metcon9 from "images/metcon9.webp";
import apple from "images/apple.png";
import apple1 from "images/apple1.webp";
import apple2 from "images/apple2.webp";
import apple3 from "images/apple3.webp";
import apple4 from "images/apple4.webp";
import nike_blazer from "images/nike_blazer.webp";
import playstation_profile from "images/playstation_profile.jpg";
import playstation1 from "images/playstation1.webp";
import playstation2 from "images/playstation2.webp";
import playstation3 from "images/playstation3.webp";
import playstation4 from "images/playstation4.webp";
import shot1 from "images/shots/shot1.webp";
import shot2 from "images/shots/shot2.webp";
import shot3 from "images/shots/shot3.jpeg";
import shot4 from "images/shots/shot4.jpeg";
import shot5 from "images/shots/shot5.webp";
import shot6 from "images/shots/shot6.jpeg";
import shot7 from "images/shots/shot7.webp";
import slides from "images/slides.webp";
import subBanner1 from 'images/sub-banner-1.jpg';
import subBanner2 from 'images/sub-banner-2.jpg';

// import type { BlogType } from './types';

export const topNavLinks = [
  {
    id: "ee46t",
    name: "About",
    href: "/about",
  },
  {
    id: "eerrrt",
    name: "Blog",
    href: "/blog",
  },
  {
    id: "h6ii8g",
    name: "Contact",
    href: "/contact",
  },
  {
    id: "h678ty",
    name: "FAQ",
    href: "/faqs",
  }
];

export const NavLinks = [
  {
    id: "ee46t",
    name: "Home",
    href: "/home",
  },
  {
    id: "eerrrt",
    name: "Blog",
    href: "/blog",
  },
  {
    id: "eexct",
    name: "Collection",
    href: "/products",
  },

  {
    id: "h6ii8g",
    name: "Contact",
    href: "/contact",
  },
  {
    id: "h678ty",
    name: "FAQ",
    href: "/faqs",
  },
  {
    id: "h6i78g",
    name: "Checkout",
    href: "/checkout",
  },
  {
    id: "f678ty",
    name: "Cart",
    href: "/cart",
  },
];


export const headerSection = 
  {
  title: "NEW ARRIVAL!",
  heading: "Smiley Man With Shot Virtual Glasses",
  description:
    "Experience wireless freedom with our stylish White Cordless Headphones, complete with a convenient carrying bag.",
    BannerImage: subBanner1,
 };

export const promotionTag = {
  heading: "MacBook Pro With Smart Phone",
  description:
    "Join the Smartphone Accessory Sale 2023 on October 23rd. We have exciting deals and activities supported by leading brands!",
    BannerImage: subBanner2,
};

export const products = [
  {
    slug: "Cables-Packages",
    productName: "Cables Package",
    coverImage: CablesPackages1,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Accessories", 
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [CablesPackages1, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "powerCharger",
    productName: "Power Charger White",
    coverImage: power_charger,
    currentPrice: 19,
    previousPrice: 25,
    shoeCategory: "Accessories",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 60,
    justIn: true,
    shots: [power_charger, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "micro-a_infinity_silver",
    productName: "3 ft Micro USB To USB Type A Cable",
    coverImage: microinfinitysilver,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Accessories",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [microinfinitysilver, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "apple",
    productName: "Iphone  13 Pro Max",
    coverImage: apple3,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Apple",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [apple3, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "playstation",
    productName: "Play Station",
    coverImage: playstation1,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Game Console",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [playstation1, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "playstation",
    productName: "Play Station VR",
    coverImage: playstation2,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Game Console",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [playstation1, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "samsung1",
    productName: "Samsung  Galaxy S22 Ultra",
    coverImage: samsung1,
    currentPrice: 1299,
    previousPrice: 1499,
    shoeCategory: "Smartphone",
    rating: 4.6,
    reviews: 156,
    pieces_sold: 1500,
    justIn: true,
    shots: [metcon5, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "samsung2",
    productName: "Samsung s 20",
    coverImage: samsung2,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Phone",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [samsung2, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "appleIPhone",
    productName: "Apple  iPhone 15 Pro Max",
    coverImage: apple4,
    currentPrice: 999,
    previousPrice: 1099,
    shoeCategory: "Smart Phone",
    rating: 4.7,
    reviews: 123,
    pieces_sold: 150,
    justIn: true,
    shots: [apple4, shot1, shot2, shot3, shot4],
    overview: "Same as before but with more features",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "playstation",
    productName: "Play station 5",
    coverImage: playstation3,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Game Console",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [playstation3, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "slides",
    productName: "Apple Case for iPhone/iPad",
    coverImage: apple3,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Smart Phone",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: false,
    shots: [apple3, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
  {
    slug: "playstation",
    productName: "Play Station 4",
    coverImage: playstation4,
    currentPrice: 199,
    previousPrice: 250,
    shoeCategory: "Game Console",
    rating: 4.8,
    reviews: 56,
    pieces_sold: 600,
    justIn: true,
    shots: [playstation4, shot1, shot2, shot3, shot4],
    overview:
      "When your workouts wade into the nitty gritty, the Nike Free Metcon 5 can meet you in the depths, help you dig deep to find that final ounce of force and come out of the other side on a high. It matches style with substance, forefoot flexibility with backend stability, perfect for flying through a cardio day or enhancing your agility. A revamped upper offers easier entry with a collar made just for your ankle.",
    shipment_details: [
      {
        icon: <PiPercentFill className="text-xl text-secondary" />,
        title: "Discount",
        description: "> $100 Disc 10%",
      },
      {
        icon: <FaCalendarAlt className="text-xl text-secondary" />,
        title: "Delivery Time",
        description: "6 - 12 Working days",
      },
      {
        icon: <BsBoxFill className="text-xl text-secondary" />,
        title: "Package",
        description: "Reagular Premium Box",
      },
      {
        icon: <FaTruckFast className="text-xl text-secondary" />,
        title: "Estimated Arrival",
        description: "10 - 12 October 23",
      },
    ],
  },
];

export const productsSection = {
  heading: "Shop now, enjoy later with satisfaction",
  description:
    "We have a variety of collections for you! Let's explore and find your accessories—let's make it happen!",
};

const brand = ["Apple", "Samsung", "Motorola", "Play Station"];
const type = ["Smartwatch", "Earbuds", "Smartphone", "Tablet", "Console", "Games", "Accessories"];
const sizes =  ["Small", "Medium", "Large","One Size","Standard"];

// const type = {
//   Apple: ["Smartwatch", "Earbuds", "Accessories"],
//   Samsung: ["Smartphone", "Tablet", "Accessories"],
//   Motorola: ["Smartphone", "Accessories"],
//   "Play Station": ["Console", "Games", "Accessories"]
// };
// const sizes = {
//   "Smartphone": ["Small", "Medium", "Large"],
//   "Tablet": ["Small", "Medium", "Large"],
//   "Smartwatch": ["Small", "Medium"],
//   "Earbuds": ["One Size"],
//   "Console": ["Standard"],
//   "Games": ["One Size"],
//   "Accessories": ["One Size"]
// };
const prices = [
  "Price",
  "Below $100",
  "Below $200",
  "Below $300",
  "Below $400",
];

export const filters = [brand, prices, sizes, type];

export const brandsSection = {
  heading: "The Official Store of The Amazing Brand",
  description:
    "We work together with high quality and famous brands around the world",
  brands: [
    {
      brandName: "Apple",
      rating: 4.9,
      reviews: 10334,
      followers: 7.2,
      visitLink: "https://www.apple.com",
      logo: apple,
      products: [apple1, apple2, apple3, apple4],
    },
    {
      brandName: "Samsung",
      rating: 4.9,
      reviews: 10334,
      followers: 8.5,
      visitLink: "https://www.sumsung.com/",
      logo: samsung_profile,
      products: [samsung1, samsung2, samsung3, samsung4],
    },
    {
      brandName: "Game Console",
      rating: 4.9,
      reviews: 10334,
      followers: 11.2,
      visitLink: "https://nike.com",
      logo: playstation_profile,
      products: [playstation1, playstation2, playstation3, playstation4],
    },
  ],
};

export const footerBannerData = {
  heading: "BRINGING YOU TO UPDATE WITH FANTASTIC HEADSET",
  description:
    "View all brands of our collection on Electronic shop, there is another collection. Please check it out bro, like seriously",
};

export const footerData = {
  description:
    "Electronic Shop was founded in 2023 by Person with a vision to revolutionize online shopping. Our e-commerce platform specializes in offering a wide range of smartphone and computer accessories, catering to customers across Canada.",
  footerLinks: [
    {
      title: "Products",
      links: [
        { href: "/Smart Phone", name: "Smart Phone" },
        { href: "/Computer", name: "Computer" },
        { href: "/Accessory", name: "Accessory" },
        // { href: "/ToolsandSupplies", name: "Tools & Supplies" },
        // { href: "/Refurbishing", name: "Refurbishing" },
      ],
    },
    {
      title: "Featured",
      links: [
        { href: "/newArrivals", name: "New Arrivales" },
        {
          href: "/sale",
          name: "Sale",
          href: "/StartSale",
          name: "Start Selling",
        },
      ],
    },
    {
      title: "Collection",
      links: [
        { href: "/Smart Phone", name: "Smart Phone" },
        { href: "/Computer", name: "Computer" },
        { href: "/Accessory", name: "Accessory" },
        { href: "/ToolsandSupplies", name: "Tools & Supplies" },
        { href: "/Refurbishing", name: "Refurbishing" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", name: "Privacy Policy" },
        { href: "/tem", name: "Term &  Condition" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/contact", name: "Contact" },
        { href: "/giveFeedBack", name: "Give feedback" },
        { href: "/helpcenter", name: "Help center" },
      ],
    },
  ],
};

export const newsletter = {
  heading: "Don't wanna miss our offers?",
  description:
    "Drop your email below and start receiving the best offers from HotKicks",
};

export const productAttributes = {
  color: [
    "black",
    "green",
    "silver"
  ],
  RAM: [
    "4GB",
    "8GB"
  ],
  internalStorage: [
    "32GB",
    "64GB",
    "128GB"
  ]
};


export const note =
  " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!";

export const contactSection = {
  heading: "Contact us",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis quis phasellus eleifend tellus orci ornare.",
  directContactInfoHeader: {
    heading: "Prefer to reach out directly?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh magna sit diam pharetra.",
  },
  directContactInfo: [
    {
      icon: <FiBox className="text-5xl" />,
      title: "Sales",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit blandit velit semper aliquam.",
      contactLink: {
        href: "mailto:sales@hotkicks.com",
        title: "sales@hotkicks.com",
      },
    },
    {
      icon: <IoChatboxOutline className="text-5xl" />,
      title: "Support",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit blandit velit semper aliquam.",
      contactLink: {
        href: "mailto:support@hotckicks.com",
        title: "support@hotckicks.com",
      },
    },
    {
      icon: <MdOutlineCameraAlt className="text-5xl" />,
      title: "Influencers",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit blandit velit semper aliquam.",
      contactLink: {
        href: "mailto:influencers@hotckicks.com",
        title: "influencers@hotckicks.com",
      },
    },
  ],
  instagramPhotos: [
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
};

export const faqsData = {
  heading: "Frequently Asked Questions",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget adipiscing nibh nunc. Velit rhoncus arcu velesaed.",
  faqs: [
    {
      category: "Shipping",
      data: [
        {
          question: "How can I track my order?",
          answer:
            "You can track your order by logging into your account and checking the order status. Additionally, a tracking number will be provided in the shipping confirmation email.",
        },
        {
          question: "What is the estimated delivery time for my order?",
          answer:
            "Delivery times vary based on your location. Typically, domestic orders take 3-5 business days, while international orders may take 7-14 business days.",
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer:
            "Unfortunately, we cannot change the shipping address once the order is placed. Please double-check your information before completing the purchase.",
        },
        {
          question: "Do you offer expedited shipping options?",
          answer:
            "Yes, we offer expedited shipping at an additional cost. You can choose your preferred shipping method during the checkout process.",
        },
        {
          question: "What should I do if my order is delayed or lost?",
          answer:
            "If your order is significantly delayed or lost, please contact our customer support team, and we will investigate the issue.",
        },
      ],
    },
    {
      category: "Products",
      data: [
        {
          question: "How do I determine the right size for my sneakers?",
          answer:
            "Refer to our size chart available on the product page. It provides measurements and guidelines to help you choose the correct size.",
        },
        {
          question: "Are your sneakers authentic?",
          answer:
            "Yes, we guarantee the authenticity of all our sneakers. We source them directly from authorized retailers and reputable suppliers.",
        },
        {
          question: "Can I return or exchange my sneakers if they don't fit?",
          answer:
            "Yes, we have a hassle-free return policy. You can return or exchange unworn sneakers within 30 days of receiving your order.",
        },
        {
          question: "Are the colors of the sneakers accurate in the photos?",
          answer:
            "We strive to provide accurate color representation, but slight variations may occur due to monitor settings. Refer to product descriptions for additional details.",
        },
        {
          question: "Do you restock sold-out sneakers?",
          answer:
            "We restock popular styles based on demand. You can sign up for notifications to be informed when a specific product is back in stock.",
        },
      ],
    },
    {
      category: "Payments",
      data: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards, PayPal, and other secure payment methods. You can view the full list during the checkout process.",
        },
        {
          question: "How can I apply a discount code to my order?",
          answer:
            "Enter your discount code in the designated field during checkout. The discount will be applied to your total before payment.",
        },
        {
          question: "Can I modify or cancel my order after payment?",
          answer:
            "Once an order is placed, it cannot be modified or canceled. Please review your order carefully before completing the purchase.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption to secure your payment information. Your data is protected and never stored on our servers.",
        },
        {
          question: "Do you offer gift cards?",
          answer:
            "Yes, we offer gift cards of various denominations. They make great presents for sneaker enthusiasts!",
        },
      ],
    },
    {
      category: "Returns",
      data: [
        {
          question: "How do I initiate a return or exchange?",
          answer:
            'Visit the "Returns & Exchanges" page on our website, follow the instructions, and submit a request. Our team will guide you through the process.',
        },
        {
          question: "What is your return policy for defective products?",
          answer:
            "If you receive a defective product, please contact our customer support within 7 days of receiving the order. We will arrange a replacement or refund.",
        },
        {
          question: "Are there any restocking fees for returns?",
          answer:
            "We do not charge restocking fees for returns. However, please review our return policy for specific details.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Refunds are typically processed within 5-7 business days after we receive the returned items and verify their condition.",
        },
        {
          question: "Can I return sneakers if I've worn them?",
          answer:
            "We only accept returns for unworn sneakers. Please try them on in a clean, indoor environment to ensure they are the right fit before wearing them outside.",
        },
      ],
    },
  ],
};

const demoBlogData = {
  sectionOne: {
    title: "What cleaning products are safe for different sneaker materials?",
    paragraph1:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    points: [
      "Pretium nibh ipsum consequat nisl vel pretium. Sed vulputate mi sit",
      "Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer  dolore eu fugiat nulla pariatur",
      "Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac",
      "Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis",
    ],
    paragraph2:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  },
  sectionTwo: {
    title: "Can you provide a step-by-step guide to cleaning sneakers?",
    description:
      "Augue lacus viverra vitae congue eu consequat ac felis donec. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Morbi tristique senectus et netus et malesuada fames ac turpis. Iaculis eu non diam phasellus vestibulum lorem sed.",
    midImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  sectionThree: {
    title: "How do I prevent and remove stains from my sneakers?",
    description:
      "Augue lacus viverra vitae congue eu consequat ac felis donec. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Morbi tristique senectus et netus et malesuada fames ac turpis. Iaculis eu non diam phasellus vestibulum lorem sed.",
  },
  sectionFour: {
    title:
      "What are the best practices for drying sneakers without causing damage?",
    description:
      "Bibendum at varius vel pharetra vel turpis nunc. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc. Volutpat est velit egestas dui id ornare.",
    points: [
      "Pretium nibh ipsum consequat nisl vel pretium. Sed vulputate mi sit",
      "Tristique nulla aliquet enim tortor at auctor urna. Sit amet aliquam id diam maer  dolore eu fugiat nulla pariatur",
      "Nam libero justo laoreet sit amet. Lacus sed viverra tellus in hac",
      "Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis",
    ],
  },
  quote:
    "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor porta rhoncus, viverra sit et auctor. Augue in volutpat sed eget in etiam.”",
  sectionFive: [
    {
      title: "How should I store my sneakers to maintain their quality?",
      description:
        "Tincidunt nunc pulvinar sapien et ligula. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Aliquet bibendum enim facilisis gravida neque convallis a cras. Molestie nunc non blandit massa enim nec dui nunc.",
    },
    {
      title:
        "What special care should be taken to extend the lifespan of sneakers?",
      description:
        "Tincidunt nunc pulvinar sapien et ligula. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Aliquet bibendum enim facilisis gravida neque convallis a cras. Molestie nunc non blandit massa enim nec dui nunc.",
    },
  ],
};

export const blogs = [
  {
    title: "The Evolution of Sneaker Culture: A Historical Perspective",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Style",
    slug: "the-evolution-of-sneaker-culture-a-historical-perspective",
  },
  {
    title: "Top 10 Sneaker Trends to Watch in 2023",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1448387473223-5c37445527e7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Fitting",
    slug: "top-10-sneaker-trends-to-watch-in-2023",
  },
  {
    title: "How to Clean and Maintain Your Sneaker Collection",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Style",
    slug: "how-to-clean-and-maintain-your-sneaker-collection",
  },
  {
    title:
      "The Influence of Sneaker Collaborations: From Athletes to Designers",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1659614404055-670edff49a1b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "General",
    slug: "the-influence-of-sneaker-collaborations-from-athletes-to-designers",
  },
  {
    title: "Sneaker Sizing Guide: Finding the Perfect Fit",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1515396800500-75d7b90b3b94?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Style",
    slug: "sneaker-sizing-guide-finding-the-perfect-fit",
  },
  {
    title:
      "Sneaker Collecting 101: Building and Organizing Your Sneaker Collection",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Fitting",
    slug: "sneaker-collecting-101-building-and-organizing-your-sneaker-collection",
  },
  {
    title: "Behind the Design: Sneaker Production Process Unveiled",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "General",
    slug: "behind-the-design-sneaker-production-process-unveiled",
  },
  {
    title:
      "Exploring Limited Edition Sneaker Drops: How to Cop Exclusive Releases",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "General",
    slug: "exploring-limited-edition-sneaker-drops-how-to-cop-exclusive-releases",
  },
  {
    title: "Sneaker Spotlight: Nike Review and Styling Tips",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1421&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Style",
    slug: "sneaker-spotlight-nike-review-and-styling-tips",
  },
  {
    title: "Sustainable Sneaker Choices: Eco-Friendly Options in the Market",
    brief:
      "Lorem ipsum dolor sit amet, lormol amenrtol consectetur adipiscing elit, sed do eiusmod tempor.",
    date: "October 2, 2022",
    coverImage:
      "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    blogData: demoBlogData,
    tag: "Style",
    slug: "sustainable-sneaker-choices-eco-friendly-options-in-the-market",
  },
];

export const productsCollection = {
  heading: "Collection",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit facilisi pellentesque cursus eget morbi sagittis sagittis.",
};
