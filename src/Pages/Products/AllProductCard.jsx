import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { PiCaretCircleUpDownDuotone } from 'react-icons/pi';
import { Link } from 'react-router-dom';


const AllProductCard = ({product}) => {
     const{_id, SoftwareName,SoftwareImage, Tags, vote}=product; 
     const [voteCount, setVoteCount] = useState(vote || 0);
     const [isUpvoteDisabled, setIsUpvoteDisabled] = useState(vote >= 5); 
     const [isDownvoteDisabled, setIsDownvoteDisabled] = useState(vote === 0);
   
     const handleVote = async (voteType) => {
       try {
         const response = await axios.post(`http://localhost:5000/products/${_id}/vote`, {
           voteType 
         });
   
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
               setVoteCount(prevCount => prevCount - 1);
               setIsUpvoteDisabled(false); 
               if (voteCount - 1 === 0) {
                 setIsDownvoteDisabled(true); 
               }
             }
           }
         }
       } catch (error) {
         console.error('Error:', error);
       }
     };
     return (
          <div>
            <div className="text-xl font-bold mb-2 text-gray-900 hover:underline">
            <div className="card bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto my-4">
               <div className="w-full h-60 overflow-hidden">
               <img className="w-full h-full object-cover" src={SoftwareImage} alt={SoftwareName} />
               </div>
               <div className="p-4">
               <Link to={`/productdetail/${_id}`}  className="text-3xl font-bold mb-2">{SoftwareName}</Link>
               <div className="flex flex-wrap mb-2">
               {Array.isArray(Tags) ? (
              Tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No tags available</span>
            )}
               </div>
               <div className="flex  items-center justify-end gap-7 mt-5">
              
              {/* Upvote Button */}
              <div className="flex items-center">
                <button
                  onClick={() => handleVote('upvote')}
                  className="btn bg-green-400 text-white flex items-center p-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  disabled={isUpvoteDisabled} // Disable based on state
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{voteCount}</span>
                </button>
              </div>

              {/* Downvote Button */}
              <div className="flex items-center">
                <button
                  onClick={() => handleVote('downvote')}
                  className="btn bg-red-400 text-white flex items-center p-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  disabled={isDownvoteDisabled} // Disable based on state
                >
                  <PiCaretCircleUpDownDuotone className="text-2xl" />
                  <span className="ml-2">{voteCount}</span>
                </button>
              </div>
            </div>  
               </div>
               </div>
          </div>
          
          </div>
     );
};

AllProductCard.propTypes = {
     product: PropTypes.object
   };

export default AllProductCard;