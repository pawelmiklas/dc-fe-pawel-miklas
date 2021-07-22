export type Character = {
  id: string;
  name: string;
  species: string;
  gender: string;
  episode: {
    id: string;
    episode: string;
  }[];
  image: string;
};
