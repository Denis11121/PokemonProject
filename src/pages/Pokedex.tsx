import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import SortSelect from "../components/SortSelect";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";
import { getPokemonList } from "../lib/api";
import useDebounce from "../hooks/useDebounce";
import "../style.css";

interface PokemonItem {
  name: string;
  url: string;
}

export default function Pokedex() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [page, setPage] = useState(1);

  const [allPokemon, setAllPokemon] = useState<PokemonItem[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debounceSearch = useDebounce(search, 500);

  //Fetch list for global search
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getPokemonList(0, 10000);
        setAllPokemon(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
  }, []);

  //initial list
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      setError("");
      try {
        let filtered: PokemonItem[] = [];

        if (debounceSearch || typeFilter !== "all types" || sort) {
          filtered = allPokemon;

          // apply filters
          if (typeFilter !== "all types" && typeFilter !== "") {
            const res = await fetch(
              `https://pokeapi.co/api/v2/type/${typeFilter}`
            );
            const data = await res.json();
            const typePokemonNames = data.pokemon.map(
              (p: any) => p.pokemon.name
            );
            filtered = filtered.filter((p) =>
              typePokemonNames.includes(p.name)
            );
          }

          // for search
          if (debounceSearch) {
            filtered = filtered.filter((p) =>
              p.name.toLowerCase().includes(debounceSearch.toLowerCase())
            );
          }
          //for sort
          if (sort === "name-asc") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sort === "name-desc") {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
          }
          // page
          const start = (page - 1) * 20;
          const end = start + 20;
          setPokemonList(filtered.slice(start, end));
          setTotal(filtered.length);
        } else {
          const data = await getPokemonList((page - 1) * 20, 20);
          setPokemonList(data.results);
          setTotal(data.count);
        }
      } catch (err: any) {
        console.log(err.message);
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [debounceSearch, page, allPokemon, typeFilter, sort]);

  return (
    <>
      <h1 className="pokedex-title">Mini Pokedex</h1>
      <p className="pokedex-subtitle">Pokemon List</p>

      {loading && <p className="pokedex-subtitle">Loading...</p>}
      {error && <p className="pokedex-subtitle">{error}</p>}
      {!loading && pokemonList.length === 0 && (
        <p className="pokedex-subtitle">No results found</p>
      )}

      <div className="filters-container">
        <SearchBar value={search} onChange={setSearch} />
        <TypeFilter value={typeFilter} onChange={setTypeFilter} />
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="pokemon-grid">
        {pokemonList.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
          return <PokemonCard key={p.name} name={p.name} image={image} />;
        })}
      </div>

      <div className="pagination-container">
        <Pagination
          page={page}
          totalPages={Math.ceil(total / 20)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
