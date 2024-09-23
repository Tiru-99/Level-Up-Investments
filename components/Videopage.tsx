import Navbar from "./Navbar";

const Videopage = () => {
    return (
        <>
            <div className="w-full h-[80vh] relative">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Navbar Component */}
                <div className="absolute top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>

                {/* Text Section */}
                <div className="absolute bottom-20 left-4 right-4 md:left-20 md:right-20 text-white text-4xl md:text-6xl tracking-wider text-left md:text-left">
                    <div className="font-extralight">
                        <i>The Art of <span className="font-semibold">Elevated</span></i>
                    </div>

                    <div className="tracking-wider font-light">
                        <i>living</i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Videopage;
