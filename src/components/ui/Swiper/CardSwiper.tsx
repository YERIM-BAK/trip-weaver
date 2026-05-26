"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

interface CardSwiperProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  className?: string;
}

export default function CardSwiper<T>({
  items,
  renderItem,
  keyExtractor,
  spaceBetween = 12,
  slidesPerView = "auto",
  className,
}: CardSwiperProps<T>) {
  return (
    <Swiper
      modules={[FreeMode]}
      freeMode
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      style={{ width: "100%" }}
      className={className}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={keyExtractor(item)} style={{ width: "auto" }}>
          {renderItem(item, idx)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
