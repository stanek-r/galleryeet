import { LazyLoadImage } from 'react-lazy-load-image-component';

export function Corousel() {
  return (
    <div className="w-full">
      <div className="carousel h-80 w-full">
        <div id="item1" className="carousel-item w-full">
          <LazyLoadImage src="/banner1.webp" className="w-full object-cover" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <LazyLoadImage src="/banner2.webp" className="w-full object-cover" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <LazyLoadImage src="/banner3.webp" className="w-full object-cover" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <LazyLoadImage src="/banner4.webp" className="w-full object-cover" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
      </div>
    </div>
  );
}
