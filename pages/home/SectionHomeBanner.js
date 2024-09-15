import React from "react";
import { useRouter } from 'next/router';
import PromoTag from "components/PromoTag";
import useDataFetch from "hooks/useDataFetch";

const SectionHomeBanner = ({banners}) => {
  // const { fetchedData, error, loading } = useDataFetch("/api/product/Slides_banners?type=banner");
  const router = useRouter();
  const handleButtonClick = (link) => {
    router.push(link);
  };

  return (
    <section className="overflow-hidden  ">
      <div className="grid lg:grid-cols-[3fr_4fr]    gap-5">
        {banners?.length > 0 && (
          <>
            <div className="grid gap-5">
              {banners.slice(0, 2).map((banner, index) => (
                <div key={index} className="">
                  <PromoTag
                    backgroundUrl={banner.image}
                    headerTitle="New Arrival"
                    heading={banner.title}
                    banner_desc={banners?.banner_desc}
                    buttonLabel="View Product"
                    buttonAction={() => handleButtonClick(banner.link)}
                    className="sm:w-80 min-w-full h-60 bg-cover bg-right-bottom"
                    classNameText='text-xl lg:text-lg'
                  />
                </div>
              ))}
            </div>
            <div className="lg:row-span-2">
              <PromoTag
                backgroundUrl={banners[2]?.image}
                headerTitle=""
                heading={banners[2]?.title}
                banner_desc={banners[2]?.banner_desc}
                buttonLabel="View Product"
                buttonAction={() => handleButtonClick(banners[2]?.link)}
                className="lg:w-[810px] h-[500px] sm:w-80 object-contain object-center "
                classNameText='text-xl lg:text-4xl'
               
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SectionHomeBanner;











// import React from "react";
// import { useRouter } from 'next/router';
// import PromoTag from "components/PromoTag";
// import useDataFetch from "hooks/useDataFetch";

// const SectionHomeBanner = () => {
//   const { fetchedData, error, loading } = useDataFetch("/api/product/Slides_banners?type=banner");
//   const router = useRouter();

//   const handleButtonClick = (link) => {
//     router.push(link);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading data</div>;

//   return (
//     <div className="lg:flex lg:gap-5 lg:h-72">
//       {fetchedData && fetchedData.length > 0 && (
//         <>
//           {fetchedData.slice(0, 2).map((banner, index) => (
//             <div
//               key={index}
//               className="lg:w-1/2 items-center rounded-lg lg:flex lg:mb-0 mb-10 bg-no-repeat"
//             >
//               <PromoTag
//                 backgroundUrl={banner.image}
//                 headerTitle="New Arrival"
//                 heading={banner.title }
//                 buttonLabel="View Product"
//                 buttonAction={() => handleButtonClick(banner.link)} 
//               />
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// };

// export default SectionHomeBanner;
