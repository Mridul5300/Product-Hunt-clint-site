import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { PiCaretCircleUpDownDuotone } from "react-icons/pi";

const ProductDetails = () => {
  const productdetail = useLoaderData();
  const { user } = useContext(AuthContext);
  const { _id, vote, SoftwareImage, SoftwareName, Tags, SoftwareDescription, ExternalLink } = productdetail;
  const [newrating, setNewRating] = useState(0);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [voteCount, setVoteCount] = useState(vote || 1);
  const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(vote >= 5); 
  const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(vote === 0);

  const handleVote = async (voteType) => {
    try {
      const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
        voteType 
      });
      console.log(response.data);
      
      if (response.status === 200) {
        if (voteType === 'upvote') {
          if (voteCount < 5) {
            setVoteCount(prevCount => prevCount + 1);
            setIsDownvoteDisabled(false); 
            if (voteCount + 1 === 5) {
              setIsUpvoteDisabled(true); 
            }
          }
        } else if (voteType === 'downvote') {
          if (voteCount > 0) {
            setVoteCount(prevCount => prevCount  -1);
            setIsUpvoteDisabled(false); 
            if (voteCount  -1 === 0) {
              setIsDownvoteDisabled(true); 
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
   
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

  
      const response = await axios.post('http://localhost:5000/review',reviewData);


      if (response.status) {
        toast.success("Review Submitted Successfully");
        form.reset();
        setNewRating(0);
        ReviewData(); 
      } else {
        toast.error("Review Submission Failed");
      }
  
  };

  return (
<div className="max-w-6xl mx-auto rounded-lg  mb-8">
  {/* Product Details Section */}
  <div className="p-6">
    <h3 className="text-2xl font-bold text-center mb-4">Product Details</h3>
    <img src={SoftwareImage} alt={SoftwareName} className="w-[300px] h-[300px] flex justify-center mx-auto object-cover rounded-md " />
    <h2 className="text-3xl font-semibold text-center text-gray-800">{SoftwareName}</h2>
    <p className="text-gray-600 text-center mt-2 text-base">{SoftwareDescription}</p> {/* Adjusted for medium size */}
    <div className="mt-4 text-center">
      <Link to={ExternalLink} className="text-blue-600 hover:underline">
        {ExternalLink}
      </Link>
    </div>
    <div className="flex flex-wrap justify-center mt-4">
      {Array.isArray(Tags) && Tags.length > 0 ? (
        Tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded-full shadow"
          >
            {tag}
          </span>
        ))
      ) : (
        <span className="text-gray-500">No tags available</span>
      )}
    </div>
    <div className="flex items-center justify-center gap-8 mt-6">
      {/* Upvote Button */}
      <div>
        <button
          onClick={() => handleVote('upvote')}
          className="btn bg-green-500 text-white flex items-center p-3 rounded-full shadow hover:bg-green-600 transition-all duration-300"
          disabled={isUpvoteDisabled}
        >
          <PiCaretCircleUpDownDuotone className="text-2xl" />
          <span className="ml-2">{voteCount}</span>
        </button>
      </div>

      {/* Downvote Button */}
      <div>
        <button
          onClick={() => handleVote('downvote')}
          className="btn bg-red-500 text-white flex items-center p-3 rounded-full shadow hover:bg-red-600 transition-all duration-300"
          disabled={isDownvoteDisabled}
        >
          <PiCaretCircleUpDownDuotone className="text-2xl" />
          <span className="ml-2">{voteCount}</span>
        </button>
      </div>
    </div>
  </div>

  {/* Reports Section */}
  <div className="p-6 border-t border-gray-200">
    <button
      onClick={handleReport}
      className={`btn mt-4 ${reportSubmitted ? 'bg-red-500' : 'bg-green-500'} text-white rounded-md px-4 py-2 shadow hover:opacity-90 transition-all duration-300`}
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

  {/* Review Section */}
  <div className="border-t border-gray-200 p-6">
    {/* Post Review Section */}
    <h3 className="text-2xl font-bold text-center mb-4">Post Review</h3>
    <form onSubmit={handleSubmitReview} className="mt-4">
      <div className="flex items-center space-x-4 mb-4">
        <img
          className="w-12 h-12 rounded-full border-2 border-gray-300"
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
          className="textarea textarea-bordered w-1/2 h-28 border border-gray-300 rounded-lg text-base" // Adjusted for medium size
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
      <button type="submit" className="btn bg-blue-600 text-white w-1/2 rounded-md px-5 py-3 text-base shadow hover:bg-blue-700 transition-all duration-300"> {/* Adjusted for medium size */}
        Submit Review
      </button>
    </form>

    {/* Reviews Section */}
    <div className="mt-11">
      <h3 className="text-xl font-semibold text-center ">Reviews</h3>
      <div className="mt-4 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className=" p-4 rounded-md ">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={review.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <h4 className="font-bold">{review.name}</h4>
                  <div className="flex items-center space-x-2">
                  <FaStar size={20} className="text-yellow-500" />
                  <span className="text-xl font-bold">{review.rating}</span>
                </div>
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
  </div>
  <Toaster />
</div>




  );
};

export default ProductDetails;
