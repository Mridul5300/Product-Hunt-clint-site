
import { useEffect, useState } from "react";
import FeruredCard from "./FeruredCard";
import AxiosPublic from "../hooks/AxiosPublic";
import { RiArrowDropDownLine } from "react-icons/ri";

const Fetured = () => {
    const [feturedProducts, setFeturedProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isOpen, setIsOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState('latest'); 
        
     
    

    useEffect(() => {
        const DataFetch = async () => {
            const response = await AxiosPublic().get('/fetured');
            let sortedProducts = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            if (sortOrder === 'latest') {
                sortedProducts = sortedProducts.reverse(); 
            }
            setFeturedProducts(sortedProducts);
            // console.log(response.data);
            
        };
        DataFetch();
    }, [sortOrder]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSort = (order) => {
        setSortOrder(order);
        setIsOpen(false); 
    };

    const showMore = () => {
        setVisibleCount(feturedProducts.length);
    };

    return (
        <div>
              <div className="flex justify-between">
                <h2 className="mt-11 ml-2 text-3xl">Latest Featured Product</h2>
                <div className="relative inline-block w-28  text-left mt-11 mr-6">
                    <div>
                        <button
                            onClick={toggleDropdown}
                            className="inline-flex justify-center   w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 p-9 text-xl font-medium text-black hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                        >
                            {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
                            <RiArrowDropDownLine className="text-4xl font-bold -my-px"/>
                        </button>
                    </div>
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                    onClick={() => handleSort('latest')}
                                >
                                    Latest
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                    onClick={() => handleSort('oldest')}
                                >
                                    Oldest
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="divider"></div>
            <div>
                {
                    feturedProducts.slice(0, visibleCount).map(fetureCard => (
                        <FeruredCard key={fetureCard._id} fetureCard={fetureCard} />
                    ))
                }
            </div>
            {visibleCount < feturedProducts.length && (
                <div className="flex justify-start ">
                    <button 
                        onClick={showMore} 
                        className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                    >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">See More</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Fetured;

