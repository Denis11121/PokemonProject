import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
