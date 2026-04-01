import { useState } from "react";
import { useParams, Link } from "react-router";
import { MapPin, Star, Wifi, Waves, Car, Wind, Coffee, Dumbbell, Sparkles, UtensilsCrossed, Calendar, Users, Trees, Bath, } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { hotels } from "../data/hotels";
import { formatMad } from "../lib/currency";
const amenityIcons = {
    WiFi: Wifi,
    "Wi-Fi": Wifi,
    Pool: Waves,
    Piscine: Waves,
    Parking: Car,
    "Air Conditioning": Wind,
    Climatisation: Wind,
    Breakfast: Coffee,
    "Petit-déjeuner": Coffee,
    Gym: Dumbbell,
    "Salle de sport": Dumbbell,
    Spa: Sparkles,
    Restaurant: UtensilsCrossed,
    "Fine Dining": UtensilsCrossed,
    "Beach Access": Waves,
    "Accès plage": Waves,
    "Water Sports": Waves,
    Nautisme: Waves,
    Concierge: Users,
    Conciergerie: Users,
    "Business Center": Users,
    "Centre d'affaires": Users,
    Terrasse: Trees,
    Hammam: Bath,
};
export function HotelDetailsPage() {
    const { id } = useParams();
    const hotel = hotels.find((h) => h.id === id);
    const [selectedImage, setSelectedImage] = useState(0);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2");
    const [selectedRoom, setSelectedRoom] = useState(hotel?.rooms[0].id || "");
    if (!hotel) {
        return <div>Hotel not found</div>;
    }
    const selectedRoomData = hotel.rooms.find((r) => r.id === selectedRoom) || hotel.rooms[0];
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)) : 1;
    const totalPrice = selectedRoomData.price * nights;
    return (<div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">
        
        <div className="grid grid-cols-4 gap-4 mb-10">
          <div className="col-span-3 row-span-2">
            <img src={hotel.images[selectedImage]} alt={hotel.name} className="w-full h-[600px] object-cover rounded-2xl"/>
          </div>
          {hotel.images.slice(1, 5).map((image, index) => (<div key={index} onClick={() => setSelectedImage(index + 1)} className="cursor-pointer hover:opacity-80 transition-opacity">
              <img src={image} alt={`${hotel.name} ${index + 1}`} className="w-full h-[145px] object-cover rounded-xl"/>
            </div>))}
        </div>

        <div className="grid grid-cols-3 gap-10">
          
          <div className="col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-[#2563EB] text-white px-3 py-1.5 rounded-lg">
                    <Star className="w-5 h-5 fill-current"/>
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-1"/>
                    <span>{hotel.location}</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">À propos de cet hébergement</h2>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Équipements</h2>
              <div className="grid grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => {
            const Icon = amenityIcons[amenity] ?? Wifi;
            return (<div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <Icon className="w-6 h-6 text-[#2563EB]"/>
                      <span className="text-gray-700">{amenity}</span>
                    </div>);
        })}
              </div>
            </div>
          </div>

          
          <div className="col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{formatMad(selectedRoomData.price)}</span>
                  <span className="text-gray-600">/ nuit</span>
                </div>
              </div>

              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Arrivée</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="pl-11 h-12 rounded-xl border-gray-300 bg-gray-50 text-black"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Départ</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="pl-11 h-12 rounded-xl border-gray-300 bg-gray-50 text-black"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Invités</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <Input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} className="pl-11 h-12 rounded-xl border-gray-300 bg-gray-50 text-black" min="1"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Type de chambre</label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger className="h-12 rounded-xl border-gray-300 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {hotel.rooms.map((room) => (<SelectItem key={room.id} value={room.id}>
                          {room.name} — {formatMad(room.price)}/nuit
                        </SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>
                    {formatMad(selectedRoomData.price)} × {nights} nuits
                  </span>
                  <span>{formatMad(selectedRoomData.price * nights)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Frais de service</span>
                  <span>{formatMad(Math.round(totalPrice * 0.1))}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatMad(totalPrice + Math.round(totalPrice * 0.1))}
                  </span>
                </div>
              </div>

              <Link to={`/reservation/${hotel.id}`} viewTransition>
                <Button className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl text-lg">
                  Réserver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>);
}

