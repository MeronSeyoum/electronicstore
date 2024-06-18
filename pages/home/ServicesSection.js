import { FaTruck, FaUndo, FaWallet, FaGift } from 'react-icons/fa';

const services = [
  {
    icon: FaTruck,
    title: 'Free Shipping',
    description: 'For all Orders Over $100',
  },
  {
    icon: FaUndo,
    title: '30 Days Returns',
    description: 'For an Exchange Product',
  },
  {
    icon: FaWallet,
    title: 'Secured Payment',
    description: 'Payment Cards Accepted',
  },
  {
    icon: FaGift,
    title: 'Special Gifts',
    description: 'On Order More than $20',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section">
      <div className=" mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-3 lg:gap-6 ">
          {services.map((service, index) => (
            <div key={index} className="flex lg:flex-row flex-co lg:items-end items-center  py-2 px-0 lg:justify-start ">
              <span className=" lg:text-3xl text-2xl mb-0  text-red-400 ">
                {<service.icon />}
              </span>
              <div className="lg:text-start ml-3">
                <h5 className="lg:text-base text-sm  font-semibold ">{service.title}</h5>
                <p className="text-gray-600 lg:text-xs text-[12px]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
