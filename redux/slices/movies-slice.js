import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdOfGenre } from "../../utils/genre_helper";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDM0NWIxOTQxNjE0NDFjNjI5MzE2OTgyZTE2NWFiYyIsInN1YiI6IjY2M2YzZWU1Y2VhNGFiNTNmZTQ3YmM3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TxrqjF-6rIjELu0O328X3CkdDgEjT2gGI2YVcOcMbXE",
};
const initialState = {
  movies: [],
  filteredMovies: [],
  filteredTopratedMovies: [],
  similarMovies: [],
  trendingMovies: [],
  topratedMovies: [],
  favoriteMovies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/upcoming", {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data;
});

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);
export const fetchSimilarMovies = createAsyncThunk(
  "movies/fetchSimilarMovies",
  async (movieID) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();
    return data;
  }
);
export const fetchTopratedMovies = createAsyncThunk(
  "movies/fetchTopratedMovies",
  async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies: (state, action) => {
      const query = action.payload.toLowerCase();

      state.filteredMovies = state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );
    },
    clearSearchResults: (state) => {
      state.filteredMovies = state.movies;
    },
    filterByGenre: (state, action) => {
      const genre = action.payload;
      state.filteredMovies = state.movies.filter((movie) =>
        movie.genre_ids.includes(getIdOfGenre(genre))
      );
      state.filteredTopratedMovies = state.topratedMovies.filter((movie) =>
        movie.genre_ids.includes(getIdOfGenre(genre))
      );
    },
    toggleFavorite: (state, action) => {
      const movieF = action.payload;
      const index = state.favoriteMovies.findIndex(
        (movie) => movie.id === movieF.id
      );
      if (index !== -1) {
        state.favoriteMovies.splice(index, 1);
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
    // checkIfLiked: (state, action) => {
    //   const movieF = action.payload;
    //   const index = state.favoriteMovies?.findIndex(
    //     (movie) => movie.id === movieF
    //   );

    //   if (index !== -1) return true;
    //   else return false;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.filteredMovies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload.results;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload.results;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTopratedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopratedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topratedMovies = state.filteredTopratedMovies =
          action.payload.results;
      })
      .addCase(fetchTopratedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  searchMovies,
  clearSearchResults,
  filterByGenre,
  toggleFavorite,
  checkIfLiked,
} = movieSlice.actions;
export default movieSlice.reducer;
