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
    <section className="services-section lg:bg-white  lg:rounded-lg lg:border">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-6 gap-x-3 lg:gap- lg:divide-x divide-neutral-300  lg:p-6">
          {services.map((service, index) => (
            <div key={index} className="flex lg:flex-row flex-col lg:items-end items-center  lg:justify-evenly ">
             <div className='flex flex-row items-center gap-5'>
              <span className=" lg:text-4xl text-2xl mb-0  text-primary-light ">
                {<service.icon />}
              </span>
              <div className="lg:text-start flex  flex-col gap-1 text-xs ">
                <h5 className="lg:text-sm  font-semibold ">{service.title}</h5>
                <p className="text-neutral ">{service.description}</p>
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
