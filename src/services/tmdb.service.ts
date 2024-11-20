import { MoviesListDTO } from "@/models/api/movies";
import { Movie } from "@/models/Movies";
import { getRandomPages } from "@/utils/utils";
import axios from "axios";

export class TMDBService {
  private baseUrl = process.env.TMDB_API_BASE_URL || "";
  private apiKey = process.env.TMDB_API_KEY || "";

  async getTotalPages(): Promise<number> {
    const response = await axios.get<MoviesListDTO>(
      `${this.baseUrl}discover/movie`,
      {
        params: {
          api_key: this.apiKey,
          language: "en-US",
          include_adult: false,
          include_video: false,
          sort_by: "vote_count.desc",
          vote_average_gte: 6.5,
          vote_count_gte: 250,
          page: 1,
        },
      }
    );

    return Math.min(response.data.total_pages, 500);
  }

  async getMoviesFromPages(pages: number[]): Promise<Movie[]> {
    try {
      const promises = pages.map((page) =>
        axios.get(`${this.baseUrl}discover/movie`, {
          params: {
            api_key: this.apiKey,
            language: "en-US",
            include_adult: false,
            include_video: false,
            sort_by: "vote_count.desc",
            vote_average_gte: 6.5,
            vote_count_gte: 250,
            page: page,
          },
        })
      );

      const responses = await Promise.all(promises);

      return responses.map((response) => {
        const movies = response.data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const movie = movies[randomIndex];

        return {
          title: movie.title,
          description: movie.overview,
          posterUrl: `${process.env.TMDB_IMAGE_URL}${movie.poster_path}`,
          rating: movie.vote_average,
        };
      });
    } catch (error) {
      console.error("Error fetching movies from pages:", error);
      return [];
    }
  }
  async getRandomMovies(): Promise<Movie[]> {
    const totalPages = await this.getTotalPages();
    const randomPages = getRandomPages(totalPages, 4);
    return await this.getMoviesFromPages(randomPages);
  }
}
