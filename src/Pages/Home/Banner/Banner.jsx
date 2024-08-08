

const Banner = () => {
     return (
     //      <div className="p-6 py-12 bg-gray-400-600 dark:text-gray-50  style={{backgroundImage: 'url(https://i.ibb.co/pLh72hW/45184679-9150222.jpg)'}}">
     //      <div className="container mx-auto">
     //           <div className="flex flex-col lg:flex-row items-center justify-between">
     //                <h2 className="text-center text-6xl tracking-tighter font-bold">Up to
     //                     <br  className="sm:hidden" />
     //                </h2>
     //                <div className="space-x-2 text-center py-2 lg:py-0">
     //                     <span>Plus free shipping! Use code:</span>
     //                     <span className="font-bold text-lg">MAMBA</span>
     //                </div>
     //                <a href="#" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-900 dark:text-gray-50 dark:border-gray-600">Shop Now</a>
     //           </div>
     //      </div>
     // </div>
     <div 
     className="p-6 py-12 bg-gray-400-600 text-gray-50 mt-2 rounded-md"
     style={{ backgroundImage: 'url(https://i.ibb.co/pLh72hW/45184679-9150222.jpg)' }}
 >
     <div className="container mx-auto">
         <div className="flex flex-col lg:flex-row items-center justify-between">
             <h2 className="text-center text-3xl tracking-tighter w-[650px] font-bold">
             Artificial intelligence (AI) has been a buzzword in the world of technology for quite some time now. 
                 <br className="sm:hidden" />
             </h2>
             <div className="space-x-2 text-center py-2 lg:py-0">
                 <span></span>
                 <span className="font-bold text-lg"></span>
             </div>
            
         </div>
     </div>
 </div>
     );
};

export default Banner;