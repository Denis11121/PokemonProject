import { Link } from "react-router-dom";
import "../style.css";

interface Props {
  name: string;
  image: string;
}

export default function PokemonCard({ name, image }: Props) {
  return (
    <div className="pokemon-card">
      <h3>
        <Link to={`/details?name=${name}`}>{name}</Link>
      </h3>
      <img src={image} alt={name} width={120} height={120} />
    </div>
  );
}
