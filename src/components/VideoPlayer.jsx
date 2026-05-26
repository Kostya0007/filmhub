import { useState, useRef, useEffect } from 'react'

function VideoPlayer({ src, title, onTimeUpdate }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)
      onTimeUpdate?.(time)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
        setIsFullscreen(false)
      } else {
        videoRef.current.parentElement.requestFullscreen()
        setIsFullscreen(true)
      }
    }
  }

  const showControlsHandler = () => {
    setShowControls(true)
    clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    document.addEventListener('mousemove', showControlsHandler)
    return () => document.removeEventListener('mousemove', showControlsHandler)
  }, [isPlaying])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!videoRef.current) return

      switch (e.key) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'f':
          handleFullscreen()
          break
        case 'ArrowLeft':
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
          break
        case 'ArrowRight':
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5)
          break
        case 'ArrowUp':
          e.preventDefault()
          setVolume(Math.min(1, volume + 0.1))
          break
        case 'ArrowDown':
          e.preventDefault()
          setVolume(Math.max(0, volume - 0.1))
          break
        case 'm':
          setVolume(volume === 0 ? 1 : 0)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, duration, volume])

  return (
    <div className="relative w-full bg-black group">
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onMouseMove={showControlsHandler}
        className="w-full h-auto"
      />

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-dark-700 rounded cursor-pointer appearance-none hover:h-2 transition-all"
          style={{
            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${
              (currentTime / duration) * 100
            }%, #334155 ${(currentTime / duration) * 100}%, #334155 100%)`,
          }}
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between mt-4 gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors text-lg"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <span className="text-white text-lg">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-dark-700 rounded cursor-pointer"
              />
            </div>

            {/* Time */}
            <span className="text-white text-sm whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Title */}
            <span className="text-white text-sm hidden sm:inline">{title}</span>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="text-white hover:text-primary transition-colors text-lg"
            >
              {isFullscreen ? '⛔' : '⛶'}
            </button>
          </div>
        </div>
      </div>

      {/* Play Button Overlay */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all group/play"
        >
          <span className="text-6xl opacity-70 group-hover/play:opacity-100 transition-opacity">
            ▶️
          </span>
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
