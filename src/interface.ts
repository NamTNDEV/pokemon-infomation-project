export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonDetail extends Pokemon {
  abilities?: {
    name: string;
    ability: string;
  }[];
}

export interface Detail {
  id: number;
  isOpened: boolean;
}
