import { PiCaretUpDuotone } from "react-icons/pi";
import PropTypes from 'prop-types';


const FeruredCard = ({fetureCard}) => {
     const {SoftwareImage, SoftwareName, Tags,SoftwareDescription,Timestamp} = fetureCard
     return (
          <div className="mt-4 mb-4">
          <div className="flex w-full max-w-6xl  bg-gray-100 rounded-lg mt-5 ">
      <div>
        <img className="w-[250px] p-3 object-cover bg-none" src={SoftwareImage} alt={SoftwareName} />
      </div>
     
      <div  className="flex flex-col p-8">
      <div className="flex flex-wrap">
          {Tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">{SoftwareName}</h2>
        <p className="text-gray-700 text-base mb-4">{SoftwareDescription}</p>
        <div className="flex justify-between flex-wrap items-center">
            <p className="text-sm">Posted Time: {Timestamp}</p>
            <div className="flex items-center">
                <button className="flex items-center flex-wrap justify-end p-2">
                    <PiCaretUpDuotone className="text-2xl" />
                </button>
            </div>
        </div>
      </div>
    </div> 
          </div>
     );
};
FeruredCard.propTypes = {
  fetureCard : PropTypes.object
};

export default FeruredCard;