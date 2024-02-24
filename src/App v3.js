// import { useEffect, useRef, useState } from "react";
// import StarRating from "./StarRating.js";
// import { useKey } from "./useKey.js";
// import { useMovies } from "./useMovie.js";
// import { useLocalStorageState } from "./UseLocalStorageState.js";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// export default function App() {
//   const [query, setQuery] = useState(" ");

//   const [selectedId, setSelectedId] = useState(null);
//   // const [watched, setWatched] = useState([]);

//   const [watched, setWatched] = useLocalStorageState([], "watched");
//   const KEY = "80dd5fff";

//   // const tempQuery = "interstellar"

//   function handleSelectedId(id) {
//     setSelectedId((currentId) => (id === currentId ? null : id));
//   }
//   function handleCloseMovie() {
//     setSelectedId(null);
//   }
//   function handleAddWatched(movie) {
//     setWatched((watched) => [...watched, movie]);
//     // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
//   }
//   function handleDeleteWatched(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }

//   const { movies, isLoading, error } = useMovies(query);

//   // Assuming all are inside a render logic
//   // useEffect(function(){
//   //   console.log(After initial render)
//   // },[])

//   // useEffect(function(){
//   //   console.log(After every render)
//   // })
//   // useEffect(function(){
//   //   console.log(After every render)
//   // }, [query])
//   // console.log("During render ")

//   return (
//     <>
//       <NavBar>
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </NavBar>
//       <Main>
//         {/* <Box movies={movies} element={<MovieList movies={movies} />} />
//         <Box movies={movies} element={<><WatchedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} /></>} /> */}

//         <Box movies={movies}>
//           {isLoading ? (
//             <Loader />
//           ) : error ? (
//             <ErrorMessage message={error} />
//           ) : (
//             <MovieList movies={movies} setSelectedMovie={handleSelectedId} />
//           )}

//           {/* {isLoading && <Loader />}
//           {!isLoading && !error && <MovieList movies={movies} />}
//           {error && <ErrorMessage message={error} />} */}
//         </Box>

//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onCloseMovie={handleCloseMovie}
//               onAddWatchedMovie={handleAddWatched}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMoviesList
//                 watched={watched}
//                 onDeleteWatched={handleDeleteWatched}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }

// function Loader() {
//   return <p className="loader">Loading...</p>;
// }
// function ErrorMessage({ message }) {
//   // console.log("error")
//   return (
//     <p className="error">
//       <span>🔥</span> {message}
//     </p>
//   );
// }
// function NavBar({ children }) {
//   return (
//     <nav className="nav-bar">
//       <Logo />
//       {children}
//     </nav>
//   );
// }

// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }
// function Search({ query, setQuery }) {
//   const inputEl = useRef(null);

//   useKey("Enter", function (e) {
//     if (document.activeElement === inputEl.current) return;
//     console.log(inputEl.current);
//     inputEl.current.focus();
//     setQuery("");
//   });

//   // useEffect(function () {
//   //   const el = document.querySelector('.search')
//   //   console.log(el)
//   //   el.focus()
//   // })

//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       ref={inputEl}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }

// function NumResults({ movies }) {
//   return (
//     <p className="num-results">
//       Found <strong>{movies.length}</strong> results
//     </p>
//   );
// }

// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }

// function MovieDetails({
//   selectedId,
//   onCloseMovie,
//   onAddWatchedMovie,
//   watched,
// }) {
//   // console.log(onAddWatchedMovie)
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState("");
//   const [avgRating, setAvgRating] = useState(0);

//   const countRef = useRef(0);
//   useEffect(
//     function () {
//       if (userRating) countRef.current++;
//     },
//     [userRating]
//   );
//   console.log(countRef);

//   const isWatched = watched
//     .map((watched) => watched.imdbID)
//     .includes(selectedId);
//   const watchedUserRating = watched.find(
//     (watched) => watched.imdbID === selectedId
//   )?.userRating;
//   const KEY = "80dd5fff";
//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actor: actor,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: selectedId,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(" ").at(0)),
//       userRating,
//       countRatingDecisions: countRef.current,
//     };
//     // console.log(newWatchedMovie.imdbRating)
//     onAddWatchedMovie(newWatchedMovie);
//     // onCloseMovie()
//     // setAvgRating(Number(imdbRating))
//     // setAvgRating((avgRating) => (avgRating + userRating) / 2)
//     console.log(avgRating);
//   }

//   useKey("Escape", onCloseMovie);

//split 1
//   useEffect(
//     function () {
//       setIsLoading(true);
//       async function getMovieDetails() {
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
//         );
//         const data = await res.json();
//         setMovie(data);
//         setIsLoading(false);
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;

