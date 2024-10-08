import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { TagsInput } from 'react-tag-input-component';
import { imageUpload } from '../../../api/utiles';
import { AuthContext } from '../../../../Provider/AuthProvider';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const MyProductTable = ({ card, handleDelete }) => {
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState(card?.Tags || []);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleUpdate = async (e, _id) => {
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
    const Timestamp = new Date().toISOString();

    try {
      let image_url = card.SoftwareImage; // Use existing image if no new one is uploaded
      if (SoftwareImage) {
        image_url = await imageUpload(SoftwareImage);
      }

      // Prepare the product data object
      const productdata = {
        SoftwareName,
        SoftwareImage: image_url,
        SoftwareDescription,
        ExternalLink,
        Tags: selected,
        Timestamp,
        host,
      };

      // Send the PUT request using axios
      const response = await axios.put(`http://localhost:5000/myproduct/${_id}`, productdata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.modifiedCount > 0) {
        toast.success('Updated Successfully');
      } else {
        toast.error('Update Failed');
      }

      setModalOpen(false); // Close the modal after successful update
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the product');
    }
  };

  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='block relative'>
                <img
                  alt='profile'
                  src={card?.SoftwareImage}
                  className='mx-auto object-cover rounded h-10 w-15'
                />
              </div>
            </div>
            <div className='ml-3'>
              <p className='text-gray-900 whitespace-no-wrap'>{card?.SoftwareName}</p>
            </div>
          </div>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{card?.vote}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{card?.Statuse}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button onClick={() => handleDelete(card?._id)} className='btn'>
            <FaTrashAlt className='text-2xl' />
          </button>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button
            className='btn rounded-full bg-green-200'
            onClick={() => setModalOpen(true)}
          >
            <FaEdit />
          </button>
        </td>
      </tr>

      {isModalOpen && (
        <dialog open className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box'>
            <form
              onSubmit={(e) => handleUpdate(e, card?._id)}
              className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'
            >
              <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
                Update Product
              </h2>

              {/* Product Owner Info */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2 rounded-md'>
                  Product Owner Info
                </label>
                <div className='flex flex-col items-center mb-4 bg-gray-100 p-4'>
                  <img
                    className='w-24 h-24 rounded-full'
                    alt='Tailwind CSS Navbar component'
                    src={user?.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'}
                  />
                  <div className='w-full'>
                    <div className='mb-2'>
                      <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor='ownerName'>
                        Owner Name
                      </label>
                      <input
                        type='text'
                        id='ownerName'
                        value={user?.displayName || ''}
                        disabled
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200'
                      />
                    </div>
                    <div className='mb-2'>
                      <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor='ownerEmail'>
                        Owner Email
                      </label>
                      <input
                        type='email'
                        id='ownerEmail'
                        value={user?.email || ''}
                        disabled
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-200'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Name */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productName'>
                  Product Name
                </label>
                <input
                  type='text'
                  id='productName'
                  defaultValue={card?.SoftwareName || ''}
                  name='SoftwareName'
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
              </div>

              {/* Product Image */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='productImage'>
                  Product Image
                </label>
                <input
                  type='file'
                  id='productImage'
                  name='SoftwareImage'
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
              </div>

              {/* Description */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                  Description
                </label>
                <textarea
                  id='description'
                  name='SoftwareDescription'
                  defaultValue={card?.SoftwareDescription || ''}
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
                  rows='5'
                ></textarea>
              </div>

              {/* Tags */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tags'>
                  Add New Tag
                </label>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name='Tags'
                  placeHolder='Enter New Tag'
                />
                <pre className='border-2 p-2 mt-2'>{JSON.stringify(selected)}</pre>
              </div>

              {/* External Link */}
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='externalLink'>
                  External Link
                </label>
                <input
                  type='url'
                  id='externalLink'
                  name='ExternalLink'
                  defaultValue={card?.ExternalLink || ''}
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
              </div>

              {/* Modal Actions */}
              <div className='flex justify-between'>
                <button type='button' className='btn btn-secondary' onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type='submit' className='btn btn-primary'>
                  Update Product
                </button>
              </div>
            </form>
          </div>
          {/* <form method='dialog'>
            <button className='btn'>Close</button>
          </form> */}
        </dialog>
      )}
      <Toaster />
    </>
  );
};

MyProductTable.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    SoftwareName: PropTypes.string,
    SoftwareImage: PropTypes.string,
    SoftwareDescription: PropTypes.string,
    ExternalLink: PropTypes.string,
    Tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MyProductTable;
