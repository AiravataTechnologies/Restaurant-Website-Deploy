import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function Contact() {
  const { ref: sectionRef } = useScrollAnimation();
  const { ref: infoRef } = useScrollAnimation();
  const { ref: mapRef } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in" ref={sectionRef}>
          <span className="text-accent font-script text-3xl">Get in Touch</span>
          <h2 className="font-display text-4xl font-bold mt-2 mb-6">Contact Us</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 fade-in" ref={infoRef}>
            <div className="bg-neutral p-8 rounded-lg shadow-sm h-full">
              <h3 className="font-display text-2xl font-semibold mb-6">Visit Us</h3>
              
              <div className="flex flex-col space-y-6 mb-8">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-accent text-xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="font-display font-semibold mb-1">Our Location</h4>
                    <p className="text-gray-600">123 Gourmet Avenue<br />Culinary District<br />Cityville, CV 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-envelope text-accent text-xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="font-display font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-600">info@gusto-restaurant.com<br />events@gusto-restaurant.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-phone-alt text-accent text-xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="font-display font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-display font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-primary bg-opacity-10 text-accent hover:bg-accent hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-primary bg-opacity-10 text-accent hover:bg-accent hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-primary bg-opacity-10 text-accent hover:bg-accent hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-primary bg-opacity-10 text-accent hover:bg-accent hover:text-white transition-all w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-yelp"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 fade-in" ref={mapRef}>
            <div className="rounded-lg overflow-hidden shadow-sm h-full">
              {/* Google Maps integration would be here */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1641354099128!2d-73.98468812434826!3d40.758895787822445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDE1JzMyLjAiTiA3M8KwNTcnMDYuMCJX!5e0!3m2!1sen!2sus!4v1656958001076!5m2!1sen!2sus" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="h-96"
                title="Restaurant Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
