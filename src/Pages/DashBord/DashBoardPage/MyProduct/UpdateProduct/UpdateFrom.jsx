// import { useContext, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { AuthContext } from "../../../../../Provider/AuthProvider";
// import { imageUpload } from "../../../../api/utiles";
// import { TagsInput } from "react-tag-input-component";
// import axios from "axios";


//  const UpdateFrom = () => {
//      const { user } = useContext(AuthContext);
//      const [selected, setSelected] = useState(["superVison"]);

//      const handleupdate = async (e, id) => {
//           e.preventDefault();
//           const form = e.target;
//           const SoftwareName = form.SoftwareName.value;
//           const SoftwareImage = form.SoftwareImage.files[0];
//           const SoftwareDescription = form.SoftwareDescription.value;
//           const ExternalLink = form.ExternalLink.value;
//           const host = {
//               name: user?.displayName,
//               image: user?.photoURL,
//               email: user?.email
//           };
//           const Timestamp = new Date().toISOString();
      
//           try {
//               const image_url = await imageUpload(SoftwareImage);
//               const productdata = {
//                   SoftwareName,
//                   SoftwareImage: image_url,
//                   SoftwareDescription,
//                   ExternalLink,
//                   Tags: selected,
//                   Timestamp,
//                   host
//               };
      
//               const response = await axios.put(`http://localhost:5000/myproduct/${id}`, { productdata });
//               console.log(response.data);
              
//               if (response.data.modifiedCount > 0) {
//                   toast.success('Updated Successfully');
//               } else {
//                   toast.error('No changes were made');
//               }
//           } catch (err) {
//               console.error(err);
//               toast.error('Failed to update product!');
//           }
//       }
//      return (
//                <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
//                     <div className="modal-box">
//                          <h3 className="font-bold text-lg">Hello!</h3>
//                          <p className="py-4">Press ESC key or click the button below to close</p>
//                          <div className="modal-action">
//                               <form onSubmit={handleupdate} className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>

//                                    {/* Product Owner Info */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2 rounded-md">Product Owner Info</label>
//                                         <div className="flex flex-col items-center  mb-4 bg-gray-100 p-4 ">
//                                              <img className="w-24 h-24 rounded-full" alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
//                                              <div className="w-full">
//                                                   <div className="mb-2">
//                                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ownerName">
//                                                             Owner Name
//                                                        </label>
//                                                        <input
//                                                             type="text"
//                                                             id="ownerName"
//                                                             value={user?.displayName || ""}
//                                                             disabled
//                                                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 "
//                                                        />
//                                                   </div>
//                                                   <div className="mb-2">
//                                                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ownerEmail">
//                                                             Owner Email
//                                                        </label>
//                                                        <input
//                                                             type="email"
//                                                             id="ownerEmail"
//                                                             value={user?.email || ""}
//                                                             disabled
//                                                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200 "
//                                                        />
//                                                   </div>
//                                              </div>
//                                         </div>
//                                    </div>

//                                    {/* Product Name */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
//                                              Product Name
//                                         </label>
//                                         <input
//                                              type="text"
//                                              id="productName"
//                                              name="SoftwareName"
//                                              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                         />
//                                    </div>

//                                    {/* Product Image */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productImage">
//                                              Product Image
//                                         </label>
//                                         <input
//                                              type="file"
//                                              id="productImage"
//                                              name="SoftwareImage"
//                                              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                         />
//                                    </div>

//                                    {/* Description */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                                              Description
//                                         </label>
//                                         <textarea
//                                              id="description"
//                                              name="SoftwareDescription"
//                                              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                              rows="5"
//                                         ></textarea>
//                                    </div>

//                                    {/* Tags */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
//                                              Add New Tag
//                                         </label>

//                                         <TagsInput
//                                              value={selected}
//                                              onChange={setSelected}
//                                              name="Tags"
//                                              placeHolder="Enter New Tag"
//                                         />
//                                         <pre className="border-2 p-2 mt-2" >{JSON.stringify(selected)}</pre>
//                                    </div>

//                                    {/* External Link */}
//                                    <div className="mb-6">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="externalLink">
//                                              External Link
//                                         </label>
//                                         <input
//                                              type="url"
//                                              id="externalLink"
//                                              name="ExternalLink"
//                                              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                         />
//                                    </div>

//                                    {/* Submit Button */}
//                                    <div className="flex items-center justify-between">
//                                         <button
//                                              type="submit"
//                                              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                         >
//                                              UpDate
//                                         </button>
//                                    </div>
//                                    <Toaster></Toaster>
//                               </form>
//                          </div>
//                     </div>
//                </dialog>
          
//     );
// };

// export default UpdateFrom;