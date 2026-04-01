import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { HotelDetailsPage } from "./pages/hotel-details-page";
import { ReservationPage } from "./pages/reservation-page";
import { PaymentPage } from "./pages/payment-page";
import { AdminDashboard } from "./pages/admin-dashboard";
import { GuidePanel } from "./pages/guide-panel";
import { SearchResultsPage } from "./pages/search-results-page";
import { NotFoundPage } from "./pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/hotel/:id",
    Component: HotelDetailsPage,
  },
  {
    path: "/reservation/:id",
    Component: ReservationPage,
  },
  {
    path: "/payment/:id",
    Component: PaymentPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/guide",
    Component: GuidePanel,
  },
  {
    path: "/search",
    Component: SearchResultsPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
], {
  basename: import.meta.env.BASE_URL
});
