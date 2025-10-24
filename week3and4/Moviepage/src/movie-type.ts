export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline?: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}
