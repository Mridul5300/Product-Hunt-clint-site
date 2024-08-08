import { PiCaretUpDuotone } from "react-icons/pi";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useState } from "react";
import PrivateRoute from "../../Routes/PrivateRoutes/PrivateRoute";


const FeruredCard = ({ fetureCard }) => {
  const { _id, SoftwareImage, SoftwareName, Tags, SoftwareDescription, Timestamp, vote } = fetureCard; 
  const [voteCount, setVoteCount] = useState(vote);


  const handleVote = async () => {
    try {
      const response = await fetch(`http://localhost:5000
/products/${_id}/vote`, {
        method: 'POST'
      });
      if (response.ok) {
        setVoteCount(prevCount => prevCount + 1); 
      }
    } catch (error) {
      console.error('Error:', error);
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
              <div className="flex items-center">
                <PrivateRoute>
                <button onClick={handleVote} className="btn bg-green-400 text-white flex items-center p-2 rounded-lg hover:bg-green-500 transition-colors duration-300">
                  <PiCaretUpDuotone className="text-2xl" />
                  <span className="ml-2">{voteCount}</span>
                </button>
                </PrivateRoute>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
FeruredCard.propTypes = {
  fetureCard: PropTypes.object
};

export default FeruredCard;