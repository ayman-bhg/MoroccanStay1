import { Link, useSearchParams } from "react-router";
import { LayoutDashboard, Hotel, MapPin, FileText, LogOut, DollarSign, TrendingUp, Users, Calendar, House, Pencil } from "lucide-react";
import { toast } from "sonner";
import { BrandLockup } from "../components/brand-logo";
import { Button } from "../components/ui/button";
import { formatMad } from "../lib/currency";
import { hotels } from "../data/hotels";

type AdminTab = "dashboard" | "hotels" | "guides" | "reports";

const TAB_KEYS: AdminTab[] = ["dashboard", "hotels", "guides", "reports"];

function tabFromSearch(value: string | null): AdminTab {
  if (value && TAB_KEYS.includes(value as AdminTab)) return value as AdminTab;
  return "dashboard";
}

const recentBookings = [
  { id: "1", guest: "Youssef Alami", hotel: "Hôtel Corniche Atlantique", checkIn: "2026-04-10", checkOut: "2026-04-14", amount: 5420, status: "Confirmé" as const },
  { id: "2", guest: "Fatima-Zahra Benkirane", hotel: "Riad Al Bahia", checkIn: "2026-04-12", checkOut: "2026-04-16", amount: 6280, status: "Confirmé" as const },
  { id: "3", guest: "Omar Tazi", hotel: "Dar El Médina", checkIn: "2026-04-18", checkOut: "2026-04-21", amount: 3180, status: "En attente" as const },
  { id: "4", guest: "Salma El Idrissi", hotel: "Rivage Hôtel & Spa", checkIn: "2026-04-05", checkOut: "2026-04-09", amount: 7150, status: "Confirmé" as const },
  { id: "5", guest: "Mehdi Cherkaoui", hotel: "Bahia Beach Resort", checkIn: "2026-04-22", checkOut: "2026-04-26", amount: 8920, status: "Confirmé" as const },
];

const guideRows = [
  { id: "g1", name: "Hassan Benjelloun", city: "Marrakech", tours: 28, status: "Actif" },
  { id: "g2", name: "Khadija Amrani", city: "Fès", tours: 22, status: "Actif" },
  { id: "g3", name: "Younes Filali", city: "Chefchaouen", tours: 15, status: "Actif" },
  { id: "g4", name: "Imane Tazi", city: "Casablanca", tours: 9, status: "Pause" },
];

export function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = tabFromSearch(searchParams.get("tab"));

  const setTab = (tab: AdminTab) => {
    if (tab === "dashboard") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ tab }, { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-8 border-b border-gray-200">
          <BrandLockup />
        </div>

        <nav className="flex-1 p-6 overflow-y-auto" aria-label="Administration">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeSection === "dashboard"
                  ? "bg-blue-50 text-[#2563EB]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              <span className="font-medium">Dashboard</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("hotels")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeSection === "hotels"
                  ? "bg-blue-50 text-[#2563EB]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Hotel className="w-5 h-5 shrink-0" />
              <span className="font-medium">Manage Hotels</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("guides")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeSection === "guides"
                  ? "bg-blue-50 text-[#2563EB]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MapPin className="w-5 h-5 shrink-0" />
              <span className="font-medium">Manage Guides</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("reports")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${
                activeSection === "reports"
                  ? "bg-blue-50 text-[#2563EB]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-5 h-5 shrink-0" />
              <span className="font-medium">Reports</span>
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 p-0"
            asChild
          >
            <Link to="/" viewTransition className="w-full flex items-center gap-3 px-4 py-2">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-10">
          {/* Header */}
          <div key={`header-${activeSection}`} className="mb-10 flex items-start justify-between gap-4 animate-[pageFade_220ms_ease-out]">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeSection === "dashboard" && <span>Dashboard Overview</span>}
                {activeSection === "hotels" && <span>Manage Hotels</span>}
                {activeSection === "guides" && <span>Manage Guides</span>}
                {activeSection === "reports" && <span>Reports</span>}
              </h1>
              <p className="text-gray-600">
                {activeSection === "dashboard" && <span>Welcome back! Here's what's happening with your hotels today.</span>}
                {activeSection === "hotels" && <span>View and manage listed hotels, pricing, and availability.</span>}
                {activeSection === "guides" && <span>Manage tourist guides, destinations, and featured experiences.</span>}
                {activeSection === "reports" && <span>Review booking and revenue insights by period and status.</span>}
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-xl"
              asChild
            >
              <Link to="/" viewTransition>
                <House className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {activeSection === "dashboard" && (
            <div className="space-y-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 animate-[pageFade_220ms_ease-out]">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#2563EB]" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">1,247</h3>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +8.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{formatMad(894_320)}</h3>
              <p className="text-sm text-gray-600">Chiffre d’affaires (Maroc)</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">24</h3>
              <p className="text-sm text-gray-600">Active Hotels</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  +15.3%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">94.2%</h3>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-[pageFade_220ms_ease-out]">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reservations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check-in
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check-out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-gray-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{booking.guest}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.hotel}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.checkIn}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.checkOut}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatMad(booking.amount)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                            booking.status === "Confirmé"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            </div>
          )}

          {activeSection === "hotels" && (
            <div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Établissements listés</p>
                  <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Mises à jour en attente</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Alertes disponibilité</p>
                  <p className="text-2xl font-bold text-amber-600">1</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Hôtels (données démo)</h2>
                  <Button type="button" className="rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white" onClick={() => toast.info("Fonctionnalité d'ajout d'hôtel à venir")}>
                    Ajouter un hôtel
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Nom</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Ville</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">À partir de</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {hotels.map((h) => (
                        <tr key={h.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{h.name}</td>
                          <td className="px-6 py-4 text-gray-700">{h.location}</td>
                          <td className="px-6 py-4 text-gray-700">{formatMad(h.price)}</td>
                          <td className="px-6 py-4 text-right">
                            <Button type="button" variant="outline" size="sm" className="rounded-lg gap-1" onClick={() => toast.info(`Modification de l'hôtel: ${h.name}`)}>
                              <Pencil className="w-3.5 h-3.5" />
                              Modifier
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === "guides" && (
            <div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Guides actifs</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Brouillons destinations</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Guides touristiques</h2>
                  <Button type="button" className="rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white" onClick={() => toast.info("Fonctionnalité d'invitation à venir")}>
                    Inviter un guide
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Nom</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Ville</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Tournées</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {guideRows.map((g) => (
                        <tr key={g.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                          <td className="px-6 py-4 text-gray-700">{g.city}</td>
                          <td className="px-6 py-4 text-gray-700">{g.tours}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                g.status === "Actif"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {g.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === "reports" && (
            <div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">CA cumulé (démo)</p>
                  <p className="text-2xl font-bold text-gray-900">{formatMad(894_320)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Réservations</p>
                  <p className="text-2xl font-bold text-gray-900">1 247</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">Taux d’occupation</p>
                  <p className="text-2xl font-bold text-gray-900">94,2 %</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Export</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Téléchargez un récapitulatif CSV ou PDF pour la comptabilité (interface démo).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => toast.success("Export CSV lancé avec succès")}>
                    Exporter CSV
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => toast.success("Export PDF généré avec succès")}>
                    Exporter PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
