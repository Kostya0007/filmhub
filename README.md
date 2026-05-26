![FilmHub](https://img.shields.io/badge/FilmHub-Netflix%20Style%20Movie%20Streaming-red)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

# 🎬 FilmHub - Netflix-Style Movie Streaming App

A modern, responsive movie streaming application built with React, Vite, Tailwind CSS, and the TMDB API. Browse, search, and watch trailers for thousands of movies with a sleek Netflix-inspired UI.

## ✨ Features

### 🏠 Home Page
- Dynamic hero banner with popular movies
- Autoplay functionality
- Multiple movie categories (Popular, Trending, Top Rated, Upcoming)
- Smooth carousel and grid layouts
- Responsive design for all devices

### 🔍 Search
- Real-time movie search
- Pagination support
- Advanced filtering options
- Search history (future feature)

### 🎥 Movie Details
- Complete movie information
- Ratings, release date, duration
- Genre tags
- Cast information
- Trailer playback via YouTube embed
- Similar movies recommendations
- Full movie overview

### ▶️ Watch Player
- Full-featured HTML5 video player
- Keyboard shortcuts:
  - **Space**: Play/Pause
  - **F**: Fullscreen
  - **Arrow Keys**: Seek ±5 seconds / Volume control
  - **M**: Mute/Unmute
- Progress bar with timeline
- Volume control
- Fullscreen support
- Playback time tracking

### ❤️ Favorites
- Add/remove movies from favorites
- Persistent storage with LocalStorage
- Quick access to favorite movies
- Favorite status indicator on movie cards

### 👤 Profiles
- Multiple user profiles (UI ready)
- Profile selection screen
- Continue watching section
- Progress tracking for watched movies

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Hamburger menu on mobile
- Touch-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- TMDB API Key (get it at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kostya0007/filmhub.git
   cd filmhub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Add your TMDB API Key**
   Edit `.env` and add your API key:
   ```env
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
filmhub/
├── src/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── MovieGrid.jsx
│   │   └── VideoPlayer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Watch.jsx
│   │   ├── Favorites.jsx
│   │   └── Profiles.jsx
│   ├── services/
│   │   └── tmdbApi.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useFavorites.js
│   │   ├── useContinueWatching.js
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env.example
```

## 🎨 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router 6.20
- **HTTP Client**: Axios 1.6
- **Data Source**: TMDB API
- **State Management**: React Hooks
- **Storage**: LocalStorage

## 📺 Data Source

All movie data is fetched from the [TMDB API](https://www.themoviedb.org/settings/api).
- Movies database
- Movie posters and backdrops
- Ratings and reviews
- Cast information
- Trailer links (YouTube)

## 🔒 Environment Variables

```env
VITE_TMDB_API_KEY=<your_tmdb_api_key>
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Create pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ by [Kostya0007](https://github.com/Kostya0007)**

⭐ If you like this project, please give it a star!
