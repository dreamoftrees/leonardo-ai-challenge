import { gql } from "@apollo/client/core";

/**
 * GraphQL query to fetch paginated characters from Rick and Morty API
 */
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        image
        episode {
          id
          name
        }
        created
      }
    }
  }
`;

/**
 * GraphQL query to fetch a single character by ID
 */
export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;

/**
 * Pagination info from the API
 */
export interface PaginationInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

/**
 * Location reference
 */
export interface LocationRef {
  id: string;
  name: string;
}

/**
 * Episode reference
 */
export interface EpisodeRef {
  id: string;
  name: string;
  air_date?: string;
  episode?: string;
}

/**
 * Character type from the Rick and Morty API
 */
export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: LocationRef;
  location: LocationRef;
  image: string;
  episode: EpisodeRef[];
  created: string;
}

/**
 * Response type for GetCharacters query
 */
export interface GetCharactersResponse {
  characters: {
    info: PaginationInfo;
    results: Character[];
  };
}

/**
 * Response type for GetCharacter query
 */
export interface GetCharacterResponse {
  character: Character;
}
