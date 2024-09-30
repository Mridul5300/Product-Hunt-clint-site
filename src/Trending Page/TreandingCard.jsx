// import axios from "axios";
// import { useEffect, useState } from "react";
// import { PiCaretCircleUpDownDuotone} from "react-icons/pi";
// import { Link } from "react-router-dom";
// import PropTypes from 'prop-types';

// const TreandingCard = ({ trending}) => {
//      const { _id, SoftwareImage, SoftwareName, Tags, SoftwareDescription, Timestamp, vote } = trending ;
//     //  const [voteCount, setVoteCount] = useState(vote || 0); // Start voting from 1
//     //  const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(vote >= 5); // Disable if vote count is 5 or more
//     //  const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(vote === 0);  // Initially disable downvote if vote is 0
//     const [upvoteCount, setUpvoteCount] = useState(vote || 0); // Initial upvote count
//     const [downvoteCount, setDownvoteCount] = useState(0); // Initial downvote count
//     const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(vote >= 5); // Disable if upvote count is 5 or more
//     const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(downvoteCount === 0);  // Disable downvote if count is 0
//     //  const handleVote = async (voteType) => {
//     //    try {
//     //      const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
//     //        voteType // Pass 'upvote' or 'downvote'
//     //      });
   
//     //      if (response.status === 200) {
//     //        if (voteType === 'upvote') {
//     //          if (voteCount < 5) {
//     //            setVoteCount(prevCount => prevCount + 1);
//     //            setIsDownvoteDisabled(false); // Enable downvote
//     //            if (voteCount + 1 === 5) {
//     //              setIsUpvoteDisabled(true); // Disable upvote if count reaches 5
//     //            }
//     //          }
//     //        } else if (voteType === 'downvote') {
//     //          if (voteCount > 0) {
//     //            setVoteCount(prevCount => prevCount - 1);
//     //            setIsUpvoteDisabled(false); // Enable upvote
//     //            if (voteCount - 1 === 0) {
//     //              setIsDownvoteDisabled(true); // Disable downvote if count reaches 0
//     //            }
//     //          }
//     //        }
//     //      }
//     //    } catch (error) {
//     //      console.error('Error:', error);
//     //    }
//     //  };
//     const handleVote = async (voteType) => {
//       try {
//         const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
//           voteType, // 'upvote' বা 'downvote' পাঠানো হবে
//         });
    
//         if (response.status === 200) {
//           const updatedProduct = response.data.vote;
    
//           if (voteType === 'upvote') {
//             if (upvoteCount < 5) {
//               setUpvoteCount(prevCount => prevCount + 1); // আপভোট বাড়ানো হবে
//               setIsDownvoteDisabled(false); // ডাউনভোট সক্রিয় হবে
//               if (upvoteCount + 1 === 5) {
//                 setIsUpvoteDisabled(true); // আপভোট ৫ হলে নিষ্ক্রিয় হবে
//               }
//             }
//           } else if (voteType === 'downvote') {
//             if (upvoteCount > 0) {
//               setUpvoteCount(prevCount => prevCount - 1); // আপভোট কমানো হবে
//               setIsUpvoteDisabled(false); // আপভোট আবার সক্রিয় হবে
//               if (upvoteCount - 1 === 0) {
//                 setIsDownvoteDisabled(true); // ডাউনভোট ০ হলে নিষ্ক্রিয় হবে
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };
    
//      return (
//       <div className="mt-4 mb-4">
//       <div className="flex w-full max-w-6xl bg-gray-100 rounded-lg mt-5 shadow-md hover:shadow-lg transition-shadow duration-300">
//         <div>
//           <img className="w-[250px] p-3 object-cover rounded-l-lg" src={SoftwareImage} alt={SoftwareName} />
//         </div>

