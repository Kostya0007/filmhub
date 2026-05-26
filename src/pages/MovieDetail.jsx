import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tmdbApi, getImageUrl } from '../services/tmdbApi'
import MovieCard from '../components/MovieCard'
import { useFavorites } from '../hooks'

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTrailer, setSelectedTrailer] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const response = await tmdbApi.getMovieDetails(id)
        setMovie(response.data)

        // Get first trailer
        const trailers = response.data.videos?.results.filter(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailers?.length > 0) {
          setSelectedTrailer(trailers[0])
        }
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch movie:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-dark-700">Loading...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl text-primary">Movie not found</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 space-y-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path, 'w342')}
              alt={movie.title}
              className="w-48 h-auto rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-dark-700 italic">{movie.tagline}</p>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-dark-800 p-4 rounded">
                <p className="text-dark-700 text-sm">Rating</p>
                <p className="text-2xl font-bold text-yellow-400">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
              <div className="bg-dark-800 p-4 rounded">
                <p className="text-dark-700 text-sm">Release</p>
                <p className="text-lg font-bold text-white">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-dark-800 p-4 rounded">
                <p className="text-dark-700 text-sm">Duration</p>
                <p className="text-lg font-bold text-white">{movie.runtime} min</p>
              </div>
              <div className="bg-dark-800 p-4 rounded">
                <p className="text-dark-700 text-sm">Status</p>
                <p className="text-lg font-bold text-white">{movie.status}</p>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-dark-800 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate(`/watch/${movie.id}`)}
                className="btn-primary flex items-center gap-2"
              >
                <span>▶️</span>
                Watch Now
              </button>
              <button
                onClick={() => toggleFavorite(movie)}
                className={`btn-secondary flex items-center gap-2 ${
                  isFavorite(movie.id) ? 'bg-primary' : ''
                }`}
              >
                <span>{isFavorite(movie.id) ? '❤️' : '🤍'}</span>
                {isFavorite(movie.id) ? 'Favorited' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-dark-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-3">Overview</h2>
          <p className="text-dark-700 leading-relaxed">{movie.overview}</p>
        </div>

        {/* Trailer */}
        {selectedTrailer && (
          <div className="bg-dark-800 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Trailer</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                title={selectedTrailer.name}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Cast */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="bg-dark-800 rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="text-center">
                  {actor.profile_path && (
                    <img
                      src={getImageUrl(actor.profile_path, 'w185')}
                      alt={actor.name}
                      className="w-full rounded-lg mb-2"
                    />
                  )}
                  <p className="text-sm font-semibold text-white">{actor.name}</p>
                  <p className="text-xs text-dark-700">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movie.similar.results.slice(0, 10).map((similarMovie) => (
                <MovieCard
                  key={similarMovie.id}
                  movie={similarMovie}
                  onPlayClick={(id) => navigate(`/watch/${id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDetail
