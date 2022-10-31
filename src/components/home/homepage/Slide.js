import React, { useContext } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { GlobalState } from '../../../GlobalState'
// import img1 from '../image/img5A.jpg';
// import img2 from '../image/imgBozo.png';

function HomeSlide() {
  const state = useContext(GlobalState)
  const [slides] = state.slideAPI.slides
  // console.log("slide nè : ", slides)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="homesld w-full bg-[#2f2f2f]">
      <Slider  {...settings}>
        {
          slides.map(slide =>
            <div className="h-[30rem] w-full" key={slide._id}>
              <img src={slide.images.url} alt="" className="h-full mx-auto" />
            </div>
          )
        }
      </Slider>
    </div>
  );
}

export default HomeSlide;
