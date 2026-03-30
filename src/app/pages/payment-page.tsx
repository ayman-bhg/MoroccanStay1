import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { CreditCard, Lock, Check } from "lucide-react";
import { Navbar } from "../components/navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { hotels } from "../data/hotels";
import { formatMad } from "../lib/currency";

export function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === id);

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const selectedRoom = hotel.rooms[0];
  const nights = 4;
  const subtotal = selectedRoom.price * nights;
  const serviceFee = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + serviceFee + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      setTimeout(() => {
        navigate("/", { viewTransition: true });
      }, 2000);
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-8 py-32 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Paiement confirmé</h1>
            <p className="text-gray-600 mb-2">Votre réservation au Maroc est enregistrée.</p>
            <p className="text-sm text-gray-500">Retour à l’accueil…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Paiement sécurisé</h1>

        <div className="grid grid-cols-3 gap-10">
          {/* Left Column - Payment Form */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Vos données de paiement sont protégées (démo UI)</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nom sur la carte</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Prénom Nom"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                      className="h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Numéro de carte</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                        setPaymentData({ ...paymentData, cardNumber: formatted });
                      }}
                      className="pl-11 h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Expiration</label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value;
                        setPaymentData({ ...paymentData, expiryDate: formatted });
                      }}
                      className="h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">CVV</label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                      className="h-14 rounded-xl border-gray-300 bg-gray-50 text-black placeholder:text-gray-500"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                  <p className="text-sm text-blue-800">
                    En validant, vous acceptez les conditions de réservation et d’annulation (démo).
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl text-lg mt-8 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement du paiement…
                    </span>
                  ) : (
                    `Payer ${formatMad(total)}`
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
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
                  <span className="text-gray-600">Dates</span>
                  <span className="text-gray-900 font-medium">20–24 févr. 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nuits</span>
                  <span className="text-gray-900 font-medium">{nights}</span>
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
                <div className="flex justify-between text-sm text-gray-600">
                  <span>TVA (estim.)</span>
                  <span>{formatMad(taxes)}</span>
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
