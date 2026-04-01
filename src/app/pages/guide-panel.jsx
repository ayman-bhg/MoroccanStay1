import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { MapPin, Calendar, Users, Star, ArrowLeft, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

const guides = [
    { id: "g1", name: "Yassine El Kbir", city: "Marrakech", language: "Français, Anglais", rate: 120, rating: 4.9, available: true },
    { id: "g2", name: "Sara Ben", city: "Fès", language: "Français, Arabe", rate: 95, rating: 4.8, available: true },
    { id: "g3", name: "Omar Azur", city: "Chefchaouen", language: "Anglais, Espagnol", rate: 110, rating: 4.7, available: false },
    { id: "g4", name: "Nadia Laarbi", city: "Casablanca", language: "Français, Arabe", rate: 100, rating: 4.9, available: true },
];
export function GuidePanel() {
    const navigate = useNavigate();
    const { role } = useAuth();
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [message, setMessage] = useState("");
    const [booked, setBooked] = useState([]);

    const upcomingAssignments = booked.map(() => ({ guests: 2 }));
    const completedAssignments = [];

    useEffect(() => {
        if (role && role !== "customer") {
            navigate("/select-role", { replace: true });
        }
    }, [role, navigate]);

    const handleBook = (guide) => {
        if (!guide.available) {
            setMessage("Ce guide n'est pas disponible pour le moment.");
            return;
        }
        setBooked((prev) => [...prev, guide.id]);
        setSelectedGuide(guide.id);
        setMessage(`Votre demande est envoyée pour ${guide.name}.`);
    };

    return (<div className="min-h-screen bg-gray-50">
      
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-600" asChild>
                <Link to="/" viewTransition replace>
                  <ArrowLeft className="w-5 h-5"/>
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Guides touristiques</h1>
                <p className="text-sm text-gray-600">Choisissez, contactez et réservez votre guide</p>
              </div>
            </div>
            <div>
              {message && <div className="text-sm px-4 py-2 bg-green-50 text-green-700 rounded-xl">{message}</div>}
            </div>
          </div>
        </div>
      </header>

      
      <div className="max-w-7xl mx-auto px-8 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#2563EB]"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{guides.length}</h3>
            <p className="text-sm text-gray-600">Guides disponibles</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{guides.filter((g) => g.available).length}</h3>
            <p className="text-sm text-gray-600">Guides actuellement prêts</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-purple-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{(guides.reduce((sum, g) => sum + g.rating, 0) / guides.length).toFixed(1)}</h3>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-orange-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{booked.length}</h3>
            <p className="text-sm text-gray-600">Réservations faites</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {upcomingAssignments.reduce((sum, a) => sum + a.guests, 0)}
            </h3>
            <p className="text-sm text-gray-600">Voyageurs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
            <p className="text-sm text-gray-600">Tournées ce mois-ci</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600"/>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">4,9</h3>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
        </div>

        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Guides disponibles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (<div key={guide.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{guide.name}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${guide.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {guide.available ? "Disponible" : "Indisponible"}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2"><strong>Ville :</strong> {guide.city}</p>
                    <p className="text-gray-600 mb-2"><strong>Langues :</strong> {guide.language}</p>
                    <p className="text-gray-600 mb-3"><strong>Tarif:</strong> {guide.rate} Dh / heure</p>
                    <p className="text-gray-600">{Array.from({ length: 5 }).map((_, idx) => (<span key={idx} className={idx < guide.rating ? "text-yellow-400" : "text-gray-300"}>★</span>))} <span className="text-sm ml-1 text-gray-500">{guide.rating}</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button disabled={!guide.available || booked.includes(guide.id)} onClick={() => handleBook(guide)} className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl">
                      {booked.includes(guide.id) ? "Réservé" : "Réserver"}
                    </Button>
                  </div>
                </div>
              </div>))}
          </div>
        </div>

        
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Récemment terminées</h2>

          <div className="space-y-4">
            {completedAssignments.map((assignment) => (<div key={assignment.id} className="bg-white rounded-2xl shadow-md p-6 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{assignment.title}</h3>
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Terminée
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{assignment.hotel}</p>

                    <div className="grid grid-cols-4 gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400"/>
                        <span className="text-sm">{assignment.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400"/>
                        <span className="text-sm">{assignment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-gray-400"/>
                        <span className="text-sm">{assignment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-gray-400"/>
                        <span className="text-sm">{assignment.guests} personnes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>))}
          </div>
        </div>
      </div>
    </div>);
}

