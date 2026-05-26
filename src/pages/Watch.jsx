import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import MovieCard from '../components/MovieCard'
import { tmdbApi, getImageUrl } from '../services/tmdbApi'
import { useContinueWatching } from '../hooks'

function Watch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoSrc, setVideoSrc] = useState(null)
  const { addToContinueWatching } = useContinueWatching()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const response = await tmdbApi.getMovieDetails(id)
        setMovie(response.data)

        // Use demo video for now - in production, this would be real streaming
        setVideoSrc(
          'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4'
        )
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch movie:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleTimeUpdate = (time) => {
    if (movie) {
      addToContinueWatching(movie, time)
    }
  }

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
    <div className="space-y-8 bg-dark-900">
      {/* Video Player */}
      <div className="w-full">
        {videoSrc && (
          <VideoPlayer
            src={videoSrc}
            title={movie.title}
            onTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>

      {/* Movie Info */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-yellow-400">⭐ {movie.vote_average?.toFixed(1)}</span>
            <span className="text-dark-700">{movie.runtime} min</span>
            <span className="text-dark-700">
              {new Date(movie.release_date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <p className="text-dark-700 text-base leading-relaxed max-w-4xl">
          {movie.overview}
        </p>

        {/* Quick Links */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn-secondary"
          >
            More Info
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Similar Movies */}
      {movie.similar?.results && movie.similar.results.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <h2 className="text-2xl font-bold text-white">More Like This</h2>
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
  )
}

export default Watch
