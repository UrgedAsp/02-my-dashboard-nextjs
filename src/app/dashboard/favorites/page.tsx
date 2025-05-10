import { PokemonGrid } from "@/pokemons";

export const metadata = {
  title: "Favoritos",
  description: "Pokémon List",
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokémons Agregados <small className="text-blue-500">Global State</small>
        <PokemonGrid pokemons={[]} />
      </span>
    </div>
  );
}
