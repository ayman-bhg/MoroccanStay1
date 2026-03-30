import { useState } from "react";
import { Link } from "react-router";
import { MapPin, Calendar, Users, Clock, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";

const assignments = [
  {
    id: "1",
    title: "Médina de Marrakech & place Jemaa el-Fna",
    hotel: "Riad Al Bahia",
    date: "2026-04-12",
    time: "09:30",
    guests: 4,
    location: "Marrakech, Maroc",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Corniche & Mosquée Hassan II",
    hotel: "Hôtel Corniche Atlantique",
    date: "2026-04-15",
    time: "15:00",
    guests: 6,
    location: "Casablanca, Maroc",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Médina de Fès & tanneries Chouara",
    hotel: "Dar El Médina",
    date: "2026-04-18",
    time: "10:00",
    guests: 2,
    location: "Fès, Maroc",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Rif & médina bleue",
    hotel: "Riad Bleu Chefchaouen",
    date: "2026-03-28",
    time: "08:30",
    guests: 3,
    location: "Chefchaouen, Maroc",
    status: "completed",
  },
];

export function GuidePanel() {
  const [isAvailable, setIsAvailable] = useState(true);

  const upcomingAssignments = assignments.filter((a) => a.status === "upcoming");
  const completedAssignments = assignments.filter((a) => a.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-600" asChild>
                <Link to="/" viewTransition replace>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Espace guide touristique</h1>
                <p className="text-sm text-gray-600">Tournées et disponibilité au Maroc</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Disponibilité :</span>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-[#2563EB]"
                />
                <span className={`text-sm font-medium ${isAvailable ? "text-green-600" : "text-gray-600"}`}>
                  {isAvailable ? "Disponible" : "Indisponible"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-[#2563EB]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{upcomingAssignments.length}</h3>
            <p className="text-sm text-gray-600">Tournées à venir</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {upcomingAssignments.reduce((sum, a) => sum + a.guests, 0)}
            </h3>
            <p className="text-sm text-gray-600">Voyageurs</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">12</h3>
            <p className="text-sm text-gray-600">Tournées ce mois-ci</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">4,9</h3>
            <p className="text-sm text-gray-600">Note moyenne</p>
          </div>
        </div>

        {/* My Assignments Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mes affectations</h2>

          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{assignment.title}</h3>
                    <p className="text-gray-600 mb-4">{assignment.hotel}</p>

                    <div className="grid grid-cols-4 gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-sm">{assignment.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-sm">{assignment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-sm">{assignment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-sm">{assignment.guests} personnes</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl border-gray-300">
                      Détails
                    </Button>
                    <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl">
                      Accepter
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tours */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Récemment terminées</h2>

          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl shadow-md p-6 opacity-75"
              >
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
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">{assignment.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">{assignment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">{assignment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-gray-400" />
                        <span className="text-sm">{assignment.guests} personnes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
