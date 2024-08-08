import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
  const productdetail = useLoaderData();
  const { user } = useContext(AuthContext);
  const { _id, vote, SoftwareImage, SoftwareName, Tags, SoftwareDescription, ExternalLink } = productdetail;
  const [newrating, setNewRating] = useState(0);
  const [voteCount, setVoteCount] = useState(vote);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  const ReviewData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/review/${_id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  useEffect(() => {
    ReviewData();
    const intervalTime = setInterval(ReviewData, 60000); 
    return () => clearInterval(intervalTime); 
  },[_id]);

  const handleVote = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${_id}/vote`, {
        method: 'POST'
      });
      if (response.ok) {
        setVoteCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/products/${_id}/report`, {
        method: 'POST'
      });
      if (response.ok) {
        setReportSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    const form = event.target;
    const reviewData = {
      name: user?.displayName,
      review: form.review.value,
      rating: newrating,
      photoURL: user?.photoURL,
      productId: _id
    };

    try {
      const response = await fetch('http://localhost:5000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        toast.success("Review Submitted Successfully");
        form.reset();
        setNewRating(0);
        ReviewData(); 
      } else {
        toast.error("Review Submission Failed");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Review Submission Failed");
    }
  };

  return (
    <div className="rounded-md mb-2 mt-2 p-4 bg-white shadow-md">
      {/* Product Details Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold">Product Details</h3>
        <img src={SoftwareImage} alt={SoftwareName} className="w-64 h-auto mt-4 rounded-md" />
        <h2 className="text-2xl font-semibold mt-2">{SoftwareName}</h2>
        <p className="text-gray-700 mt-2">{SoftwareDescription}</p>
        <div className="mt-2">
          <a href={ExternalLink} className="text-blue-500">{ExternalLink}</a>
        </div>
        <div className="flex flex-wrap mt-2">
          {Array.isArray(Tags) && Tags.length > 0 ? (
            Tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No tags available</span>
          )}
        </div>
        <button onClick={handleVote} className="bg-blue-500 text-white font-semibold px-4 py-2 rounded mt-4">
          Upvote <span className="ml-2">{voteCount}</span>
        </button>
      </div>

      {/* Reports Section */}
      <div className="p-4">
        <button
          onClick={handleReport}
          className={`btn mt-4 ${reportSubmitted ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {reportSubmitted ? 'Reported' : 'Report'}
        </button>
        {reportSubmitted && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            <strong className="font-bold">Reported!</strong>
            <span className="block sm:inline"> The product has been reported successfully.</span>
          </div>
        )}
      </div>

      {/* Post Review Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold">Post Review</h3>
        <form onSubmit={handleSubmitReview} className="mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <img
              className="w-12 h-12 rounded-full"
              alt="User Avatar"
              src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
            />
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mb-4">
            <textarea
              className="textarea textarea-bordered w-full h-24"
              name="review"
              placeholder="Your Review"
              required
            ></textarea>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={24}
                className={`cursor-pointer ${index < newrating ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => setNewRating(index + 1)}
              />
            ))}
          </div>
          <button type="submit" className="btn bg-blue-500 text-white w-full">
            Submit Review
          </button>
        </form>
      </div>
      
      {/* Reviews Section */}
      <div className="p-4 border-2 border-black">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="mt-4 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="bg-gray-200 w-[400px] p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={review.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <h4 className="font-bold">{review.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaStar size={20} className="text-yellow-500" />
                    <span className="text-xl font-bold">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductDetails;
