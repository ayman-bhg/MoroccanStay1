// App.tsx
import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <BrowserRouter basename="/MoroccanStay1">
      <RouterProvider router={router} />
    </BrowserRouter>
  );
}