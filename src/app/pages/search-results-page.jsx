import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { MapPin, Search, Star } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { hotels } from "../data/hotels";
import { formatMad } from "../lib/currency";
function normalize(s) {
    return s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .trim();
}
function nightsBetween(checkIn, checkOut) {
    if (!checkIn || !checkOut)
        return 1;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    const diffMs = b.getTime() - a.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Number.isFinite(days) && days > 0 ? days : 1;
}
export function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city") ?? "";
    const checkIn = searchParams.get("checkIn") ?? "";
    const checkOut = searchParams.get("checkOut") ?? "";
    const guests = searchParams.get("guests") ?? "";
    const nights = nightsBetween(checkIn, checkOut);
    const results = useMemo(() => {
        const wantedCity = normalize(city);
        const filtered = hotels.filter((h) => {
            if (!wantedCity)
                return true;
            const location = normalize(h.location);
            return location.includes(wantedCity);
        });
        return filtered
            .slice()
            .sort((a, b) => b.rating - a.rating || a.price - b.price);
    }, [city]);
    const querySummary = useMemo(() => {
        const parts = [];
        if (city.trim())
            parts.push(`City: ${city.trim()}`);
        if (checkIn && checkOut)
            parts.push(`Dates: ${checkIn} → ${checkOut} (${nights} nights)`);
        if (guests)
            parts.push(`Guests: ${guests}`);
        return parts.length ? parts.join(" · ") : "All hotels";
    }, [city, checkIn, checkOut, guests, nights]);
    return (<div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Results</h1>
            <p className="text-gray-600">
              <span className="inline-flex items-center gap-2">
                <Search className="w-4 h-4 text-[#2563EB]"/>
                {querySummary}
              </span>
            </p>
          </div>

          <Link to="/" viewTransition>
            <Button type="button" variant="outline" className="rounded-xl">
              Change search
            </Button>
          </Link>
        </div>

        {results.length === 0 ? (<div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <p className="text-gray-700 text-lg font-medium">No hotels found for this city.</p>
            <p className="text-gray-500 mt-2">Try another city name (e.g., Casablanca, Marrakech, Fès…)</p>
            <div className="mt-6">
              <Link to="/" viewTransition>
                <Button type="button" className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl">
                  Retour à l’accueil
                </Button>
              </Link>
            </div>
          </div>) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((hotel) => {
                const cheapestRoom = hotel.rooms.reduce((min, r) => (r.price < min.price ? r : min), hotel.rooms[0]);
                const subtotal = cheapestRoom.price * nights;
                const serviceFee = Math.round(subtotal * 0.1);
                const total = subtotal + serviceFee;
                return (<div key={hotel.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy"/>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center gap-1 bg-[#2563EB] text-white px-2 py-1 rounded-lg text-sm">
                        <Star className="w-4 h-4 fill-current"/>
                        <span>{hotel.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1"/>
                      <span className="text-sm">{hotel.location}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{formatMad(cheapestRoom.price)}</div>
                        <div className="text-gray-600 text-sm">per night (from)</div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatMad(subtotal)} · {nights} nuits</span>
                        <span className="font-medium text-gray-900">{formatMad(total)}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Link to={`/hotel/${hotel.id}`} viewTransition>
                        <Button className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6">
                          View Offer
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>);
            })}
          </div>)}
      </div>

      <Footer />
    </div>);
}

