import toast, { Toaster } from "react-hot-toast";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCoupons = () => {
    const axiosSecure = UseAxiosSecure(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const Addcupon = form.cuponcode.value;
        const Cupondate = form.cupondate.value;
        const Description = form.description.value;
        const Numbar = form.numbar.value;
        const allcupon = { Addcupon, Cupondate, Description, Numbar };
        console.log(allcupon);

        try {
            const response = await axiosSecure.post('/addcupon', allcupon);
            console.log('Coupon added:', response.data);
            toast.success('Successfully Added Coupon!');
        } catch (error) {
            console.error('Error adding coupon:', error);
            toast.error('Failed to add coupon!');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Coupon Code:</label>
                    <input 
                        type="text" 
                        name='cuponcode'
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date:</label>
                    <input 
                        type="date" 
                        name='cupondate'
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea 
                        name='description'
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount Amount:</label>
                    <input 
                        type="number" 
                        name='numbar'
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Add Coupon
                </button>
            </form>
            <Toaster/>
        </div>
    );
};

export default AddCoupons;
