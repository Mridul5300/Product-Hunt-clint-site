
import { Link } from "react-router-dom";
import Cupon from "../../Cupon/Cupon";
import Tranding from "../../Trending Page/Tranding";
import Fetured from "../Fetureds/Fetured";
import Banner from "./Banner/Banner";


const Home = () => {


     return (
          <div>
               <Banner></Banner>
               <div>
                    <Fetured></Fetured>
               </div>
               <div>
                    <Tranding></Tranding>
               </div>
               

               <div className="mt-3 mb-3">
                    <Cupon></Cupon>
               </div>

          </div>
     );
};

export default Home;