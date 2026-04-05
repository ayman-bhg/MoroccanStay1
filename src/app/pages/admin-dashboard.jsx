import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { LayoutDashboard, Hotel, MapPin, FileText, LogOut, DollarSign, TrendingUp, Users, Calendar, House, Pencil } from "lucide-react";
import { toast } from "sonner";
import { BrandLockup } from "../components/brand-logo";
import { Button } from "../components/ui/button";
import { formatMad } from "../lib/currency";
import { hotels as hotelsData } from "../data/hotels";  // ← renamed import
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../context/DarkModeContext";

const TAB_KEYS = ["dashboard", "hotels", "guides", "reports"];
function tabFromSearch(value) {
    if (value && TAB_KEYS.includes(value)) return value;
    return "dashboard";
}

const recentBookings = [
    { id: "1", guest: "Youssef Alami", hotel: "Hôtel Corniche Atlantique", checkIn: "2026-04-10", checkOut: "2026-04-14", amount: 5420, status: "Confirmé" },
    { id: "2", guest: "Fatima-Zahra Benkirane", hotel: "Riad Al Bahia", checkIn: "2026-04-12", checkOut: "2026-04-16", amount: 6280, status: "Confirmé" },
    { id: "3", guest: "Omar Tazi", hotel: "Dar El Médina", checkIn: "2026-04-18", checkOut: "2026-04-21", amount: 3180, status: "En attente" },
    { id: "4", guest: "Salma El Idrissi", hotel: "Rivage Hôtel & Spa", checkIn: "2026-04-05", checkOut: "2026-04-09", amount: 7150, status: "Confirmé" },
    { id: "5", guest: "Mehdi Cherkaoui", hotel: "Bahia Beach Resort", checkIn: "2026-04-22", checkOut: "2026-04-26", amount: 8920, status: "Confirmé" },
];

const initialGuideRows = [
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

    // ✅ CHANGE 1 & 2 — both lists are now state
    const [hotelList, setHotelList] = useState(hotelsData);
    const [guideList, setGuideList] = useState(initialGuideRows);

    const [showAddHotel, setShowAddHotel] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [hotelForm, setHotelForm] = useState({ name: "", location: "", price: "", rooms: "", rating: "" });
    const [showAddGuide, setShowAddGuide] = useState(false);
    const [guideForm, setGuideForm] = useState({ name: "", city: "", email: "" });

    const setTab = (tab) => {
        if (tab === "dashboard") {
            setSearchParams({}, { replace: true });
        } else {
            setSearchParams({ tab }, { replace: true });
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
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

    // ✅ CHANGE 3a — adds new hotel OR updates existing one in the list
    const handleSaveHotel = () => {
        if (!hotelForm.name || !hotelForm.location || !hotelForm.price) {
            toast.error("Please fill in all fields");
            return;
        }
        if (editingHotel) {
            setHotelList(prev =>
                prev.map(h =>
                    h.id === editingHotel.id
                        ? { ...h, name: hotelForm.name, location: hotelForm.location, price: Number(hotelForm.price) }
                        : h
                )
            );
            toast.success(`Hotel "${hotelForm.name}" updated successfully!`);
        } else {
            const newHotel = {
                id: `h-${Date.now()}`,
                name: hotelForm.name,
                location: hotelForm.location,
                price: Number(hotelForm.price),
                rooms: Number(hotelForm.rooms) || 0,
                rating: Number(hotelForm.rating) || 0,
                guests: 0,
            };
            setHotelList(prev => [...prev, newHotel]);
            toast.success(`Hotel "${hotelForm.name}" added successfully!`);
        }
        setHotelForm({ name: "", location: "", price: "", rooms: "", rating: "" });
        setEditingHotel(null);
        setShowAddHotel(false);
    };

    // ✅ CHANGE 3b — pushes new guide into the list
    const handleAddGuide = () => {
        if (!guideForm.name || !guideForm.city || !guideForm.email) {
            toast.error("Please fill in all fields");
            return;
        }
        const newGuide = {
            id: `g-${Date.now()}`,
            name: guideForm.name,
            city: guideForm.city,
            tours: 0,
            status: "Actif",
        };
        setGuideList(prev => [...prev, newGuide]);
        toast.success(`Invitation sent to ${guideForm.name}!`);
        setGuideForm({ name: "", city: "", email: "" });
        setShowAddGuide(false);
    };

    const handleExportCSV = () => {
        const csv = [
            "Hotel,City,Price,Guests,Rating",
            ...hotelList.map(h => `"${h.name}","${h.location}",${h.price},${h.guests},${h.rating}`)
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
        pdfContent += "REVENUE SUMMARY\n-------------------\n";
        pdfContent += `Total Revenue (MAD): ${formatMad(894320)}\nTotal Bookings: 1,247\nOccupancy Rate: 94.2%\n\n`;
        pdfContent += "HOTELS\n-------------------\n";
        hotelList.forEach(h => {
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

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* sidebar — unchanged */}
            <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                {/* ... all sidebar JSX exactly as before ... */}
            </aside>

            <main className="flex-1 overflow-auto">
                <div className="p-10">
                    {/* ... header section unchanged ... */}

                    {activeSection === "hotels" && (
                        <div className="space-y-6 animate-[pageFade_220ms_ease-out]">
                            {/* stats cards unchanged */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <p className="text-sm text-gray-500">Listed properties</p>
                                    {/* ✅ now reflects real count */}
                                    <p className="text-2xl font-bold text-gray-900">{hotelList.length}</p>
                                </div>
                                {/* ... other stat cards unchanged ... */}
                            </div>
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                                {/* ... table header unchanged ... */}
                                <tbody className="divide-y divide-gray-200">
                                    {/* ✅ now iterates hotelList instead of hotels */}
                                    {hotelList.map((h) => (
                                        <tr key={h.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{h.name}</td>
                                            <td className="px-6 py-4 text-gray-700">{h.location}</td>
                                            <td className="px-6 py-4 text-gray-700">{formatMad(h.price)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Button type="button" variant="outline" size="sm" className="rounded-lg gap-1" onClick={() => handleEditHotel(h)}>
                                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </div>
                        </div>
                    )}

                    {activeSection === "guides" && (
                        <div className="space-y-6 animate-[pageFade_220ms_ease-out]">
                            {/* ... unchanged ... */}
                            <tbody className="divide-y divide-gray-200">
                                {/* ✅ now iterates guideList instead of guideRows */}
                                {guideList.map((g) => (
                                    <tr key={g.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{g.name}</td>
                                        <td className="px-6 py-4 text-gray-700">{g.city}</td>
                                        <td className="px-6 py-4 text-gray-700">{g.tours}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${g.status === "Actif" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                                {g.status === "Actif" ? "Active" : "Paused"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </div>
                    )}
                </div>
            </main>

            {/* Dialogs — unchanged except handleAddHotel removed, handleSaveHotel used for both */}
        </div>
    );
}