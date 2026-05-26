import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { tmdbApi } from '../services/tmdbApi'

function Search() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setPage(1)
    setMovies([])
  }, [query])

  useEffect(() => {
    if (!query) return

    const searchMovies = async () => {
      try {
        setLoading(true)
        const response = await tmdbApi.searchMovies(query, page)
        setMovies(response.data.results)
        setTotalPages(response.data.total_pages)
      } catch (err) {
        setError(err.message)
        console.error('Search failed:', err)
      } finally {
        setLoading(false)
      }
    }

    searchMovies()
  }, [query, page])

  if (!query) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-dark-700">Enter a movie title to search</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Search Results for "{query}"
        </h1>
        <p className="text-dark-700 mt-2">
          Found {movies.length} movies
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-primary rounded-lg p-4">
          <p className="text-primary font-semibold">Error: {error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-dark-700 aspect-[2/3] rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Movies Grid */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayClick={(id) => navigate(`/watch/${id}`)}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-dark-700">No movies found</p>
          <p className="text-dark-700 mt-2">Try searching for something else</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span className="text-white">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

export default Search