//         <div className="flex flex-col p-8 w-full">
//           <div className="flex flex-wrap mb-4">
//             {Tags.map((tag, index) => (
//               <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                 {tag}
//               </span>
//             ))}
//           </div>
//           <Link to={`/productdetail/${_id}`} className="text-xl font-bold mb-2 text-gray-900 hover:underline">
//             {SoftwareName}
//           </Link>
//           <p className="text-gray-700 text-base mb-4">{SoftwareDescription}</p>
//           <div className="flex justify-between items-center mt-auto">
//             <p className="text-sm text-gray-600">Posted Time: {Timestamp}</p>
//             <div>
//   {/* Upvote Button */}
//   <div className="flex items-center">
//     <button
//       onClick={() => handleVote('upvote')}
//       className="btn bg-green-400 text-white flex items-center p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
//       disabled={isUpvoteDisabled} // Disable based on state
//     >
//       <PiCaretCircleUpDownDuotone className="text-2xl" />
//       <span className="ml-2">{upvoteCount}</span> {/* Display upvote count */}
//     </button>
//   </div>

//   {/* Downvote Button */}
//   <div className="flex items-center mt-2">
//     <button
//       onClick={() => handleVote('downvote')}
//       className="btn bg-red-400 text-white flex items-center p-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
//       disabled={isDownvoteDisabled} // Disable based on state
//     >
//       <PiCaretCircleUpDownDuotone className="text-2xl" />
//       <span className="ml-2">{downvoteCount}</span> {/* Display downvote count */}
//     </button>
//   </div>
// </div>

//           </div>
//         </div>
//       </div>
    
//   </div>
//      );
// };

// TreandingCard.propTypes = {
//   trending: PropTypes.object.isRequired
// }

// export default TreandingCard;

import axios from "axios";
import { useState } from "react";
import { PiCaretCircleUpDownDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TreandingCard = ({ trending }) => {
  const { _id, SoftwareImage, SoftwareName, Tags, SoftwareDescription, Timestamp, vote } = trending;
  
  const [voteCount, setVoteCount] = useState(vote || 0); // Initialize vote count
  const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(vote >= 5); // Disable if vote count is 5 or more
  const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(vote === 0); // Initially disable downvote if vote is 0

  // Handle voting logic
  const handleVote = async (voteType) => {
    try {
      const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
        voteType, // Send 'upvote' or 'downvote'
      });

      if (response.status === 200) {
        const updatedVoteCount = response.data.vote; // Get updated vote count from server

        setVoteCount(updatedVoteCount); // Update vote count locally
        setIsUpvoteDisabled(updatedVoteCount >= 5); // Disable upvote if it reaches 5
        setIsDownvoteDisabled(updatedVoteCount === 0); // Disable downvote if vote is 0
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <div className="flex w-full max-w-6xl bg-gray-100 rounded-lg mt-5 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div>
          <img className="w-[250px] p-3 object-cover rounded-l-lg" src={SoftwareImage} alt={SoftwareName} />
        </div>

        <div className="flex flex-col p-8 w-full">
          <div className="flex flex-wrap mb-4">
            {Tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {tag}
              </span>
            ))}
          </div>
          <Link to={`/productdetail/${_id}`} className="text-xl font-bold mb-2 text-gray-900 hover:underline">
            {SoftwareName}
          </Link>
          <p className="text-gray-700 text-base mb-4">{SoftwareDescription}</p>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-sm text-gray-600">Posted Time: {Timestamp}</p>

            <div>
              {/* Upvote Button */}
              <div className="flex items-center">
                <button
                  onClick={() => handleVote("upvote")}
                  className="btn bg-green-400 text-white flex items-center p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  disabled={isUpvoteDisabled} // Disable based on state
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{voteCount}</span> {/* Display vote count */}
                </button>
              </div>

              {/* Downvote Button */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleVote("downvote")}
                  className="btn bg-red-400 text-white flex items-center p-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  disabled={isDownvoteDisabled} // Disable based on state
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{voteCount}</span> {/* Display vote count */}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

TreandingCard.propTypes = {
  trending: PropTypes.object.isRequired,
};

export default TreandingCard;