//       return function () {
//         document.title = "usepopcorn";
//         // console.log(`Clean up effect for movie |  ${title}`)
//       };
//     },
//     [title]
//   );
//   return (
//     <div className="details">
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${movie} movie`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>🌟</span>
//                 {imdbRating} IMDb rating
//               </p>
//             </div>
//           </header>

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   <StarRating
//                     maxRating={10}
//                     size={24}
//                     onSetRating={setUserRating}
//                   />
//                   {userRating && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       {" "}
//                       + Add to list{" "}
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   {" "}
//                   You rated this movie with {watchedUserRating}
//                   <span>🌟</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actor}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// /*
// step 2
// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//       const [isOpen2, setIsOpen2] = useState(true);

//       return (
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <WatchedSummary watched={watched} />
//             <WatchedMoviesList watched={watched} />
//           </>
//         )}
//       </div>
//       )
// }
//       */

// function MovieList({ movies, setSelectedMovie }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie, i) => (
//         <Movie
//           movie={movie}
//           setSelectedMovie={setSelectedMovie}
//           key={movie.imdbID}
//         />
//       ))}
//     </ul>
//   );
// }

// function Movie({ movie, setSelectedMovie }) {
//   return (
//     <li onClick={() => setSelectedMovie(movie.imdbID)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime.toFixed(2)} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }
// step 3
// function WatchedMoviesList({ watched, onDeleteWatched }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <WatchedMovies
//           movie={movie}
//           onDeleteWatched={onDeleteWatched}
//           key={movie.imdbID}
//         />
//       ))}
//     </ul>
//   );
// }
// step 4
// function WatchedMovies({ movie, onDeleteWatched }) {
//   // console.log(movie.runtime)

//   return (
//     <li>
//       <img src={movie.poster} alt={`${movie.title} poster`} />
//       <h3>{movie.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>
//         <button
//           className="btn-delete"
//           onClick={() => onDeleteWatched(movie.imdbID)}
//         >
//           X
//         </button>
//       </div>
//     </li>
//   );
// }

// new Practice with javaScript

import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovie v1";
import { useLocalStorageState } from "./useLocalStorageState v2";
import { useKey } from "./usekey v1";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const key = "80dd5fff";

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const tempQuery = `beauty`;

  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies}></NumResults>
      </NavBar>
      <Main>
        {/* Explicitly passing in the props */}
        {/* <Box element={<MovieList movies={movies}></MovieList>} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMoviesList
                watched={watched}
                key={watched.imdbID}
              ></WatchedMoviesList>
            </>
          }
        ></Box> */}
        <Box>
          {/* {isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} key={movies.imdbID}></MovieList>
          )} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectedId}
              key={movies.imdbID}
            ></MovieList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MoviesDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleWatched}
              watched={watched}
              key={watched.imdbID}
            />
          ) : (
            <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              ></WatchedMoviesList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  return <p className="loader">Loading....</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🔥</span>
      {message}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  // console.log(el)
  //   el.focus();
  // }, []);

  const inputEl = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie, onAddWatched }) {
  return (
    <ul className="list  list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          onSelectMovie={onSelectMovie}
          onAddWatched={onAddWatched}
          key={movie.imdbID}
        ></Movie>
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MoviesDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  let count = 0;
  useEffect(
    function () {
      if (userRating) countRef.current++;
      if (userRating) count++;
    },
    [userRating, count]
  );

  const iswatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actor: actor,
    Director: director,
    Genre: genre,
  } = movie;

  /* eslint-disable */
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  // console.log(isTop);

  // if (imdbRating > 8) return <p>Greatest ever!</p>;
  // const [isTop, setIsTop] = useState(true);
  // useEffect(
  //   function () {
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );
  // const isTop = imdbRating > 8;
  // console.log(isTop);

  const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ").at(0),
      userRating,
      countRatingDecision: [countRef.current],
      count,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();

    // setAvgRating(imdbRating);
    // setAvgRating((x) => (x + userRating) / 2);
  }
  useKey("Escape", onCloseMovie);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //         // console.log("ClOSING");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },

  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );

        // if (!res.ok) throw new Error(`Something went wrong`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
      return function () {
        document.title = "usePopCorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAdd();
                      }}
                    >
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p style={{ textAlign: "center" }}>
                  You rated this movie with {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => Number(movie.imdbRating))
  );
  const avgUserRating = average(
    watched.map((movie) => Number(movie.userRating))
  );
  const avgRuntime = average(watched.map((movie) => Number(movie.runtime)));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          onDeleteWatched={onDeleteWatched}
          key={movie.imdbID}
        ></WatchedMovie>
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          x
        </button>
      </div>
    </li>
  );
}
