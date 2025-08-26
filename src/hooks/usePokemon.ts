import { useEffect, useState } from "react";
import { getPokemon } from "../lib/api";

export function usePokemon(name: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getPokemon(name)
      .then((d) => setData(d))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  return { data, loading, error };
}
