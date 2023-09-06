import { useEffect, useState } from "react"

export function useMovie(query, handleCloseMovie) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrorMessage] = useState("")
    const KEY = "80dd5fff"

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

                if (error.name !== "AbortError") {
                    console.log(error.message)
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
        handleCloseMovie?.()
        fetchMovie();

        return function () {
            controller.abort()
        }
    }, [query])

    return { movies, isLoading, error }

}