import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const MangeCupon = () => {

     const axiosSecure = UseAxiosSecure()

     const { data: cupons = [], refetch } = useQuery({
          queryKey: ['cupons'],
          queryFn: async () => {
               const res = await axiosSecure.get('/manegcupon')
               return res.data;
          }
     });

     const handleDellet = cupon => {
          axiosSecure.delete(`/manegcupon/${cupon._id}`)
               .then(res => {
                    refetch()
                    toast.success('Cupon  Deleted')


                    return res.data

               })
     };

     const handleupdate = async (e, _id) => {
          e.preventDefault();
          const form = e.target;
          const Addcupon = form.cuponcode.value;
          const Cupondate = form.cupondate.value;
          const Description = form.description.value;
          const Numbar = form.numbar.value;
          const allcupon = { Addcupon, Cupondate, Description, Numbar };
          console.log(allcupon);
          try {

               const response = await axiosSecure.put(`/manegcupon/${_id}`, {
               });

               const data = await response.json();
               console.log(data);
               if (data.modifiedCount > 0) {
                    toast.success('Updated Successfully');
               } else {
                    toast.error('Update Failed');
               }
          } catch (err) {
               console.error(err);
               toast.error('An error occurred while updating the product');
          }
          location.reload();
     };
     return (
          <div>
               <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                         <thead>
                              <tr>
                                   <th></th>
                                   <td>Coupon Code</td>
                                   <td>Expiry Date</td>
                                   <td>Coupon code description</td>
                                   <td>Discount Amount</td>

                              </tr>
                         </thead>
                         <tbody>
                              {
                                   cupons.map((cupon, index) => <tr key={cupon._id}>
                                        <th>{index + 1}</th>
                                        <td>{cupon.Addcupon}</td>
                                        <td>{cupon.Cupondate}</td>
                                        <td>{cupon.Description}</td>
                                        <td>{cupon.Numbar}</td>

                                        <td>
                                             <button onClick={() => handleDellet(cupon)}
                                                  className="btn btn-md">
                                                  <FaTrashAlt className="text-green-900  text-xl "></FaTrashAlt>
                                             </button>
                                        </td>
                                   <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                             <span aria-hidden='true' className='absolute inset-0 opacity-50 rounded-full'></span>
                                             {/* Your text or content */}
                                        </span>

                                        <button className="btn rounded-full bg-green-200" onClick={() => document.getElementById('my_modal_5').showModal()}>
                                             <FaEdit />
                                        </button>

                                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                             <div className="modal-box relative">
                                                  {/* Close Icon */}
                                                  <button
                                                       className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                                       onClick={() => document.getElementById('my_modal_5').close()}
                                                  >
                                                       <FaTimes className="w-6 h-6" />
                                                  </button>

                                                  {/* Form content */}
                                                  <form onSubmit={(e) => handleupdate(e, cupon?._id)} className="space-y-4">
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
                                                            Update Coupon
                                                       </button>
                                                  </form>
                                             </div>
                                        </dialog>
                                   </td>

                                   </tr>)
                              }
                         </tbody>

                    </table>
               </div>
               <Toaster />
          </div>
     );
};

export default MangeCupon;

