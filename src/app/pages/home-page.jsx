import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, MapPin, Calendar, Users, Star, DollarSign, RotateCcw, Lock, Phone, Percent, Quote } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { hotels } from "../data/hotels";
import { formatMad } from "../lib/currency";
import { useAuth } from "../hooks/useAuth";
export function HomePage() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const [city, setCity] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2");
    useEffect(() => {
        if (!role) {
            navigate("/select-role", { replace: true });
        }
    }, [role, navigate]);
    const searchTo = useMemo(() => {
        const params = new URLSearchParams();
        if (city.trim())
            params.set("city", city.trim());
        if (checkIn)
            params.set("checkIn", checkIn);
        if (checkOut)
            params.set("checkOut", checkOut);
        if (guests)
            params.set("guests", guests);
        const qs = params.toString();
        return qs ? `/search?${qs}` : "/search";
    }, [city, checkIn, checkOut, guests]);
    return (<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      
      <div className="relative h-[800px] bg-cover bg-center" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIyNTcxNHww&ixlib=rb-4.1.0&q=80&w=1920')`,
        }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Find your stay in Morocco</h1>
            <p className="text-xl mb-12 text-gray-200">
              Hotels, riads and resorts — from the medina to the Atlantic, prices in dirhams (Dh)
            </p>

            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-4 gap-4">
                
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 dark:text-gray-300 mb-2">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"/>
                    <Input type="text" placeholder="Where to?" value={city} onChange={(e) => setCity(e.target.value)} className="pl-11 h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"/>
                  </div>
                </div>

                
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 dark:text-gray-300 mb-2">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"/>
                    <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-11 h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"/>
                  </div>
                </div>

                
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 dark:text-gray-300 mb-2">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"/>
                    <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-11 h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white"/>
                  </div>
                </div>

                
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 dark:text-gray-300 mb-2">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"/>
                    <Input type="number" placeholder="2" value={guests} onChange={(e) => setGuests(e.target.value)} className="pl-11 h-14 rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400" min="1"/>
                  </div>
                </div>
              </div>

              
              <Button asChild className="w-full mt-6 h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl text-lg">
                <Link to={searchTo} viewTransition>
                  <Search className="w-5 h-5 mr-2"/>
                  Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Hotels to discover</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Selection of major Moroccan cities — sample rates per night</p>
        </div>

        
        <div className="grid grid-cols-3 gap-8">
          {hotels.map((hotel) => (<div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              
              <div className="relative h-64 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover"/>
              </div>

              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-[#2563EB] text-white px-2 py-1 rounded-lg text-sm">
                    <Star className="w-4 h-4 fill-current"/>
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                  <MapPin className="w-4 h-4 mr-1"/>
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatMad(hotel.price)}</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm"> / nuit</span>
                  </div>
                  <Link to={`/hotel/${hotel.id}`} viewTransition>
                    <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6">
                      View Offer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>))}
        </div>
      </div>

      
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      
      <div className="py-12"></div>

      
      {/* Why Choose Us Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Choose MoroccanStay</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Discover the perfect blend of traditional Moroccan hospitality and modern booking convenience</p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            <div className="group h-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Best Price Guarantee</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">Exclusive rates you won't find anywhere else, with transparent pricing in Moroccan Dirhams</p>
                <div onClick={() => window.open('#', '_blank')} className="mt-4 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors cursor-pointer">
                  Learn more →
                </div>
              </div>
            </div>
            
            <div className="group h-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <RotateCcw className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Flexible Cancellation</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">Free cancellation up to 24 hours before check-in, because plans can change</p>
                <div className="mt-4 text-green-600 dark:text-green-400 font-semibold text-sm group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                  Policy details →
                </div>
              </div>
            </div>
            
            <div className="group h-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Payment</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">Bank-level encryption and multiple payment options including local Moroccan methods</p>
                <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Security info →
                </div>
              </div>
            </div>
            
            <div className="group h-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">Local Moroccan team available round the clock in Arabic, French, and English</p>
                <div className="mt-4 text-orange-600 dark:text-orange-400 font-semibold text-sm group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                  Contact us →
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      
      <div className="py-16"></div>

      
      {/* Special Offers Banner */}
      <div className="relative py-20 overflow-hidden" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdGVsfGVufDB8fHx8MTc3MTIyNzEzMnw&ixlib=rb-4.1.0&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JvY2NhbiUyMGJlYWNoJTIwc3VtbWVyfGVufDF8fHx8MTc3MTIyNzA1NXww&ixlib=rb-4.1.0&q=80&w=1920" 
            alt="Moroccan Beach" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-purple-900/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Percent className="w-5 h-5" />
                LIMITED TIME OFFER
              </div>
              <h3 className="text-5xl font-bold text-white mb-4">Summer Paradise Awaits</h3>
              <p className="text-xl text-blue-100 mb-8">Get 20% off on all summer bookings along the beautiful Moroccan coast</p>
              <div className="flex items-center gap-4 text-white mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Valid until Sept 30</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Agadir, Essaouira & more</span>
                </div>
              </div>
              <Link to="/search" viewTransition>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8 py-4 text-lg font-semibold">
                  Claim Your Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      
      <div className="py-16"></div>

      
      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Stories from Our Guests</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Real reviews from real travelers who discovered the magic of Morocco through MoroccanStay</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />)}
                  <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm font-medium">5.0</span>
                </div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed">"Very easy booking and great hotel options. The process was smooth and customer service was excellent. Will definitely book again!"</p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhY2V8ZW58MHx8fHx8MTc3MTIyNzEwMHww&ixlib=rb-4.1.0&q=80&w=150" 
                  alt="Sarah Johnson" 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900/20"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Sarah Johnson</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Casablanca, 2 weeks ago</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />)}
                  <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm font-medium">5.0</span>
                </div>
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed">"Found the perfect riad in Marrakech! The prices were great and the booking process was incredibly simple. Highly recommended!"</p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBmYWNlfGVufDB8fHx8fDE3NzEyMjcxMDB8MA&ixlib=rb-4.1.0&q=80&w=150" 
                  alt="Mohammed Alami" 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-green-100 dark:ring-green-900/20"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Mohammed Alami</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Marrakech, 3 weeks ago</p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />)}
                  <span className="ml-2 text-gray-600 dark:text-gray-300 text-sm font-medium">5.0</span>
                </div>
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 italic leading-relaxed">"Amazing experience! The hotels were exactly as described and the support team helped us throughout our stay. Merci beaucoup!"</p>
              <div className="flex items-center gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhY2V8ZW58MHx8fHx8MTc3MTIyNzEwMHww&ixlib=rb-4.1.0&q=80&w=150" 
                  alt="Emma Dubois" 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-900/20"
                />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Emma Dubois</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Fes, 3 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);
}

