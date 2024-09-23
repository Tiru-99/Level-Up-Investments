"use client"


const logos = [
    "images/Frame 20.png",
    "images/Frame 21.png",
    "images/Frame 22.png",
    "images/Frame 23.png",
    "images/Frame 24.png",
    "images/Frame 25.png",
    "images/Frame 26.png",
    "images/Frame 27.png",
    "images/Frame 28.png",
    "images/Frame 29.png",
    "images/Frame 30.png",
    "images/Frame 31.png",
    "images/Frame 32.png",
    "images/Frame 33.png",
    "images/Frame 34.png",
    "images/Frame 35.png"
   
];

const LogoMarquee = () => {
    return (
        <div className="marquee-container overflow-hidden whitespace-nowrap">
            <div className="marquee-content flex items-center space-x-8 animate-marquee bg-gray-100">
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        className="h-20 sm:h-28 w-auto sm:mt-10 sm:mb-10"
                        
                    />
                ))}
                {/* Duplicate the logo set here for a seamless loop */}
                {logos.map((logo, index) => (
                    <img
                        key={`duplicate-${index}`}
                        src={logo}
                        alt={`Logo ${index + 1}`}
                        className="h-20 w-auto"
                        
                    />
                ))}
            </div>
        </div>
    );
};


export default LogoMarquee;
