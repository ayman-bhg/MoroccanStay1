import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Calendar, Users, Mail, Phone, User } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { hotels } from "../data/hotels";
import { formatMad } from "../lib/currency";

export function ReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === id);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "2026-02-20",
    checkOut: "2026-02-24",
    guests: "2",
  });

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const selectedRoom = hotel.rooms[0];
  const nights = Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  const subtotal = selectedRoom.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/payment/${hotel.id}`, { viewTransition: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Finaliser votre réservation</h1>

        <div className="grid grid-cols-3 gap-10">
          {/* Left Column - Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Coordonnées</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Youssef Alami"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="prenom@email.ma"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="+212 6 12 34 56 78"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Arrivée</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Départ</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nombre d’invités</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl text-lg mt-8"
                >
                  Continuer vers le paiement
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif</h3>

              <div className="mb-6">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="font-semibold text-gray-900 mb-1">{hotel.name}</h4>
                <p className="text-sm text-gray-600">{hotel.location}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Chambre</span>
                  <span className="text-gray-900 font-medium">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Arrivée</span>
                  <span className="text-gray-900 font-medium">{formData.checkIn}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Départ</span>
                  <span className="text-gray-900 font-medium">{formData.checkOut}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nuits</span>
                  <span className="text-gray-900 font-medium">{nights}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Invités</span>
                  <span className="text-gray-900 font-medium">{formData.guests}</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {formatMad(selectedRoom.price)} × {nights} nuits
                  </span>
                  <span>{formatMad(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frais de service</span>
                  <span>{formatMad(serviceFee)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#2563EB]">{formatMad(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
