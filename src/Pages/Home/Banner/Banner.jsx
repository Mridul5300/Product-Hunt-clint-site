const Banner = () => {
    return (
        <div
            className="p-6 py-12 bg-gray-400 text-gray-50 mt-2 rounded-md"
            style={{ backgroundImage: 'url(https://i.ibb.co/pLh72hW/45184679-9150222.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left lg:space-x-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight lg:w-1/2 w-full mb-4 lg:mb-0">
                        Artificial intelligence (AI) has been a buzzword in the world of technology for quite some time now.
                    </h2>
                    <div className="space-x-2 text-lg lg:text-xl font-bold">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
