// import { useEffect, useState } from "react";
// import AllProductCard from "./AllProductCard";
// import AxiosPublic from "../hooks/AxiosPublic";

// const Products = () => {
//     const [products, setProducts] = useState([]);
//     const [page, setPage] = useState(1);
//     const [allpages, setAllPages] = useState(1);
//     const [searchBar, setSearchBar] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const itemsPerPage = 6;

    
//     useEffect(() => {
//         const SearchProduct = async () => {
//             if (searchBar) {
//                 try {
//                     const response = await AxiosPublic().get(`/product/search?search=${searchBar}`);
//                     setProducts(response.data.products || []);
//                 } catch (error) {
//                     console.error('Failed to fetch search results:', error.message);
//                     setProducts([]);
//                 }
//             }
//         };

//         SearchProduct();
//     }, [searchBar]);

//     useEffect(() => {
//         if (!searchBar) {
//             const Product = async () => {
//                 try {
//                     const response = await AxiosPublic().get(`/product?page=${page}&limit=${itemsPerPage}`);
//                     setProducts(response.data.products || []);
//                     setAllPages(response.data.allpages || 1);
//                 } catch (error) {
//                     console.error('Failed to fetch products:', error.message);
//                     setProducts([]);
//                     setAllPages(1);
//                 }
//             };

//             Product();
//         }
//     }, [page, searchBar]);


//     const handleSearch = (e) => {
//         e.preventDefault();
//         const searchText = e.target.search.value;
//         setSearchBar(searchText);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage > 0 && newPage <= allpages) {
//             setPage(newPage);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4">
//             <form onSubmit={handleSearch} className="max-w-md mx-auto mb-6">
//                 <div className="relative flex flex-col md:flex-row">
//                     <input
//                         type="search"
//                         id="default-search"
//                         name="search"
//                         className="block w-full p-4 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 md:rounded-l-lg md:rounded-r-none"
//                         placeholder="Search"
//                         value={searchBar}
//                         onChange={(e) => setSearchBar(e.target.value)}
//                     />
//                     {/* <button type="submit" className="bg-blue-700 text-white rounded-lg px-4 py-2 md:rounded-l-none md:rounded-r-lg md:ml-0 md:pl-4 mt-2 md:mt-0">Search</button> */}
//                 </div>
//             </form>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {products.map(product => (
//                     <AllProductCard key={product._id} product={product} />
//                 ))}
//             </div>

            
//             {!searchBar && (
//                 <div className="flex justify-center mt-6 mb-5 flex-wrap">
//                     <button 
//                         onClick={() => handlePageChange(page - 1)} 
//                         className={`px-4 py-2 mx-1 rounded-md ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`} 
//                         disabled={page === 1}
//                     >
//                         Previous
//                     </button>
//                     {Array.from({ length: allpages }).map((_, index) => (
//                         <button 
//                             key={index + 1} 
//                             onClick={() => handlePageChange(index + 1)} 
//                             className={`px-4 py-2 mx-1 rounded-md ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                     <button 
//                         onClick={() => handlePageChange(page + 1)} 
//                         className={`px-4 py-2 mx-1 rounded-md ${page === allpages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`} 
//                         disabled={page === allpages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Products;
import { useEffect, useState } from "react";
import AllProductCard from "./AllProductCard";
import AxiosPublic from "../hooks/AxiosPublic";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [allpages, setAllPages] = useState(1);
    const [searchBar, setSearchBar] = useState("");
    // const itemsPerPage = 6;

    useEffect(() => {
        const SearchProduct = async () => {
            if (searchBar) {
                
                    const response = await AxiosPublic().get(`/product/search?search=${searchBar}`);
                    setProducts(response.data.products || []);
                }
        };

        SearchProduct();
    }, [searchBar]);

    useEffect(() => {
        if (!searchBar) {
            const Product = async () => {
                
                    const response = await AxiosPublic().get(`/product?page=${page}`);
                    setProducts(response.data.products || []);
                    // console.log(response.data);
                    
                    setAllPages(response.data.totalPages); 
            };

            Product();
        }
    }, [page, searchBar]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= allpages) {
            setPage(newPage);
        }
    };

    return (
        <div className="container mx-auto px-4">
            
            <form className="max-w-md mx-auto mb-6">
                <div className="relative flex flex-col md:flex-row">
                    <input
                        type="search"
                        id="default-search"
                        name="search"
                        className="block w-full p-4 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 md:rounded-l-lg md:rounded-r-none"
                        placeholder="Search"
                        value={searchBar}
                        onChange={(e) => setSearchBar(e.target.value)}
                    />
                </div>
            </form>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <AllProductCard key={product._id} product={product} />
                ))}
            </div>

            
            {!searchBar && (
                <div className="flex justify-center mt-6 mb-5 flex-wrap border">
                    <button 
                        onClick={() => handlePageChange(page - 1)} 
                        className={`px-4 py-2 mx-1 rounded-md ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`} 
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    {Array.from({ length: allpages }).map((_, index) => (
                        <button 
                            key={index + 1} 
                            onClick={() => handlePageChange(index + 1)} 
                            className={`px-4 py-2 mx-1 rounded-md ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button 
                        onClick={() => handlePageChange(page + 1)} 
                        className={`px-4 py-2 mx-1 rounded-md ${page === allpages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-500 hover:text-white'}`} 
                        disabled={page === allpages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;

// useEffect(() => {
//     const SearchProduct = async () => {
//         if (searchBar) {
//             try {
//                 const response = await AxiosPublic().get(`/product/search?search=${searchBar}`);
//                 setProducts(response.data.products || []);
//             } catch (error) {
//                 console.error('Failed to fetch search results:', error.message);
//                 setProducts([]);
//             }
//         }
//     };

//     SearchProduct();
// }, [searchBar]);

// useEffect(() => {
//     if (!searchBar) {
//         const Product = async () => {
//             try {
//                 const response = await AxiosPublic().get(`/product?page=${page}&limit=${itemsPerPage}`);
//                 setProducts(response.data.products || []);
//                 setAllPages(response.data.totalPages || 6); 
//             } catch (error) {
//                 console.error('Failed to fetch products:', error.message);
//                 setProducts([]);
//                 setAllPages(1);
//             }
//         };

//         Product();
//     }
// }, [page, searchBar]);
