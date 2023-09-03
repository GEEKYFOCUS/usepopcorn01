import { useEffect, useState } from "react";
import StarRating from "./StarRating.js"

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(" ");
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setErrorMessage] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const KEY = "80dd5fff"
  const tempQuery = "interstellar"


  function handleSelectedId(id) {
    setSelectedId((currentId) => id === currentId ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }


  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true)
        setErrorMessage("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
        if (!res.ok) throw new Error("Something went wrong while fetching")
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found")
        // console.log(data)
        setMovies(data.Search);
        setErrorMessage("")


      } catch (error) {
        console.log(error.message)
        if (error.name !== "AbortError") {
          setErrorMessage(error.message)
        }
      } finally {
        setIsLoading(false)
      }


    }

    if (query.length < 3) {
      setMovies([])
      setErrorMessage("")
      return;
    }
    handleCloseMovie()
    fetchMovie();

    return function () {
      controller.abort()
    }
  }, [query])




  // Assuming all are inside a render logic 
  // useEffect(function(){
  //   console.log(After initial render)
  // },[])

  // useEffect(function(){  
  //   console.log(After every render)
  // })
  // useEffect(function(){
  //   console.log(After every render)
  // }, [query])
  // console.log("During renfer ")

  return (
    <>
      <NavBar >
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar >
      <Main>
        {/* <Box movies={movies} element={<MovieList movies={movies} />} />
        <Box movies={movies} element={<><WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} /></>} /> */}

        <Box movies={movies}>
          {isLoading ? <Loader /> : error ?
            <ErrorMessage message={error} /> :
            <MovieList movies={movies} setSelectedMovie={handleSelectedId} />}

          {/* {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />} */}
        </Box >

        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatchedMovie={handleAddWatched} watched={watched} /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main >
    </>
  );
}

function Loader() {
  return (
    <p className="loader">Loading...</p>
  )
}
function ErrorMessage({ message }) {
  // console.log("error")
  return (
    <p className="error">
      <span>🔥</span> {message}
    </p>
  )
}
function NavBar({ children }) {

  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function Logo() {
  return (<div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>)
}
function Search({ query, setQuery }) {

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />)
}

function NumResults({ movies }) {

  return (<p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>)
}


function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }) {

  const [isOpen, setIsOpen] = useState(true);
  return (

    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (children)}
    </div>
  )
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatchedMovie, watched }) {
  // console.log(onAddWatchedMovie)
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState("")
  const isWatched = watched.map((watched) => watched.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((watched) => watched.imdbID === selectedId)?.userRating
  const KEY = "80dd5fff"
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
    Genre: genre
  } = movie

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: (Number(imdbRating)),
      runtime: Number(runtime.split(" ").at(0)),
      userRating
    }
    console.log(newWatchedMovie.imdbRating)
    onAddWatchedMovie(newWatchedMovie)
    onCloseMovie()
  }
  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie()
        console.log('ClosedMovie')
      }
    }

    document.addEventListener("keydown", callback)

    return function () {
      document.removeEventListener("keydown", callback)
    }
  }, [onCloseMovie])
  useEffect(function () {
    setIsLoading(true)
    async function getMovieDetails() {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json();
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`

    return function () {
      document.title = "usepopcorn"
      // console.log(`Clean up effect for movie |  ${title}`)
    }
  }, [title])
  return (
    <div className="details">
      {isLoading ?
        <Loader /> :
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie} >&larr;</button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>
                <span>🌟</span>{imdbRating} IMDb  rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  < StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating && <button className="btn-add" onClick={handleAdd}> + Add to list </button>}
                </> :
                <p> You rated this movie with {watchedUserRating} <span>🌟</span>x</p>
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Directed by {director}</p>
          </section>
        </>}
    </div >

  )
}


/*
function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
      const [isOpen2, setIsOpen2] = useState(true);


      return (
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>
        {isOpen2 && (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        )}
      </div>
      )
}
      */


function MovieList({ movies, setSelectedMovie }) {

  return (
    <ul className="list list-movies">
      {movies?.map((movie, i) => (
        <Movie movie={movie} setSelectedMovie={setSelectedMovie} key={movie.imdbID} />
      ))}
    </ul>
  )
}

function Movie({ movie, setSelectedMovie }) {
  return (
    <li onClick={() => setSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}


function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
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
  )
}
function WatchedMoviesList({ watched, onDeleteWatched }) {

  return (<ul className="list">
    {watched.map((movie) => (
      <WatchedMovies movie={movie} onDeleteWatched={onDeleteWatched} key={movie.imdbID} />
    ))}
  </ul>)
}


function WatchedMovies({ movie, onDeleteWatched }) {
  // console.log(movie.runtime)
  return (
    <li >
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
        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li >
  )
}


