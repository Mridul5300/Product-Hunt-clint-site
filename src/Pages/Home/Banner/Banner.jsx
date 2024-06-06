import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Banner = () => {
     return (
          <div className='container pb-7 px-5  mx-auto'>
           <Swiper className="mySwiper ">
        <SwiperSlide >
      
        </SwiperSlide>
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://i.ibb.co/n7kQx9S/vita-vilcina-Kt-Oid0-FLjq-U-unsplash.jpg)'}}>
               <div className="hero-overlay bg-opacity-60"></div>
               <div data-aos="fade-down" className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                         <h1 className="mb-5 text-5xl font-bold">Your Dream Hotel</h1>
                         <p className="mb-5">The global travel landscape is constantly evolving, influenced by factors such as economic shifts, geopolitical developments, and health crises.</p>
                    </div>
               </div>
          </div>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
          </div>
     );
};

export default Banner;