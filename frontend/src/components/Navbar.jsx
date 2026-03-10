import { Link } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const { user,logout } = useAuth();
  console.log(user);
  const handleLogout = async(e)=>{
    e.preventDefault()
    await logout()
  }
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 text-xl font-bold">Gudang App</div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-row gap-2">
              <span>Halo, {user.username}</span>
              <img
                src={
                  user.avatar ||
                  "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                }
                className="w-10 h-10 rounded-full"
              />
            <button onClick={handleLogout} className="btn btn-outline btn-error">
              Logout <LogOutIcon/>
            </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
            
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
