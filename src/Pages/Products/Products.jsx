import { useEffect, useState } from "react";
import AllProductCard from "./AllProductCard";


const Products = () => {
     const [products, setProducts] = useState([]);

     useEffect( () =>{
          fetch('http://localhost:5000/product')
          .then( res => res.json())
          .then( data => {
               console.log(data);
               setProducts(data)
          })

     },[])
     return (
          <div>
               <h2 className="text-3xl text-center">Products:{products.length}</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {
                         products.map(product => <AllProductCard key={product._id} product={product}></AllProductCard>)
                    }
               </div>
          </div>
     );
};

export default Products;