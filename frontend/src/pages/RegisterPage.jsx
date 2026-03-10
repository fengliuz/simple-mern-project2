import { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useAuth } from "../lib/AuthContext";
const RegisterPage = () => {
    const [username,setUsername] = useState("")
    const {checkAuth} = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const handleManualRegister = async(e)=>{
        e.preventDefault()
        try {
            const res = await api.post("/register",{username,email,password})
            await checkAuth()
            toast.success(res.data.message)
            navigate("/")
        } catch (error) {
            toast.error("Error, "+(error.response.data.message || "server error"))
        }
    }
    const handleGoogleRegister = async()=>{
        window.location.href="http://localhost:5001/auth/google"
    }
  return (
    <>
    <Navbar></Navbar>
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className=" text-3xl font-bold text-center text-secondary mb-4">
              Register Form
            </h1>
            <form action="" onSubmit={handleManualRegister}>
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username:</span>
                </label>
                <input
                  type="text"
                  placeholder="your username"
                  className=" input input-bordered focus:input-secondary"
                  required
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className=" input input-bordered focus:input-secondary"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered focus:input-secondary"
                  placeholder="Your password"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="flex form-control mt-6 px-auto">
                <button className="btn btn-secondary w-full hover:text-white">
                  Login
                </button>
              </div>
            </form>
                <Link className=" flex max-h-1 justify-center py-8 hover:text-secondary transition duration-200  " to={`/login`}>Already have an account? Login</Link>
            <div className=" divider text-sm text-base-content/50">OR</div>
            <div className="form-control flex justify-end"  >
              <button onClick={handleGoogleRegister} className="btn-outline hover:btn-primary hover:btn-soft btn btn-secondary cursor-pointer ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Continue With Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
