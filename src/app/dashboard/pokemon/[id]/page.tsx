import { Pokemon } from "@/pokemons";
import { Metadata } from "next";

interface PokemonPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const { name, id } = await getPokemon(params.id);

  return {
    title: `Pokémon ${name}`,
    description: "Hola Mundo",
  };
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (res) => res.json()
  );
  return pokemon;
};

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await getPokemon(params.id);

  return (
    <div>
      <h1>Pokémon {params.id}</h1>
      <div>{pokemon.name}</div>
    </div>
  );
}
