import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home.page"
import RestaurantPage from "./pages/Restaurant.page";
import Room from "./pages/Room.page";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurante" element={<RestaurantPage/>} />
          <Route path="/habitaciones/:tipo" element={<Room/>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
