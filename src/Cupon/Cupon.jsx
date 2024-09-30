import { useQuery } from "@tanstack/react-query";
import AxiosPublic from "../Pages/hooks/AxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

const Cupon = () => {
  const axiosPublic = AxiosPublic();
  const { data: cupon = [] } = useQuery({
    queryKey: ['cupon'],
    queryFn: async () => {
      const res = await axiosPublic.get('/cupon');
      // console.log(res.data);
      
      return res.data;
    }
  });

  return (
    <div className="w-full h-[200px] flex justify-center items-center text-white bg-slate-800">
      <Swiper
        modules={[Autoplay]}
        className="mySwiper w-full h-[200px]"  
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
      >
        {cupon.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="h-full w-full flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold mb-4">{item.Addcupon}</h2>
              <p className="text-lg mb-2">Date: {item.Cupondate}</p>
              <p className="text-lg mb-2">Description: {item.Description}</p>
              <p className="text-lg">Number: {item?.Numbar}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cupon;
