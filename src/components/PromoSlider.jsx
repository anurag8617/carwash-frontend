import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const promoSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=60&w=500",
    title: "Flat 50% Off",
    subtitle: "On your first dry cleaning order!",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543857182-68106299b6b2?auto=format&fit=crop&q=60&w=500",
    title: "Subscription Plans",
    subtitle: "Save more with our monthly packages.",
  },
  {
    image:
      "https://media.istockphoto.com/id/451803261/photo/car-washing.webp?a=1&b=1&s=612x612&w=0&k=20&c=qzHUWIlIheYtyp-nuUUk0oHd1NOFjk5maotyfnDDJV4=",
    title: "Refer & Earn",
    subtitle: "Get credits for every friend you refer.",
  },
];

export default function PromoSlider() {
  return (
    <div className="mb-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.15}
        centeredSlides={true}
        loop={false} // ✅ disable loop to avoid warnings
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        speed={800}
      >
        {promoSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <h3 className="text-xl font-bold">{slide.title}</h3>
                <p className="text-sm">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
