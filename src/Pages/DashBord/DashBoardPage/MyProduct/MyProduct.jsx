import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import MyProductTable from "./MyProductTable";
import Swal from "sweetalert2";




const MyProduct = () => {
  const {user} = useContext(AuthContext)
  const [myproducts, setMyProducts] = useState([]);


  useEffect(() => {
    const Products = async () => {
      try {
        const response = await fetch(`http://localhost:5000/myproduct/${user?.email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data); // Logging the data for debugging
        setMyProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (user?.email) {
      Products();
    }
  }, [user]);
  const handleDelete = id => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Cancel this Booking Item !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
      fetch(`http://localhost:5000/product/${id}`, {
           method:'DELETE'
      })
      .then(res => res.json())
      .then(data => {
          //  console.log(data);
           if(data.deletedCount > 0){
            Swal.fire({
          title: "Cancel!",
          text: "Your Bookig Cancel.",
          icon: "success"
        });

        const remaining = myproducts.filter(booking => booking._id !== id);
        setMyProducts(remaining)
           }
      });
      }
    });
  }
     return (
          <div>
                <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Sofware name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      vote numbar
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      status
                    </th>
                    {/* <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th> */}
                    {/* <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th> */}
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Room row data */}

                 {myproducts.map((product) => (
                    <MyProductTable 
                    key={product._id} 
                    card={product}
                    handleDelete={ handleDelete}
                     />
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
          </div>
     );
};

export default MyProduct;