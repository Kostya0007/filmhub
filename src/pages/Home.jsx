import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import MovieGrid from '../components/MovieGrid'
import { tmdbApi } from '../services/tmdbApi'

function Home() {
  const navigate = useNavigate()
  const [heroMovie, setHeroMovie] = useState(null)
  const [popularMovies, setPopularMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const [popular, trending, topRated, upcoming] = await Promise.all([
          tmdbApi.getPopular(),
          tmdbApi.getTrending(),
          tmdbApi.getTopRated(),
          tmdbApi.getUpcoming(),
        ])

        const allPopular = popular.data.results.filter((m) => m.backdrop_path)
        setPopularMovies(allPopular)
        setHeroMovie(allPopular[Math.floor(Math.random() * Math.min(5, allPopular.length))])
        setTrendingMovies(trending.data.results)
        setTopRatedMovies(topRated.data.results)
        setUpcomingMovies(upcoming.data.results)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch movies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handlePlayClick = (movieId) => {
    navigate(`/watch/${movieId}`)
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Hero Banner */}
      {!loading && heroMovie && (
        <HeroBanner movie={heroMovie} onPlayClick={handlePlayClick} />
      )}

      {/* Movie Categories */}
      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-primary rounded-lg p-4">
          <p className="text-primary font-semibold">Error: {error}</p>
        </div>
      )}

      <MovieGrid
        title="Popular Now"
        movies={popularMovies}
        loading={loading}
        onPlayClick={handlePlayClick}
      />

      <MovieGrid
        title="Trending This Week"
        movies={trendingMovies}
        loading={loading}
        onPlayClick={handlePlayClick}
      />

      <MovieGrid
        title="Top Rated"
        movies={topRatedMovies}
        loading={loading}
        onPlayClick={handlePlayClick}
      />

      <MovieGrid
        title="Coming Soon"
        movies={upcomingMovies}
        loading={loading}
        onPlayClick={handlePlayClick}
      />
    </div>
  )
}

export default Home
