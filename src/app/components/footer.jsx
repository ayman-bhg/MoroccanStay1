import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { BrandLockup } from "./brand-logo";
import { BRAND_NAME, BRAND_EMAIL } from "../brand";
export function Footer() {
    return (<footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-12 mb-8">
          
          <div className="col-span-1">
            <div className="mb-4">
              <BrandLockup variant="light"/>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Réservation d’hôtels, riads et resorts au Maroc — villes impériales, côte atlantique et montagnes.
            </p>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" viewTransition className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/guide" viewTransition className="hover:text-white transition-colors">Tourist Guides</Link>
              </li>
              <li>
                <Link to="/admin" viewTransition className="hover:text-white transition-colors">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/" viewTransition className="hover:text-white transition-colors">Browse Hotels</Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2563EB]"/>
                <span>{BRAND_EMAIL}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2563EB]"/>
                <span>+212 5 22 12 34 56</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB]"/>
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 {BRAND_NAME}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>);
}

