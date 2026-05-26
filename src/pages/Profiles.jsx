import { useNavigate } from 'react-router-dom'
import { useContinueWatching } from '../hooks'

function Profiles() {
  const navigate = useNavigate()
  const { continueWatching } = useContinueWatching()

  const defaultProfiles = [
    { id: 1, name: 'Main Profile', emoji: '👤', color: 'bg-primary' },
    { id: 2, name: 'Kid Profile', emoji: '👧', color: 'bg-blue-600' },
    { id: 3, name: 'Other Profile', emoji: '👨', color: 'bg-purple-600' },
  ]

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-white">Profiles</h1>
        <p className="text-dark-700 mt-2">Select or create a profile to continue</p>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {defaultProfiles.map((profile) => (
          <div
            key={profile.id}
            className="text-center cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className={`${profile.color} w-24 h-24 mx-auto rounded-lg flex items-center justify-center text-5xl group-hover:scale-110 transition-transform`}>
              {profile.emoji}
            </div>
            <p className="text-white font-semibold mt-3 group-hover:text-primary transition-colors">
              {profile.name}
            </p>
          </div>
        ))}
      </div>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <div className="space-y-4 mt-12">
          <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {continueWatching.map((movie) => (
              <div
                key={movie.id}
                className="cursor-pointer group relative"
                onClick={() => navigate(`/watch/${movie.id}`)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''}
                    alt={movie.title}
                    className="w-full h-auto rounded-lg group-hover:scale-110 transition-transform"
                  />
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 w-full h-1 bg-dark-700">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: movie.duration ? `${(movie.timestamp / movie.duration) * 100}%` : '0%',
                      }}
                    />
                  </div>
                </div>
                <p className="text-white font-semibold mt-2 text-sm truncate">
                  {movie.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profiles
