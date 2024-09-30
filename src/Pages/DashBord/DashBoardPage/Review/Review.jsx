import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Review = () => {
  const [datareview, setDataReview] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      
        const response = await UseAxiosSecure().get("/managereviews");

        setDataReview(response.data);
    };

    fetchData();
  }, []);

  const handleStatusChange = async (_id, status) => {
    try {
      const response = await UseAxiosSecure().patch(`/managereview/${_id}`, {
        status: status,
      });

      if (response.status === 200) {
        // Update the local state to reflect the new status
        setDataReview((prevData) =>
          prevData
            .map((product) =>
              product._id === _id ? { ...product, status: status } : product
            )
          
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-gray-200">
            <tr>
              <th>Index No</th>
              <th>Product Name</th>
              <th>Detail Button</th>
              <th>Featured Button</th>
              <th>Accept Button</th>
              <th>Reject Button</th>
            </tr>
          </thead>
          <tbody>
            {datareview.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.SoftwareName}</td>
                <td>
                  <Link
                    to={`/productdetail/${product._id}`}
                    className="btn btn-sm btn-link btn-circle text-red-400"
                  >
                    Details..
                  </Link>
                </td>
                <td>
                  <Link to={'/'} className="btn btn-sm btn-link btn-circle text-red-400">
                    Featured..
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusChange(product._id, "Accepted")}
                    disabled={product.status === "Accepted"}
                    className={` btn-sm btn-link btn-circle ${
                      product.status === "Accepted" ? "text-green-600" : "text-green-400"
                    }`}
                  >
                    {product.status === "Accepted" ? "Accepted" : "Accept"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusChange(product._id, "Rejected")}
                    disabled={product.status === "Rejected"}
                    className={` btn-sm btn-link btn-circle ${
                      product.status === "Rejected" ? "text-red-600" : "text-red-400"
                    }`}
                  >
                    {product.status === "Rejected" ? "Rejected" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Review;
