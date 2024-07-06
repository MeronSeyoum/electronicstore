import Image from 'next/image';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

const banners = [
  {
    id: 1,
    title: "Buy Huami Smart Watch",
    price: "$49.00",
    image: "/cms-banner-1.jpg",
    color: "text-black",

  },
  {
    id: 2,
    title: "Best Oled Display Phone",
    price: "$59.00",
    image: "/cms-banner-2.jpg",
    color: "text-white",
  },
  {
    id: 3,
    title: "Buy AirPods Max Bluetooth",
    price: "$51.00",
    image: "/cms-banner-3.jpg",
    color: "text-black",
},
];

const SectionCmsBannerThree = () => {
  return (
    <section className="flex flex-wrap lg:flex-row flex-col mb-10 gap-5">
      {banners.map((banner) => (
        <div key={banner.id} className="lg:w-[32.3%]">
          <div className="relative rounded-md overflow-hidden">
            <Image 
              src={banner.image}
              alt={banner.title}
              width={516}
              height={250}
              className="object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center
             lg:px-8 px-4  ">
              <div className='flex lg:gap-3 gap-2 flex-col lg:w-[60%]'>

              <h2 className="lg:text-2xl text-lg font-semibold text-white">{banner.title}</h2>
              <span className="text-sm text-white">From &nbsp;
              <span className={`font-semibold text-2xl text-primary-light ${banner.color}`}>{ banner.price}</span></span>
              <div className="mt-4">
                <ButtonSecondary className="bg-black text-white h-9">
                  Shop Now
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
        </div>
      ))}
    </section>
  );
};

export default SectionCmsBannerThree;
