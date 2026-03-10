import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [theme,setTheme]= useState(localStorage.getItem("theme"))
  useEffect(()=>{
    async function fetchTheme(){
      setTheme(localStorage.getItem("theme"))
      if(!theme){
        localStorage.setItem("theme","forest")
        setTheme("forest")
      }
    }
    fetchTheme()
  },[theme])
  const handleSelectedTheme = (theme)=>{
    setTheme(theme)
    localStorage.setItem("theme",theme)
  }
  return (
    <AuthProvider>
      <Navbar onSelectedTheme={handleSelectedTheme}></Navbar>
      <div className=" transition duration-200" data-theme={`${theme}`}>
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
