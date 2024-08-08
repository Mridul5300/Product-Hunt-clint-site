import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Modal from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import Payment from "./Payment";
import { useStripe } from "@stripe/react-stripe-js";

const MyProFile = () => {
     const {user} = useContext(AuthContext)
     const [isSubscribed, setIsSubscribed] = useState(false);
     const [open, setOpen] = useState(false);
     
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

     const handleSubscribe = () => {
          
          setTimeout(() => {
            setIsSubscribed(true);
          }, 2000);
        };
     return (
          <div>
          <div className="p-14 max-w-sm mx-auto  bg-white rounded-xl shadow-md space-y-10">
      <div className="flex flex-col items-center space-y-4">
        <img className="w-28 h-28 rounded-full" src={user?.photoURL} alt="User Profile" />
        <div className="text-center">
          <h2 className="text-xl font-medium text-black">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>

      {!isSubscribed ? (
          <div>
            <button
              onClick={onOpenModal}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Subscribe for $10
            </button>
            <Modal open={open} onClose={onCloseModal}  styles={{
                modal: {
                    
                  maxWidth: "800px",
                  width: "100%",
                  height:'50%'
                }
              }} center >
              <h2 className="text-lg font-semibold">
               <Payment></Payment>
              </h2>
             
            </Modal>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Verified</span>
          </div>
        )}
    </div>
    </div>
          
     );
};

export default MyProFile;