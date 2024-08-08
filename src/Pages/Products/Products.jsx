
// import { useEffect, useState } from "react";
// import AllProductCard from "./AllProductCard";

// // import axios from "axios";
// import AxiosPublic from "../hooks/AxiosPublic";



// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchBar, setSearchBar] = useState("");
//     const itemsPerPage = 6;

//     // useEffect(() => {
//     //     const ProductHandle = async () => {
//     //         try {
//     //             const searchQuery = searchBar ? `&search=${searchBar}` : "";
//     //             const response = await axios.get(`AxiosPublic/product?page=${page}&limit=${itemsPerPage}${searchQuery}`);
//     //             setProducts(response.data.products);
//     //             setTotalPages(response.data.totalPages);
//     //         } catch (error) {
//     //             console.error('Failed to fetch products:', error.message);
//     //         }
//     //     };

//     //     ProductHandle();
//     // }, [page, searchBar]);
//     useEffect(() => {
//         const ProductHandle = async () => {
//             try {
//                 const searchQuery = searchBar ? `&search=${searchBar}` : "";
//                 const response = await AxiosPublic().get(`/product?page=${page}&limit=${itemsPerPage}${searchQuery}`);
                
//                 // Ensure the response has the expected structure
//                 if (response.data && response.data.products && Array.isArray(response.data.products) && response.data.totalPages) {
//                     setProducts(response.data.products);
//                     setTotalPages(response.data.totalPages);
//                 } else {
//                     console.error('Unexpected response structure:', response.data);
//                     setProducts([]);
//                     setTotalPages(1);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch products:', error.message);
//                 setProducts([]);
//                 setTotalPages(1);
//             }
//         };

//         ProductHandle();
//     }, [page, searchBar]);
// console.log('this is code',AxiosPublic);
//     const handleSearch = (e) => {
//         e.preventDefault();
//         const searchText = e.target.search.value;
//         setSearchBar(searchText);
//         setPage(1);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };


//     return (
        
//         <div>
//         <div className="mt-2 mb-3">
//             <h2 className="text-3xl text-center">Products: {products.length}</h2>
//         </div>
//         <div>
//             <form onSubmit={handleSearch} className="max-w-md mx-auto">
//                 <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                             <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                         </svg>
//                     </div>
//                     <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
//                     <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                 </div>
//             </form>
//         </div>
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map(product => (
//                 <AllProductCard key={product._id} product={product} />
//             ))}
//         </div>
//         <div className="flex justify-center mt-6 mb-5 ">
//             <button 
//                 onClick={() => handlePageChange(page - 1)} 
//                 className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
//                 disabled={page === 1}
//                 aria-label="Previous page"
//             >
//                 Previous
//             </button>
//             {Array.from({ length: totalPages }).map((_, index) => (
//                 <button 
//                     key={index + 1}
//                     onClick={() => handlePageChange(index + 1)}
//                     className={`px-4 py-2 mx-1 ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'} rounded-md`}
//                     aria-label={`Page ${index + 1}`}
//                 >
//                     {index + 1}
//                 </button>
//             ))}
//             <button 
//                 onClick={() => handlePageChange(page + 1)} 
//                 className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
//                 disabled={page === totalPages}
//                 aria-label="Next page"
//             >
//                 Next
//             </button>
//         </div>
//     </div>
//     );
// };

// export default Products;

// import { useEffect, useState } from "react";
// import AllProductCard from "./AllProductCard";
// import AxiosPublic from "../hooks/AxiosPublic";

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchBar, setSearchBar] = useState("");
//     const itemsPerPage = 6;

//     useEffect(() => {
//         const ProductHandle = async () => {
        
//                 const searchQuery = searchBar ? `&search=${searchBar}` : "";
//                 // console.log(searchQuery);
                
//                 const response = await AxiosPublic().get(`/product?${page}${itemsPerPage}${searchQuery}`);
//                     console.log("wil never",response.data);
                    
//                 if (response.data && response.data.products && Array.isArray(response.data.products) && response.data.totalPages) {
//                     setProducts(response.data.products);
//                     // console.log(response.data);
                    
//                     setTotalPages(response.data.totalPages);
//                 } else {
//                     console.error('Unexpected response structure:', response.data);
//                     setProducts([]);
//                     setTotalPages(1);
//                 }
            
//         };

//         ProductHandle();
//     }, [page, searchBar]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         const searchText = e.target.search.value;
//         console.log(
//             searchText
//         );
        
//         setSearchBar(searchText);
//         setPage(1);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= totalPages) {
//             setPage(newPage);
//         }
//     };

//     return (
//         <div>
//             <div className="mt-2 mb-3">
//                 <h2 className="text-3xl text-center">Products: {products.length}</h2>
//             </div>
//             <div>
//                 <form onSubmit={handleSearch} className="max-w-md mx-auto">
//                     <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                             </svg>
//                         </div>
//                         <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
//                         <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                     </div>
//                 </form>
//             </div>
//             <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map(product => (
//                     <AllProductCard key={product._id} product={product} />
//                 ))}
//             </div>
//             <div className="flex justify-center mt-6 mb-5">
//                 <button 
//                     onClick={() => handlePageChange(page - 1)} 
//                     className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
//                     disabled={page === 1}
//                     aria-label="Previous page"
//                 >
//                     Previous
//                 </button>
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                     <button 
//                         key={index + 1}
//                         onClick={() => handlePageChange(index + 1)}
//                         className={`px-4 py-2 mx-1 ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'} rounded-md`}
//                         aria-label={`Page ${index + 1}`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//                 <button 
//                     onClick={() => handlePageChange(page + 1)} 
//                     className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
//                     disabled={page === totalPages}
//                     aria-label="Next page"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Products;
// ?page=${page}&limit=${itemsPerPage}${searchQuery}

// ..........................................................This new code

import AllProductCard from "./AllProductCard";
import AxiosPublic from "../hooks/AxiosPublic";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchBar, setSearchBar] = useState("");
    const itemsPerPage = 6;

    useEffect(() => {
        const ProductHandle = async () => {
            const searchQuery = searchBar ? `&search=${searchBar}` : "";
            const response = await AxiosPublic().get(`/product?page=${page}&limit=${itemsPerPage}${searchQuery}`);

            const productData = response?.data;
            const productArray = productData?.products;
            const total = productData?.totalPages;

            setProducts(Array.isArray(productArray) ? productArray : []);
            setTotalPages(total || 1);
        };

        ProductHandle();
    }, [page, searchBar]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearchBar(searchText);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <div className="mt-2 mb-3">
                <h2 className="text-3xl text-center">Products: {products.length}</h2>
            </div>
            <div>
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <AllProductCard key={product._id} product={product} />
                ))}
            </div>
            <div className="flex justify-center mt-6 mb-5">
                <button 
                    onClick={() => handlePageChange(page - 1)} 
                    className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                    disabled={page === 1}
                    aria-label="Previous page"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button 
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'} rounded-md`}
                        aria-label={`Page ${index + 1}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(page + 1)} 
                    className={`px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                    disabled={page === totalPages}
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
