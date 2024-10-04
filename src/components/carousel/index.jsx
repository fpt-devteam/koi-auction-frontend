import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Carousel() {
  return (
    <>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="carousel"
      >
        <SwiperSlide>
          <img src="src/assets/login/koibanner2.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="src/assets/login/koibanner.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
