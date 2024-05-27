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
    description: 'On Order Above $20',
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section  ">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          {services.map((service, index) => (
            <div key={index} className="w-full md:w-1/4">
              <div className="flex items-end">
                <span>
                  <service.icon  className='text-3xl text-gray-600' />
                </span>
                <div className="ml-5 ">
                  <h5 className="text-sm font-[500] ">{service.title}</h5>
                  <p className="text-gray-600 text-[13px]">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
