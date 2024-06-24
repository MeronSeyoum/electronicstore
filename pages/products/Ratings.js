import React from 'react';
import { MdStar } from 'react-icons/md';
import Heading from 'shared/Heading/Heading';
import ProgressBar from 'shared/ProgressBar/ProgressBar';

const Ratings = ({ rating, reviews }) => {
  const ratingDetails = [
    {
      title: 5,
      value: 100,
    },
    {
      title: 4,
      value: 56,
    },
    {
      title: 3,
      value: 22,
    },
    {
      title: 2,
      value: 14,
    },
    {
      title: 1,
      value: 2,
    },
  ];

  return (
    <div>
      <Heading className="">Ratings</Heading>

      <div className="flex items-center gap-5 bg-white p-4 rounded-md">
        <div className="space-y-1">
          <p className="text-[70px] font-semibold md:text-[100px]">
            {rating}
            <span className="text-base text-secondary">/5</span>
          </p>
          <p className="text-neutral-500">{`(${reviews} Reviews)`}</p>
        </div>

        <div className="w-full space-y-2">
          {ratingDetails.map((ratingItem) => (
            <div key={ratingItem.title} className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-medium">
                <MdStar className="text-yellow-400" />
                {ratingItem.title}
              </div>
              <ProgressBar value={ratingItem.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
