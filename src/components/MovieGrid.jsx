import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'

function MovieGrid({ title, movies, loading, error }) {
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-dark-700 aspect-[2/3] rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-20 border border-primary rounded-lg p-4">
        <p className="text-primary font-semibold">Error loading movies: {error}</p>
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onPlayClick={(id) => navigate(`/watch/${id}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieGrid
