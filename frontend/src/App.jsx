import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"

function App() {

  return (
    <div className="" data-theme="coffee">
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
