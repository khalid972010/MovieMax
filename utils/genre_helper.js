const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const getIdOfGenre = (genreName) => {
  const foundGenre = genres.find((genre) => genre.name === genreName);
  return foundGenre ? foundGenre.id : null;
};

export const getNameOfGenre = (genreId) => {
  const foundGenre = genres.find((genre) => genre.id === genreId);
  return foundGenre ? foundGenre.name : "None";
};
