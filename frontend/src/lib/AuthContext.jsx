import { useContext, createContext, useState } from "react";
import api from "./api";
import {LoaderIcon} from "lucide-react"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  const checkAuth = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user);
    } catch (error) {
      console.log(error.response.data);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = async()=>{
    try {
        await api.post("/logout")
        setUser(null)
        navigate("/login")
    } catch (error) {
        toast.error("ERROR LOGOUT , FORCING TO LOGOUT!" )
        console.log(error.response.data)
        setUser(null)
        navigate("/login")
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth ,logout}}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading... <LoaderIcon className=" spin"/>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
