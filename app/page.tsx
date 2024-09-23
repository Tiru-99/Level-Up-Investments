import PreloaderWrapper from "@/components/Preloaderwrapper";
import Videopage from "@/components/Videopage";
import LogoMarquee from "@/components/Logomarquee";
import PropertyCarousel from "@/components/PropertyCarousel";
import Mapcomp from "@/components/Mapcomp";
import Footer from "@/components/Footer";
import PropertyEnquiryForm from "@/components/PropertyEnquireForm";


export default function HomePage() {
  return (
    <PreloaderWrapper>
      <Videopage/>
      
      <LogoMarquee/>
      <div className="mt-24 md:scale-100">
        <PropertyEnquiryForm/>
      </div>

      <div className="bg-gray-50">
        <div className="text-4xl font-semibold sm:ml-36 sm:mb-12 ml-6 mt-20 pt-20 text-gray-700 mb-8 ">
            Listed Properties
        </div>
    
        <PropertyCarousel/>
      
        
      </div>

      <div className="pt-24 bg-gray-50">
        <Mapcomp/>
      </div>

      <div className="md:flex md:justify-center px-4 pt-36 md:gap-24 bg-gray-50" >
          <div className="max-w-xl">
              <div className="text-5xl font-bold" id="about-us">
                About Us
              </div>

              <div className="pt-3 text-xl font-light text-gray-800">
                At Level Up Investments, we bring "The Art of Elevated Living" to life by offering 
                personalized real estate services tailored to your unique needs. Based in Dubai,
                we specialize in helping clients find exceptional properties and investment opportunities. 
                Our goal is to make every step of your real estate journey seamless and fulfilling, providing 
                expert guidance, personalized attention, and complete confidentiality. Whether you're looking to 
                invest or find the perfect place to call home, we are here to help you reach your goals with a focus
                on quality and excellence.
              </div>

              <div className="w-full mt-5">
                <img src="/images/sunset.jpg"></img>
              </div>

          </div>
          
          <div className="max-w-sm mt-1 ">
              <img src="/images/bhurj.jpg" className="h-[100%]"></img>
          </div>
       
      </div>

      <Footer/>

    </PreloaderWrapper>
  );
}
