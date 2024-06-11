import axios from "axios";
import { useEffect, useState } from "react";
import FeruredCard from "./FeruredCard";


const Fetured = () => {
     const [feturedProducts, setFeturedProducts] = useState([]);


     useEffect(() => {
          // Fetch the featured products
          axios.get('http://localhost:5000/product')
            .then(result => {
          //     console.log(result.data);
              setFeturedProducts(result.data.products)
            })
            .catch(error => {
              console.error('Error fetching featured products:', error);
            });
        }, []);
      

     return (
          <div>
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