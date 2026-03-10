import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <div className="" data-theme="sunset">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <HomePage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
