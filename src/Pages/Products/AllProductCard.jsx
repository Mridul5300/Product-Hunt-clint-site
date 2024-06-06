import PropTypes from 'prop-types';


const AllProductCard = ({product}) => {
     const{ SoftwareName,SoftwareImage, Tags, Upvote}=product
     return (
          <div>
               <div className="card bg-white shadow-md rounded-lg overflow-hidden max-w-sm mx-auto my-4">
               <div className="w-full h-60 overflow-hidden">
               <img className="w-full h-full object-cover" src={SoftwareImage} alt={SoftwareName} />
               </div>
               <div className="p-4">
               <h2 className="text-3xl font-bold mb-2">{SoftwareName}</h2>
               <div className="flex flex-wrap mb-2">
                    {Tags.map((tag, index) => (
                    <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                    >
                    {tag}
                    </span>
                    ))}
               </div>
               <div className="flex justify-between items-center">
                    <div className="text-gray-700 text-sm">{Upvote} Upvotes</div>
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-300">
                    Upvote
                    </button>
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