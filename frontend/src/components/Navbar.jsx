import { Link } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { LogOutIcon, PaletteIcon } from "lucide-react";

const Navbar = ({onSelectedTheme}) => {
  const { user, logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const themes = [
    "forest","coffee","sunset","dracula","night","synthwave","halloween"
  ]
  return (
    <nav className="navbar bg-secondary shadow-sm">
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
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error"
              >
                Logout <LogOutIcon />
              </button>
                 <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <PaletteIcon />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100/50 rounded-box z-1 w-52 p-2 shadow-sm"
              >
              {themes.map((t)=>(
                <li key={t}>
                    <button  onClick={()=>onSelectedTheme(`${t}`)}>
                        {t}
                    </button>
                </li>
              ))}
              </ul>
            </div>
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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                <PaletteIcon />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100/50 rounded-box z-1 w-52 p-2 shadow-sm"
              >
              {themes.map((t)=>(
                <li key={t}>
                    <button  onClick={()=>onSelectedTheme(`${t}`)}>
                        {t}
                    </button>
                </li>
              ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
