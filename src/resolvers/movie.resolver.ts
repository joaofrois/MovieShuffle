import { Movie } from "@/models/Movies";
import { TMDBService } from "@/services/tmdb.service";

const tmdbService = new TMDBService();

export const resolvers = {
  Query: {
    randomMovies: async (): Promise<Movie[]> => {
      return await tmdbService.getRandomMovies();
    },
  },
};
