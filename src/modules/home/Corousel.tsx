import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function Corousel() {
  const [item, setItem] = useState<number>(1);

  useEffect(() => {
    const int = setInterval(() => {
      setItem((prev) => (prev % 4) + 1);
    }, 5000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="w-full">
      <div className="carousel h-80 w-full">
        <div id="item1" className="carousel-item w-full">
          <LazyLoadImage src={`/banner${item}.webp`} className="w-full object-cover" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setItem(i)}
            className={twMerge('btn btn-xs', item === i && 'btn-neutral')}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
