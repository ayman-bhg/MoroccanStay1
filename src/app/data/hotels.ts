export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  rooms: RoomType[];
}

export interface RoomType {
  id: string;
  name: string;
  price: number;
  capacity: number;
}

/** Unsplash — each ID is used only once across all hotels */
const u = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1080&q=80`;

/** Prices are in Moroccan dirhams (MAD) per night */
export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Hôtel Corniche Atlantique",
    location: "Casablanca, Maroc",
    rating: 4.8,
    price: 1180,
    image: u("photo-1566073771259-6a8506099945"),
    images: [
      u("photo-1566073771259-6a8506099945"),
      u("photo-1631049035182-249067d7618e"),
      u("photo-1618773928121-c32242e63f39"),
      u("photo-1564501049412-61c2a3083791"),
    ],
    description:
      "Face à l’océan Atlantique, à quelques minutes de la Mosquée Hassan II. Chambres modernes, spa, restaurant marocain et international. Idéal pour affaires et séjours au cœur du Maroc économique.",
    amenities: [
      "Wi-Fi",
      "Piscine",
      "Parking",
      "Climatisation",
      "Petit-déjeuner",
      "Salle de sport",
      "Spa",
      "Restaurant",
    ],
    rooms: [
      { id: "r1", name: "Chambre Deluxe vue mer", price: 1180, capacity: 2 },
      { id: "r2", name: "Suite Exécutive", price: 1890, capacity: 3 },
      { id: "r3", name: "Suite Présidentielle", price: 3200, capacity: 4 },
    ],
  },
  {
    id: "2",
    name: "Riad Al Bahia",
    location: "Marrakech, Maroc",
    rating: 4.9,
    price: 920,
    image: u("photo-1551882547-ff40c63fe5fa"),
    images: [
      u("photo-1551882547-ff40c63fe5fa"),
      u("photo-1489749798305-4fea3ae63d43"),
      u("photo-1723465308831-29da05e011f3"),
    ],
    description:
      "Riad traditionnel rénové près de la médina : patio zellige, terrasse panoramique sur les montagnes de l’Atlas. Accueil chaleureux, cuisine maison et hammam. Expérience authentique à Marrakech.",
    amenities: [
      "Wi-Fi",
      "Piscine",
      "Petit-déjeuner",
      "Climatisation",
      "Terrasse",
      "Hammam",
      "Conciergerie",
    ],
    rooms: [
      { id: "r1", name: "Chambre Patio", price: 920, capacity: 2 },
      { id: "r2", name: "Suite Atlas", price: 1450, capacity: 4 },
    ],
  },
  {
    id: "3",
    name: "Dar El Médina",
    location: "Fès, Maroc",
    rating: 4.7,
    price: 720,
    image: u("photo-1648766378129-11c3d8d0da05"),
    images: [u("photo-1648766378129-11c3d8d0da05"), u("photo-1549293606-95bd184c6c8f")],
    description:
      "Maison d’hôtes au cœur de la médina de Fès, à proximité des tanneries et des souks. Architecture andalouse, service personnalisé et excursions guidées vers Meknès et Volubilis.",
    amenities: ["Wi-Fi", "Petit-déjeuner", "Climatisation", "Conciergerie", "Terrasse"],
    rooms: [
      { id: "r1", name: "Chambre Médina", price: 720, capacity: 2 },
      { id: "r2", name: "Suite Famille", price: 1100, capacity: 4 },
    ],
  },
  {
    id: "4",
    name: "Rivage Hôtel & Spa",
    location: "Rabat, Maroc",
    rating: 4.8,
    price: 1050,
    image: u("photo-1512917774080-9991f1c4c750"),
    images: [
      u("photo-1512917774080-9991f1c4c750"),
      u("photo-1564013799919-60075199e8d7"),
      u("photo-1559827260-dc66d52bef19"),
    ],
    description:
      "Établissement 5 étoiles face au Bouregreg, entre Rabat et Salé. Spa complet, salles de réunion et restaurants gastronomiques. Parfait pour découvrir la capitale administrative du pays.",
    amenities: [
      "Wi-Fi",
      "Piscine",
      "Parking",
      "Climatisation",
      "Petit-déjeuner",
      "Spa",
      "Restaurant",
      "Centre d’affaires",
    ],
    rooms: [
      { id: "r1", name: "Chambre Deluxe", price: 1050, capacity: 2 },
      { id: "r2", name: "Suite Bouregreg", price: 1680, capacity: 4 },
    ],
  },
  {
    id: "5",
    name: "Bahia Beach Resort",
    location: "Agadir, Maroc",
    rating: 4.9,
    price: 1380,
    image: u("photo-1582719508461-905c673771fd"),
    images: [u("photo-1582719508461-905c673771fd"), u("photo-1578680075-faf28c370260")],
    description:
      "Resort en bord de mer avec plage privée, piscines et sports nautiques. Ensoleillement toute l’année, familles et couples bienvenus. Golf et souk d’Agadir à proximité.",
    amenities: [
      "Wi-Fi",
      "Piscine",
      "Accès plage",
      "Climatisation",
      "Petit-déjeuner",
      "Spa",
      "Nautisme",
    ],
    rooms: [
      { id: "r1", name: "Chambre Vue jardin", price: 1380, capacity: 2 },
      { id: "r2", name: "Villa Front de mer", price: 2650, capacity: 6 },
    ],
  },
  {
    id: "6",
    name: "Riad Bleu Chefchaouen",
    location: "Chefchaouen, Maroc",
    rating: 4.8,
    price: 580,
    image: u("photo-1496417262490-62ad7fcd3a4a"),
    images: [u("photo-1496417262490-62ad7fcd3a4a"), u("photo-1445017865936-96364b70f171")],
    description:
      "Maison bleue typique dans la médina : ruelles piétonnes, vue sur les montagnes du Rif. Petit-déjeuner marocain sur la terrasse. Point de départ pour les randonnées et le Rif.",
    amenities: ["Wi-Fi", "Petit-déjeuner", "Terrasse", "Conciergerie"],
    rooms: [
      { id: "r1", name: "Chambre Bleue", price: 580, capacity: 2 },
      { id: "r2", name: "Suite Panorama", price: 890, capacity: 3 },
    ],
  },
];
