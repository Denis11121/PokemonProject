import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/details" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
