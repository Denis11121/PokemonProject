import { Link, useSearchParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";
import "../style.css";
import StatBar from "../components/StatBar";

export default function PokemonDetails() {
  const [params] = useSearchParams();
  const name = params.get("name");

  // const name = params.name;
  console.log(name);
  const { data, loading, error } = usePokemon(name!);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No Data Found</p>;

  return (
    <div className="container">
      <Link to="/">
        <button>Home</button>
      </Link>
      <h1>
        ID#{data.id} {data.name}
      </h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <h2>Pokemon Details</h2>
      <p className="pokemon-info">Height: {data.height}</p>
      <p className="pokemon-info">Weight: {data.weight}</p>

      <h2>Types</h2>

      <ul className="type-list">
        {data.types.map((t: any) => (
          <li key={t.type.name}>{t.type.name}</li>
        ))}
      </ul>

      <h2>Stats</h2>
      {data.stats.map((s: any) => (
        <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
      ))}
    </div>
  );
}
