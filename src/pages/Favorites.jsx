import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { useFavorites } from '../hooks'

function Favorites() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-white">My Favorites</h1>
        <p className="text-dark-700 mt-2">
          {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlayClick={(id) => navigate(`/watch/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl text-dark-700 mb-4">No favorites yet</p>
          <p className="text-dark-700 mb-6">
            Add movies to your favorites to see them here
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Browse Movies
          </button>
        </div>
      )}
    </div>
  )
}

export default Favorites
