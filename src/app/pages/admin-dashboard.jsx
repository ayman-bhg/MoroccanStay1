import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { LayoutDashboard, Hotel, MapPin, FileText, LogOut, DollarSign, TrendingUp, Users, Calendar, House, Pencil } from "lucide-react";
import { toast } from "sonner";
import { BrandLockup } from "../components/brand-logo";
import { Button } from "../components/ui/button";
import { formatMad } from "../lib/currency";
import { hotels } from "../data/hotels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../context/DarkModeContext";
const TAB_KEYS = ["dashboard", "hotels", "guides", "reports"];
function tabFromSearch(value) {
    if (value && TAB_KEYS.includes(value))
        return value;
    return "dashboard";
}
const recentBookings = [
    { id: "1", guest: "Youssef Alami", hotel: "Hôtel Corniche Atlantique", checkIn: "2026-04-10", checkOut: "2026-04-14", amount: 5420, status: "Confirmé" },
    { id: "2", guest: "Fatima-Zahra Benkirane", hotel: "Riad Al Bahia", checkIn: "2026-04-12", checkOut: "2026-04-16", amount: 6280, status: "Confirmé" },
    { id: "3", guest: "Omar Tazi", hotel: "Dar El Médina", checkIn: "2026-04-18", checkOut: "2026-04-21", amount: 3180, status: "En attente" },
    { id: "4", guest: "Salma El Idrissi", hotel: "Rivage Hôtel & Spa", checkIn: "2026-04-05", checkOut: "2026-04-09", amount: 7150, status: "Confirmé" },
    { id: "5", guest: "Mehdi Cherkaoui", hotel: "Bahia Beach Resort", checkIn: "2026-04-22", checkOut: "2026-04-26", amount: 8920, status: "Confirmé" },
];
const guideRows = [
    { id: "g1", name: "Hassan Benjelloun", city: "Marrakech", tours: 28, status: "Actif" },
    { id: "g2", name: "Khadija Amrani", city: "Fès", tours: 22, status: "Actif" },
    { id: "g3", name: "Younes Filali", city: "Chefchaouen", tours: 15, status: "Actif" },
    { id: "g4", name: "Imane Tazi", city: "Casablanca", tours: 9, status: "Pause" },
];
export function AdminDashboard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const { isDark } = useDarkMode();
    const activeSection = tabFromSearch(searchParams.get("tab"));
    const [showAddHotel, setShowAddHotel] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [hotelForm, setHotelForm] = useState({ name: "", location: "", price: "", rooms: "", rating: "" });
    const [showAddGuide, setShowAddGuide] = useState(false);
    const [guideForm, setGuideForm] = useState({ name: "", city: "", email: "" });
    const setTab = (tab) => {
        if (tab === "dashboard") {
            setSearchParams({}, { replace: true });
        }
        else {
            setSearchParams({ tab }, { replace: true });
        }
    };
    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };
    const handleAddHotel = () => {
        if (!hotelForm.name || !hotelForm.location || !hotelForm.price) {
            toast.error("Please fill in all fields");
            return;
        }
        toast.success(`Hotel "${hotelForm.name}" added successfully!`);
        setHotelForm({ name: "", location: "", price: "", rooms: "", rating: "" });
        setShowAddHotel(false);
    };
    const handleEditHotel = (hotel) => {
        setEditingHotel(hotel);
        setHotelForm({
            name: hotel.name,
            location: hotel.location,
            price: hotel.price.toString(),
            rooms: "24",
            rating: "4.8"
        });
        setShowAddHotel(true);
    };
    const handleSaveHotel = () => {
        if (editingHotel) {
            toast.success(`Hotel "${hotelForm.name}" updated successfully!`);
        }
        else {
            toast.success(`Hotel "${hotelForm.name}" added successfully!`);
        }
        setHotelForm({ name: "", location: "", price: "", rooms: "", rating: "" });
        setEditingHotel(null);
        setShowAddHotel(false);
    };
    const handleAddGuide = () => {
        if (!guideForm.name || !guideForm.city || !guideForm.email) {
            toast.error("Please fill in all fields");
            return;
        }
        toast.success(`Invitation sent to ${guideForm.name}!`);
        setGuideForm({ name: "", city: "", email: "" });
        setShowAddGuide(false);
    };
    const handleExportCSV = () => {
        const csv = [
            "Hotel,City,Price,Guests,Rating",
            ...hotels.map(h => `"${h.name}","${h.location}",${h.price},${h.guests},${h.rating}`)
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `hotels-export-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("CSV exported successfully!");
    };
    const handleExportPDF = () => {
        let pdfContent = "=== MOROCCAN STAY - HOTEL REPORTS ===\n";
        pdfContent += `Generated: ${new Date().toLocaleString()}\n\n`;
        pdfContent += "REVENUE SUMMARY\n";
        pdfContent += "-------------------\n";
        pdfContent += `Total Revenue (MAD): ${formatMad(894320)}\n`;
        pdfContent += `Total Bookings: 1,247\n`;
        pdfContent += `Occupancy Rate: 94.2%\n\n`;
        pdfContent += "HOTELS\n";
        pdfContent += "-------------------\n";
        hotels.forEach(h => {
            pdfContent += `${h.name} (${h.location}): ${formatMad(h.price)}\n`;
        });
        const blob = new Blob([pdfContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `reports-${new Date().toISOString().split("T")[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Report exported successfully!");
    };
    return (<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      
      <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <BrandLockup />
        </div>

        <nav className="flex-1 p-6 overflow-y-auto" aria-label="Administration">
          <div className="space-y-2">
            <button type="button" onClick={() => setTab("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeSection === "dashboard"
            ? "bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <LayoutDashboard className="w-5 h-5 shrink-0"/>
              <span className="font-medium">Dashboard</span>
            </button>
            <button type="button" onClick={() => setTab("hotels")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeSection === "hotels"
            ? "bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <Hotel className="w-5 h-5 shrink-0"/>
              <span className="font-medium">Manage Hotels</span>
            </button>
            <button type="button" onClick={() => setTab("guides")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeSection === "guides"
            ? "bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <MapPin className="w-5 h-5 shrink-0"/>
              <span className="font-medium">Manage Guides</span>
            </button>
            <button type="button" onClick={() => setTab("reports")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${activeSection === "reports"
            ? "bg-blue-50 dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
              <FileText className="w-5 h-5 shrink-0"/>
              <span className="font-medium">Reports</span>
            </button>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-0" onClick={handleLogout}>
            <div className="w-full flex items-center gap-3 px-4 py-2">
              <LogOut className="w-5 h-5"/>
              <span className="font-medium">Logout</span>
            </div>
          </Button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-auto">
        <div className="p-10">
          
          <div key={`header-${activeSection}`} className="mb-10 flex items-start justify-between gap-4 animate-[pageFade_220ms_ease-out]">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {activeSection === "dashboard" && <span>Dashboard Overview</span>}
                {activeSection === "hotels" && <span>Manage Hotels</span>}
                {activeSection === "guides" && <span>Manage Guides</span>}
                {activeSection === "reports" && <span>Reports</span>}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {activeSection === "dashboard" && <span>Welcome back! Here's what's happening with your hotels today.</span>}
                {activeSection === "hotels" && <span>View and manage listed hotels, pricing, and availability.</span>}
                {activeSection === "guides" && <span>Manage tourist guides, destinations, and featured experiences.</span>}
                {activeSection === "reports" && <span>Review booking and revenue insights by period and status.</span>}
              </p>
            </div>
          </div>

          {activeSection === "dashboard" && (<div className="space-y-10">
          
          <div className="grid grid-cols-4 gap-6 animate-[pageFade_220ms_ease-out]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#2563EB] dark:text-blue-400"/>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,247</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Bookings</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400"/>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  +8.2%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{formatMad(894320)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Revenue (Morocco)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">24</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Active Hotels</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400"/>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  +15.3%
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">94.2%</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Occupancy Rate</p>
            </div>
          </div>

          
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
                  {recentBookings.map((booking) => (<tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-gray-600"/>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{booking.guest}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.hotel}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.checkIn}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.checkOut}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatMad(booking.amount)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${booking.status === "Confirmé"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>
            </div>)}

          {activeSection === "hotels" && (<div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Listed properties</p>
                  <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Pending updates</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Availability alerts</p>
                  <p className="text-2xl font-bold text-amber-600">1</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Hotels (demo data)</h2>
                  <Button type="button" className="rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white" onClick={() => {
                setEditingHotel(null);
                setHotelForm({ name: "", location: "", price: "", rooms: "", rating: "" });
                setShowAddHotel(true);
            }}>
                    Add hotel
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">City</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Starting at</th>
                        <th className="px-6 py-3 text-right font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {hotels.map((h) => (<tr key={h.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{h.name}</td>
                          <td className="px-6 py-4 text-gray-700">{h.location}</td>
                          <td className="px-6 py-4 text-gray-700">{formatMad(h.price)}</td>
                          <td className="px-6 py-4 text-right">
                            <Button type="button" variant="outline" size="sm" className="rounded-lg gap-1" onClick={() => handleEditHotel(h)}>
                              <Pencil className="w-3.5 h-3.5"/>
                              Edit
                            </Button>
                          </td>
                        </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>)}

          {activeSection === "guides" && (<div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Active guides</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500">Destination drafts</p>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">Tourist guides</h2>
                  <Button type="button" className="rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white" onClick={() => {
                setGuideForm({ name: "", city: "", email: "" });
                setShowAddGuide(true);
            }}>
                    Invite Guide
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">City</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Tours</th>
                        <th className="px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {guideRows.map((g) => (<tr key={g.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                          <td className="px-6 py-4 text-gray-700">{g.city}</td>
                          <td className="px-6 py-4 text-gray-700">{g.tours}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${g.status === "Actif"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"}`}>
                              {g.status === "Actif" ? "Active" : "Paused"}
                            </span>
                          </td>
                        </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>)}

          {activeSection === "reports" && (<div className="space-y-6 animate-[pageFade_220ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-500 mb-1">CA cumulé (démo)</p>
                  <p className="text-2xl font-bold text-gray-900">{formatMad(894320)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500">Occupancy rate</p>
                  <p className="text-2xl font-bold text-gray-900">94.2%</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Export</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Download a CSV or PDF summary for accounting (demo interface).
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="outline" className="rounded-xl" onClick={handleExportCSV}>
                    Exporter CSV
                  </Button>
                  <Button type="button" variant="outline" className="rounded-xl" onClick={handleExportPDF}>
                    Exporter PDF
                  </Button>
                </div>
              </div>
            </div>)}
        </div>
      </main>

      
      <Dialog open={showAddHotel} onOpenChange={setShowAddHotel}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingHotel ? "Edit Hotel" : "Add Hotel"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Hotel Name</Label>
              <Input id="name" placeholder="Enter the name" value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="location">City</Label>
              <Input id="location" placeholder="Marrakech, Casablanca..." value={hotelForm.location} onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="price">Price per night (MAD)</Label>
              <Input id="price" type="number" placeholder="1000" value={hotelForm.price} onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="rooms">Rooms</Label>
              <Input id="rooms" type="number" placeholder="24" value={hotelForm.rooms} onChange={(e) => setHotelForm({ ...hotelForm, rooms: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" step="0.1" placeholder="4.8" value={hotelForm.rating} onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })} className="rounded-lg mt-1"/>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddHotel(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveHotel} className="rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              {editingHotel ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      <Dialog open={showAddGuide} onOpenChange={setShowAddGuide}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Invite Guide</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="guide-name">Guide Name</Label>
              <Input id="guide-name" placeholder="Hassan Benjelloun" value={guideForm.name} onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="guide-city">City/Region</Label>
              <Input id="guide-city" placeholder="Marrakech, Fès..." value={guideForm.city} onChange={(e) => setGuideForm({ ...guideForm, city: e.target.value })} className="rounded-lg mt-1"/>
            </div>
            <div>
              <Label htmlFor="guide-email">Email</Label>
              <Input id="guide-email" type="email" placeholder="guide@example.com" value={guideForm.email} onChange={(e) => setGuideForm({ ...guideForm, email: e.target.value })} className="rounded-lg mt-1"/>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddGuide(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button type="button" onClick={handleAddGuide} className="rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);
}

