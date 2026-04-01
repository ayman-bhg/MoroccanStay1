import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
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

  // Redirect to role selection if no role is set
  useEffect(() => {
    if (!role) {
      navigate("/select-role", { replace: true });
    }
  }, [role, navigate]);

  const searchTo = useMemo(() => {
    const params = new URLSearchParams();
    if (city.trim()) params.set("city", city.trim());
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (guests) params.set("guests", guests);

    const qs = params.toString();
    return qs ? `/search?${qs}` : "/search";
  }, [city, checkIn, checkOut, guests]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1723465308831-29da05e011f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTIyNTcxNHww&ixlib=rb-4.1.0&q=80&w=1920')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Trouvez votre séjour au Maroc</h1>
            <p className="text-xl mb-12 text-gray-200">
              Hôtels, riads et resorts — de la médina à l’Atlantique, prix en dirhams (Dh)
            </p>

            {/* Search Bar Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-4 gap-4">
                {/* City Input */}
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 mb-2">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Where to?"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Check-in Date */}
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 mb-2">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black"
                    />
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 mb-2">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="relative">
                  <label className="block text-left text-sm text-gray-600 mb-2">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="2"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <Button
                asChild
                className="w-full mt-6 h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl text-lg"
              >
                <Link to={searchTo} viewTransition>
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Listing Section */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hôtels à découvrir</h2>
          <p className="text-gray-600">Sélection dans les grandes villes marocaines — tarifs indicatifs par nuit</p>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Hotel Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Hotel Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                  <div className="flex items-center gap-1 bg-[#2563EB] text-white px-2 py-1 rounded-lg text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{formatMad(hotel.price)}</span>
                    <span className="text-gray-600 text-sm"> / nuit</span>
                  </div>
                  <Link to={`/hotel/${hotel.id}`} viewTransition>
                    <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6">
                      Voir l’offre
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}