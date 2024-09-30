
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../../Provider/AuthProvider";
// import { imageUpload } from "../../../api/utiles";
// import axios from "axios";
// import { TagsInput } from "react-tag-input-component";
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from "react-router-dom";

// const AddFrom = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [selected, setSelected] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false); // Add this state

//   const handlesubmit = async e => {
//     e.preventDefault();
//     const form = e.target;
//     const SoftwareName = form.SoftwareName.value;
//     const SoftwareImage = form.SoftwareImage.files[0];
//     const SoftwareDescription = form.SoftwareDescription.value;
//     const ExternalLink = form.ExternalLink.value;
//     const host = {
//       name: user?.displayName,
//       image: user?.photoURL,
//       email: user?.email
//     };
//     const Timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
//     console.log('Local Time in Bangladesh:', Timestamp);
    
//     try {
//       const image_url = await imageUpload(SoftwareImage);
//       const productdata = {
//         SoftwareName,
//         SoftwareImage: image_url,
//         SoftwareDescription,
//         ExternalLink,
//         Tags: selected,
//         Timestamp,
//         host,
//         isSubscribed, // Include subscription status here
//       };
      
//       const response = await axios.post('http://localhost:5000/addproduct', productdata);
//       console.log('Product added:', response.data);
//       toast.success('Successfully Added Product!');
//       navigate("/dashbord/card");
      
//     } catch (err) {
//       toast.error('Not Successfully Added Product!');
//     }
//   };

//   return (
//   <div>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
//       <div className="max-w-6xl mx-auto p-6">
//   {/* Product Owner Info */}
//   <div className="bg-white shadow-md rounded-lg border p-6 mb-8">
//     <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Owner Info</h2>
//     <div className="flex flex-col items-center space-y-4">
//       <img
//         className="w-28 h-28 rounded-full border"
//         alt="Owner"
//         src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
//       />
//       <div className="w-full">
//         <div className="mb-4">
//           <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerName">Owner Name</label>
//           <input
//             type="text"
//             id="ownerName"
//             value={user?.displayName || ""}
//             disabled
//             className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerEmail">Owner Email</label>
//           <input
//             type="email"
//             id="ownerEmail"
//             value={user?.email || ""}
//             disabled
//             className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
//           />
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Product Form */}
//   <form onSubmit={handlesubmit} className="bg-white shadow-md rounded-lg p-8">
  
    
//     {/* Product Name */}
//     <div className="mb-6">
//       <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productName">Product Name</label>
//       <input
//         type="text"
//         id="productName"
//         name="SoftwareName"
//         className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//       />
//     </div>

//     {/* Product Image */}
//     <div className="mb-6">
//       <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productImage">Product Image</label>
//       <input
//         type="file"
//         id="productImage"
//         name="SoftwareImage"
//         className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//       />
//     </div>

//     {/* Description */}
//     <div className="mb-6">
//       <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="description">Description</label>
//       <textarea
//         id="description"
//         name="SoftwareDescription"
//         className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//         rows="5"
//       ></textarea>
//     </div>

//     {/* Tags */}
//     <div className="mb-6">
//       <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="tags">Add New Tag</label>
//       <TagsInput
//         value={selected}
//         onChange={setSelected}
//         name="Tags"
//         placeHolder="Enter New Tag"
//         classNames="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//       />
//       <pre className="border-2 p-2 mt-2">{JSON.stringify(selected)}</pre>
//     </div>

//     {/* External Link */}
//     <div className="mb-6">
//       <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="externalLink">External Link</label>
//       <input
//         type="url"
//         id="externalLink"
//         name="ExternalLink"
//         className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//       />
//     </div>

//     {/* Submit Button */}
//     <div className="text-center">
//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
//       >
//         Add Product
//       </button>
//     </div>
//     <Toaster />
//   </form>
// </div>

//   </div>
  
//   );
// };

// export default AddFrom;

// import { useContext, useState } from "react";
// import { AuthContext } from "../../../../Provider/AuthProvider";
// import { imageUpload } from "../../../api/utiles";
// import axios from "axios";
// import { TagsInput } from "react-tag-input-component";
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from "react-router-dom";

// const AddFrom = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [selected, setSelected] = useState([]);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null); // For image preview

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const SoftwareName = form.SoftwareName.value;
//     const SoftwareImage = form.SoftwareImage.files[0];
//     const SoftwareDescription = form.SoftwareDescription.value;
//     const ExternalLink = form.ExternalLink.value;
//     const host = {
//       name: user?.displayName,
//       image: user?.photoURL,
//       email: user?.email,
//     };
//     const Timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

//     try {
//       const image_url = await imageUpload(SoftwareImage);
//       const productdata = {
//         SoftwareName,
//         SoftwareImage: image_url,
//         SoftwareDescription,
//         ExternalLink,
//         Tags: selected,
//         Timestamp,
//         host,
//         isSubscribed,
//       };

//       const response = await axios.post('http://localhost:5000/addproduct', productdata);
//       console.log('Product added:', response.data);
//       toast.success('Successfully Added Product!');
//       navigate("/dashbord/card");
      
