import axios from "axios";
import { useEffect, useState } from "react";
import FeruredCard from "./FeruredCard";


const Fetured = () => {
     const [feturedProducts, setFeturedProducts] = useState([]);
     const [isOpen, setIsOpen] = useState(false);

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };


     // useEffect(() => {
     //      // Fetch the featured products
     //      axios.get('http://localhost:5000
// /product')
     //        .then(result => {
     //      //     console.log(result.data);
     //          setFeturedProducts(result.data.products)
     //        })
     //        .catch(error => {
     //          console.error('Error fetching featured products:', error);
     //        });
     //    }, []);
     useEffect(() => {
          // Fetch the featured products
          axios.get('http://localhost:5000/product')
            .then(result => {
              // Sort products by timestamp (assuming timestamp field exists)
              const sortedProducts = result.data.products.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp); // Sort descending
              });
              setFeturedProducts(sortedProducts);
              console.log(sortedProducts);
              
            })
            .catch(error => {
              console.error('Error fetching featured products:', error);
            });
        }, []);
      
     
     return (
          <div>
               <div className="flex justify-between">
                         <h2 className="mt-11 ml-2 text-3xl">Lattest Fetured Product</h2>
                         <div className="relative inline-block text-left mt-11 mr-6">
                              <div>
                                   <button
                                        onClick={toggleDropdown}
                                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-red-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                   >
                                        Lattest All
                                   </button>
                              </div>
                              {isOpen && (
                                   <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                             <button
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                  role="menuitem"
                                                  onClick={() => alert('Higst 1')}
                                             >
                                                  Higest
                                             </button>
                                             <button
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                  role="menuitem"
                                                  onClick={() => alert('Higst 2')}
                                             >
                                                  Lowest
                                             </button>
                                        </div>
                                   </div>
                              )}
                         </div>
                    </div>
                    <div className="divider"></div>
               <div>
                    {
                      feturedProducts.map(fetureCard => <FeruredCard 
                         key={fetureCard._id} fetureCard={fetureCard}></FeruredCard>)
                    }
               </div>
               
          </div>
     );
};

export default Fetured;