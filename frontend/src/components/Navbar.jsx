import { useAuth } from "../lib/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 text-xl font-bold">Gudang App</div>
      <div className="flex-none">
        {user ? (
          <div className="flex items-center gap-2">
            <span>Halo, {user.username}</span>
            <img src={user.avatar || "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"} className="w-10 h-10 rounded-full" />
          </div>
        ) : (
          <a href="/login" className="btn btn-primary">Login</a>
        )}
      </div>
    </nav>
  );
};
export default Navbar