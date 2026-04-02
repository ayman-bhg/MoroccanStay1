import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { DarkModeProvider } from "./context/DarkModeContext";
export default function App() {
    return (<AuthProvider>
      <DarkModeProvider>
        <RouterProvider router={router}/>
      </DarkModeProvider>
    </AuthProvider>);
}
