import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {

  return (
    <>
      <div className="card">
        <Navbar />
        <Outlet />
      </div>
    </>
  )
}

export default App
