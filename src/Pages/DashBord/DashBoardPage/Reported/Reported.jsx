import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const Reported = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: repoted = [] , refetch } = useQuery({
    queryKey: ['repoted'],
    queryFn: async () => {
         const res = await axiosSecure.get('/reported')
        //  console.log(res.data);
         
         return res.data;
    }
});

const  handleDellet = report => {
  axiosSecure.delete(`/reported/${report._id}`)
  .then( res => {
       refetch()
       toast.success('User Deleted')
       return res.data
       
  })
}

     return (
          <div>
               <div className="overflow-x-auto">
               <table className="table table-zebra">
          <thead className="bg-gray-200">
            <tr>
              <th>Index No</th>
              <th>Product Name</th>
              <th>Detail Button</th>
              <th>Product Dellet</th>
            </tr>
          </thead>
          <tbody>
            {repoted.map((report, index) => (
              <tr key={report._id}>
                <th>{index + 1}</th>
                <td>{report.SoftwareName}</td>
                <td>
                  <Link
                    to={`/productdetail/${report._id}`}
                    className="btn btn-sm btn-link btn-circle text-red-400"
                  >
                    Details..
                  </Link>
                </td>
                <td>
                <button onClick={() => handleDellet(report)}
                                                  className="btn bg-orange-200 btn-md"> 
                                                  <FaTrashAlt className="text-red-600 text-xl "></FaTrashAlt>    
                                        </button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Toaster/>
            </div>
          </div>
     );
};

export default Reported;