//     } catch (err) {
//       toast.error('Not Successfully Added Product!');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); 
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null); 
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Product Owner Info */}
//         <div className="bg-white shadow-md rounded-lg border p-6 mb-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Owner Info</h2>
//           <div className="flex flex-col items-center space-y-4">
//             <img
//               className="w-28 h-28 rounded-full border"
//               alt="Owner"
//               src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
//             />
//             <div className="w-full">
//               <div className="mb-4">
//                 <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerName">Owner Name</label>
//                 <input
//                   type="text"
//                   id="ownerName"
//                   value={user?.displayName || ""}
//                   disabled
//                   className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerEmail">Owner Email</label>
//                 <input
//                   type="email"
//                   id="ownerEmail"
//                   value={user?.email || ""}
//                   disabled
//                   className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Form */}
//         <form onSubmit={handlesubmit} className="bg-white shadow-md rounded-lg p-8">
//           {/* Product Name */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productName">Product Name</label>
//             <input
//               type="text"
//               id="productName"
//               name="SoftwareName"
//               className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Product Image */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productImage">Product Image</label>
//             <input
//               type="file"
//               id="productImage"
//               name="SoftwareImage"
//               onChange={handleImageChange} // Handle image preview
//               className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//             {imagePreview && (
//               <div className="mt-4">
//                 <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
//                 <img src={imagePreview} alt="Preview" className="w-40 h-40 rounded-md border object-cover" />
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="SoftwareDescription"
//               className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               rows="5"
//             ></textarea>
//           </div>

//           {/* Tags */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="tags">Add New Tag</label>
//             <TagsInput
//               value={selected}
//               onChange={setSelected}
//               name="Tags"
//               placeHolder="Enter New Tag"
//               classNames="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//             <pre className="border-2 p-2 mt-2">{JSON.stringify(selected)}</pre>
//           </div>

//           {/* External Link */}
//           <div className="mb-6">
//             <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="externalLink">External Link</label>
//             <input
//               type="url"
//               id="externalLink"
//               name="ExternalLink"
//               className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
//             >
//               Add Product
//             </button>
//           </div>
//           <Toaster />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddFrom;
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { imageUpload } from "../../../api/utiles";
import axios from "axios";
import { TagsInput } from "react-tag-input-component";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

const AddForm = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [products, setProducts] = useState([]); // State to hold products
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const SoftwareName = form.SoftwareName.value;
    const SoftwareImage = form.SoftwareImage.files[0];
    const SoftwareDescription = form.SoftwareDescription.value;
    const ExternalLink = form.ExternalLink.value;
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    const Timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });

    try {
      const image_url = await imageUpload(SoftwareImage);
      const productData = {
        SoftwareName,
        SoftwareImage: image_url,
        SoftwareDescription,
        ExternalLink,
        Tags: selected,
        Timestamp,
        host,
        isSubscribed,
      };

      const response = await axios.post('http://localhost:5000/addproduct', productData);
      setProducts([...products, response.data]); // Update products state
      toast.success('Successfully Added Product!');
    
    } catch (err) {
      toast.error('Not Successfully Added Product!');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("productImage");
    fileInput.value = ""; // Reset file input
  };

  // const handleDelete = async (productId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/deleteproduct/${productId}`); // Adjust endpoint accordingly
  //     setProducts(products.filter(product => product.id !== productId)); // Update state
  //     toast.success('Product deleted successfully!');
  //   } catch (err) {
  //     toast.error('Error deleting product!');
  //   }
  // };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>
      <div className="max-w-6xl mx-auto p-6">
        {/* Product Owner Info */}
        <div className="bg-white shadow-md rounded-lg border p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Owner Info</h2>
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-28 h-28 rounded-full border"
              alt="Owner"
              src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
            />
            <div className="w-full">
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerName">Owner Name</label>
                <input
                  type="text"
                  id="ownerName"
                  value={user?.displayName || ""}
                  disabled
                  className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-semibold mb-1" htmlFor="ownerEmail">Owner Email</label>
                <input
                  type="email"
                  id="ownerEmail"
                  value={user?.email || ""}
                  disabled
                  className="block w-full p-3 border rounded-md bg-gray-200 text-gray-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="SoftwareName"
              className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Product Image */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="productImage">Product Image</label>
            <input
              type="file"
              id="productImage"
              name="SoftwareImage"
              onChange={handleImageChange}
              className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            {imagePreview && (
              <div className="relative mt-4 border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-72 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute top-0 right-0  text-black rounded-full p-1 m-1"
                >
                  <span><FiDelete className="text-2xl"/></span>
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="SoftwareDescription"
              className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              rows="5"
            ></textarea>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="tags">Add New Tag</label>
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="Tags"
              placeHolder="Enter New Tag"
              classNames="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <pre className="border-2 p-2 mt-2">{JSON.stringify(selected)}</pre>
          </div>

          {/* External Link */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="externalLink">External Link</label>
            <input
              type="url"
              id="externalLink"
              name="ExternalLink"
              className="block w-full p-3 border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md w-full transition duration-300"
            >
              Add Product
            </button>
          </div>
          <Toaster />
        </form>

        {/* Display Products with Delete Button
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products List</h2>
          <ul>
            {products.map(product => (
              <li key={product.id} className="flex justify-between items-center bg-gray-100 p-4 rounded mb-2">
                <div>
                  <h3 className="font-bold">{product.SoftwareName}</h3>
                  <p>{product.SoftwareDescription}</p>
                </div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default AddForm;

