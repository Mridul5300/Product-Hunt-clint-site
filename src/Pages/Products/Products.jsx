import { useEffect, useState } from "react";
import AllProductCard from "./AllProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const Products = () => {
     const [products, setProducts] = useState([]);
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [searchBar, setSearchBar] = useState("");
     const itemsPerPage = 6;

     const pagination = {
          clickable: true,
          renderBullet: function (index, className) {
               return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
     };

     useEffect(() => {
          const Products = async () => {
               const response = await fetch(`http://localhost:5000/product?page=${page}&limit=${itemsPerPage}&search=${searchBar}`);
               const data = await response.json();
               setProducts(data.products);
               setTotalPages(data.totalPages);
          };

          Products();
     }, [page, searchBar]);

     const handleSearch = (e) => {
          e.preventDefault();
          const searchText=e.target.search.value;
          setSearchBar(searchText)
          console.log(searchText);
          setPage(1); // Reset to the first page when a new search is performed
     };

     return (
          <div>
               <div className="mt-2 mb-3">
               {/* <h2 className="text-3xl text-center">Products:{products.length}</h2> */}
               <h2 className="text-3xl text-center">Products: {products.length}</h2>
               </div>
               <div>
                    <form  onSubmit={handleSearch} className="max-w-md mx-auto">
                         <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                         <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                   <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                   </svg>
                              </div>
                              <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search " required />
                              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                         </div>
                    </form>
               </div>
               <div>
                    <Swiper
                         pagination={pagination}
                         modules={[Pagination]}
                         className="mySwiper"
                         onSlideChange={(SwiperSlide) => setPage(SwiperSlide.activeIndex + 1)}

                    >
                         <div>
                              {Array.from({ length: totalPages }).map((_, index) => (
                                   <SwiperSlide className="mb-7" key={index} >
                                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                             {products.map(product => (
                                                  <AllProductCard key={product._id} product={product} />
                                             ))}
                                        </div>
                                   </SwiperSlide>
                              ))}
                              {/* {Array.from({ length: totalPages }).map((_, index) => (
                                   <SwiperSlide className="" key={index}   >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                             {products.map(product => (
                                                  <AllProductCard key={product._id} product={product} />
                                             ))}
                                        </div>
                                   </SwiperSlide>
                              ))}
                              {Array.from({ length: totalPages }).map((_, index) => (
                                   <SwiperSlide className="" key={index} >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                             {products.map(product => (
                                                  <AllProductCard key={product._id} product={product} />
                                             ))}
                                        </div>
                                   </SwiperSlide>
                              ))}
                              {Array.from({ length: totalPages }).map((_, index) => (
                                   <SwiperSlide className="" key={index} >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                             {products.map(product => (
                                                  <AllProductCard key={product._id} product={product} />
                                             ))}
                                        </div>
                                   </SwiperSlide>
                              ))}
                              {Array.from({ length: totalPages }).map((_, index) => (
                                   <SwiperSlide className="" key={index} >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                             {products.map(product => (
                                                  <AllProductCard key={product._id} product={product} />
                                             ))}
                                        </div>
                                   </SwiperSlide>
                              ))} */}
                         </div>
                    </Swiper>

               </div>
          </div>
     );
};

export default Products;

