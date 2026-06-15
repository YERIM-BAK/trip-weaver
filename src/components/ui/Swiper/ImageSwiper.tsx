"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface SpotImage {
  originimgurl: string;
  imgname: string;
  serialnum: string;
}

interface Props {
  images: SpotImage[];
  fallback?: string;
}

export default function ImageSwiper({ images, fallback }: Props) {
  const list =
    images.length > 0
      ? images
      : fallback
        ? [{ originimgurl: fallback, imgname: "", serialnum: "fallback" }]
        : [];

  if (list.length === 0) return null;

  return (
    <div className="imageSwiper">
      <Swiper
        modules={[Pagination]}
        pagination={{ type: "fraction" }}
        slidesPerView={1}
        style={{ width: "100%" }}
      >
        {list.map((img) => (
          <SwiperSlide key={img.serialnum}>
            <div className="imageSwiperSlide">
              <img src={img.originimgurl} alt={img.imgname} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
