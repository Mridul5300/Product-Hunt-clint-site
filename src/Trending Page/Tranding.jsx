
import { useEffect, useState } from "react";
import AxiosPublic from "../Pages/hooks/AxiosPublic";
import TreandingCard from "./TreandingCard";
import { Link } from "react-router-dom";

const Tranding = () => {
    const [trendings, setTrendings] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");

    useEffect(() => {
        const DataFetch = async () => {
            const response = await AxiosPublic().get('/trending', {
                params: selectedSort ? { sort: selectedSort } : {}

            });
            //   console.log(response.data);

            setTrendings(response.data);
        };
        DataFetch();
    }, [selectedSort]);

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
        //  console.log(event.target.value);

    };

    return (
        <div>
            <div>
                <div className="mt-9 p-3">
                    <div className="flex justify-between">
                        <h2 className="text-3xl">Our Trending Product</h2>
                        <div>
                            <select className="border-2  border-green-500 p-2" onChange={handleSortChange}>
                                <option value="">Sort By Vote</option>
                                <option value="desc">High Vote</option>
                                <option value="asc">Low Vote</option>
                            </select>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div>
                        {trendings.slice(0, 6).map(trending => (
                            <TreandingCard key={trending._id} trending={trending} />
                        ))}
                    </div>
                </div>
            </div>
            <Link to={'/product'}>
                <button
                    className="rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <span className="relative">See More</span>
                </button>
            </Link>
        </div>
    );
};

export default Tranding;


