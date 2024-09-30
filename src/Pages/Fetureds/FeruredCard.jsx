
import { PiCaretCircleUpDownDuotone } from "react-icons/pi";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const FeruredCard = ({ fetureCard }) => {
  const { _id, SoftwareImage, SoftwareName, Tags, SoftwareDescription, Timestamp, vote } = fetureCard;
  
  
  // const [upvoteCount, setUpVoteCount] = useState(vote || 0); 
  // const [downvoteCount, setUpVoteCount] = useState(vote || 0); 
  // const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
  // const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);
  

  
  // const handleVote = async (voteType) => {
  //     const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
  //       voteType 
  //     });
  
  //     if (response.status) {
  //       setUpVoteCount(prevCount => {
  //         let newVoteCount = prevCount;
      
    
  //         if (voteType === 'upvote') {
        
  //           if (prevCount < 5) {
  //             newVoteCount = prevCount + 1; 
  //           } else {
          
  //             console.log("Maximum upvote limit reached"); 
  //           }
  //         } 
      
  
        
  //         if (voteType === 'downvote') {
  //           if (prevCount > 0) {
  //             newVoteCount = prevCount - 1; 
  //           } else {
            
  //             console.log("Cannot downvote further, already at 0");
  //           }
  //         }      

  //         setIsUpvoteDisabled(newVoteCount === 5); 
  //         setIsDownvoteDisabled(newVoteCount === 0); 
      
  //         return newVoteCount; 
  //       });
  //     }
      
  // }
  // const [upvoteCount, setUpVoteCount] = useState(vote || 0)
  // const [downvoteCount, setDownVoteCount] = useState(vote|| 0);
  // const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
  // const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);

  // const handleVote = async (voteType) => {
  //   const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
  //     voteType 
  //   });
  
  //   if (response.status) {
  //     if (voteType === 'upvote') {
  //       setUpVoteCount((prevCount) => {
  //         let newVoteCount = prevCount < 5 ? prevCount + 1 : prevCount;
  
  //         // Set the disabled state based on the new count
  //         setIsUpvoteDisabled(newVoteCount === 5);
  //         return newVoteCount;
  //       });
  //     } else if (voteType === 'downvote') {
  //       setDownVoteCount((prevCount) => {
  //         let newVoteCount = prevCount > 0 ? prevCount - 1 : prevCount;
  
  //         // Set the disabled state based on the new count
  //         setIsDownvoteDisabled(newVoteCount === 0);
  //         return newVoteCount;
  //       });
  //     }
  //   }
  // };
  const [upvoteCount, setUpvoteCount] = useState(vote || 0); // Initial upvote count
const [downvoteCount, setDownvoteCount] = useState(vote || 0); // Initial downvote count
const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);

// Handle voting logic
// const [upvoteCount, setUpvoteCount] = useState(vote?.upvotes || 0); // Initial upvote count
// const [downvoteCount, setDownvoteCount] = useState(vote?.downvotes || 0); // Initial downvote count
// const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(false);
// const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(false);

// Handle voting logic
const handleVote = async (voteType) => {
  // Optimistic update: Change the count immediately on button click
  if (voteType === 'upvote' && !isUpvoteDisabled) {
    setUpvoteCount((prevCount) => {
      let newVoteCount = prevCount + 1;
      if (newVoteCount >= 5) {
        setIsUpvoteDisabled(true); // Disable upvote button after 5 upvotes
      }
      setIsDownvoteDisabled(false); // Re-enable downvote if upvoted
      return newVoteCount;
    });
  } else if (voteType === 'downvote' && !isDownvoteDisabled) {
    setDownvoteCount((prevCount) => {
      let newVoteCount = prevCount > 0 ? prevCount - 1 : 0;
      if (newVoteCount === 0) {
        setIsDownvoteDisabled(true); // Disable downvote if count reaches 0
      }
      setIsUpvoteDisabled(false); // Re-enable upvote if downvoted
      return newVoteCount;
    });
  }

  // Send the vote to the server
  try {
    const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
      voteType,
    });

    if (response.status !== 200) {
      // Handle server errors by reverting the optimistic update (if needed)
      if (voteType === 'upvote') {
        setUpvoteCount((prevCount) => prevCount - 1); // Revert the upvote count
        setIsUpvoteDisabled(false); // Re-enable upvote if an error occurs
      } else if (voteType === 'downvote') {
        setDownvoteCount((prevCount) => prevCount + 1); // Revert the downvote count
        setIsDownvoteDisabled(false); // Re-enable downvote if an error occurs
      }
    }
  } catch (error) {
    console.error("Error voting:", error);
    // Revert optimistic updates if the request fails
    if (voteType === 'upvote') {
      setUpvoteCount((prevCount) => prevCount - 1); // Revert upvote
      setIsUpvoteDisabled(false); // Re-enable the upvote button
    } else if (voteType === 'downvote') {
      setDownvoteCount((prevCount) => prevCount + 1); // Revert downvote
      setIsDownvoteDisabled(false); // Re-enable the downvote button
    }
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
              <div className="flex items-center">
                <button
                  onClick={() => handleVote('upvote')}
                  className="btn bg-green-400 text-white flex items-center p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  disabled={isUpvoteDisabled} 
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{upvoteCount}</span>
                </button>
              </div>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleVote('downvote')}
                  className="btn bg-red-400 text-white flex items-center p-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  disabled={isDownvoteDisabled} 
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{downvoteCount}</span>
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

FeruredCard.propTypes = {
  fetureCard: PropTypes.object.isRequired
};

export default FeruredCard;

