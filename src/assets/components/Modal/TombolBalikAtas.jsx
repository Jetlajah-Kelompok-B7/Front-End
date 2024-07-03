import React, { useState, useEffect } from 'react';
import { ArrowLongUpIcon } from '@heroicons/react/24/outline';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-5 bg-[#64CCC5] rounded-full shadow-lg hover:bg-[#aff2ee] transition duration-300"
        >
            <ArrowLongUpIcon className='h-4 w-4 text-[#053B50] '/>
        </button>
      )}
    </div>
  );
};

export default BackToTop;
