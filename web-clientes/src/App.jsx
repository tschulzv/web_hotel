import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home.page"
import RestaurantPage from "./pages/Restaurant.page";
import Room from "./pages/Room.page";
import RoomsList from "./pages/RoomsList.page";
import Cancellation from "./pages/Cancellation.page";
import ReserveRoom from "./pages/ReserveRoom.page";


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurante" element={<RestaurantPage/>} />
          <Route path="/habitaciones" element={<RoomsList/>} />
          <Route path="/habitaciones/:type" element={<Room/>} />
          <Route path="/reservaciones" element={<Cancellation/>} />
          <Route path="/habitaciones/reserva" element={<ReserveRoom/>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
