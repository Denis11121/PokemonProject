const API_BASE = "https://pokeapi.co/api/v2";

export async function getPokemonList(offset = 0, limit = 20) {
  const res = await fetch(
    `${API_BASE}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error("failed to fetch list");
  return res.json();
}

export async function getPokemon(name: string) {
  const res = await fetch(`${API_BASE}/pokemon/${name}`);
  if (!res.ok) throw new Error("failed to fetch pokemon");
  return res.json();
}
