import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPokemons } from "../page";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  try {
    const { name: nameParams } = await params;
    const { name } = await getPokemon(nameParams);

    return {
      title: `Pokémon ${name}`,
      description: "Hola Mundo",
    };
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    return {
      title: "Pokémon no encontrado",
      description: "No se encontró el Pokémon",
    };
  }
}

const getPokemon = async (pokemon: string): Promise<Pokemon> => {
  console.log("pokemon", pokemon);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    ).then((res) => res.json());

    return response;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    notFound();
  }
};

// ! En build time, Next.js generará las rutas estáticas para cada id
export async function generateStaticParams() {
  const pokemons = await getPokemons(151, 0);
  const static151Params = pokemons.map((pokemon) => ({
    name: pokemon.name,
  }));

  return static151Params;
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemonResponse = await getPokemon(name);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemonResponse.id} {pokemonResponse.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={
                pokemonResponse.sprites.other?.dream_world.front_default ?? ""
              }
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemonResponse.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemonResponse.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemonResponse.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemonResponse.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemonResponse.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemonResponse.name}`}
              />

              <Image
                src={pokemonResponse.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemonResponse.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemonResponse.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemonResponse.name}`}
              />

              <Image
                src={pokemonResponse.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemonResponse.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
