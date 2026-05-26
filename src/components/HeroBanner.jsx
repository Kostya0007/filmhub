import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getImageUrl } from '../services/tmdbApi'

function HeroBanner({ movie, onPlayClick }) {
  const navigate = useNavigate()
  const [imageLoaded, setImageLoaded] = useState(false)

  if (!movie) return null

  return (
    <div className="relative w-full h-screen max-h-[600px] overflow-hidden rounded-lg shadow-2xl group cursor-pointer">
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        onLoad={() => setImageLoaded(true)}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900 via-30% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center p-6 sm:p-12">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            {movie.title}
          </h1>

          {/* Info */}
          <div className="flex items-center gap-4 text-sm sm:text-base">
            <span className="flex items-center gap-1 text-yellow-400">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-dark-700">
              {new Date(movie.release_date).getFullYear()}
            </span>
            {movie.runtime && (
              <span className="text-dark-700">
                ⏱️ {movie.runtime} min
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-dark-700 line-clamp-3 max-w-xl">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => onPlayClick?.(movie.id)}
              className="btn-primary flex items-center gap-2 group/btn"
            >
              <span className="group-hover/btn:scale-125 transition-transform">▶️</span>
              Play
            </button>
            <button
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="btn-secondary flex items-center gap-2"
            >
              <span>ℹ️</span>
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Autoplay indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-dark-700 bg-dark-900 bg-opacity-50 px-3 py-1 rounded">
        Autoplay enabled
      </div>
    </div>
  )
}

export default HeroBanner
