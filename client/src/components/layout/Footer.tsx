import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-4xl font-script text-accent mr-2">Gusto</span>
              <span className="text-sm font-display tracking-widest">FINE DINING</span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              A culinary sanctuary where extraordinary flavors and impeccable service create unforgettable dining experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-accent transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-all">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-accent transition-all">
                <i className="fab fa-yelp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-accent mt-1 mr-3"></i>
                <span className="text-neutral-400">123 Gourmet Avenue, Culinary District, Cityville</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-accent mt-1 mr-3"></i>
                <span className="text-neutral-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope text-accent mt-1 mr-3"></i>
                <span className="text-neutral-400">info@gusto-restaurant.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-neutral-400">Monday - Thursday</span>
                <span className="text-accent">11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Friday - Saturday</span>
                <span className="text-accent">11:00 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Sunday</span>
                <span className="text-accent">11:00 - 23:00</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-neutral-400 mb-4">
              Subscribe to our newsletter for exclusive offers and culinary insights.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-white bg-opacity-10 border border-gray-700 rounded-l-sm focus:outline-none focus:ring-2 focus:ring-accent text-white flex-grow"
              />
              <Button type="submit" className="bg-accent hover:bg-opacity-90 transition-all text-white py-2 px-4 rounded-r-sm uppercase text-sm tracking-wider font-medium">
                <i className="fas fa-paper-plane"></i>
              </Button>
            </form>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Gusto Restaurant. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-neutral-500 hover:text-accent text-sm transition-all">Privacy Policy</a>
            <a href="#" className="text-neutral-500 hover:text-accent text-sm transition-all">Terms of Service</a>
            <a href="#" className="text-neutral-500 hover:text-accent text-sm transition-all">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
