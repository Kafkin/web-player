export default {
  
  currentTimeOnLine: 0,
  showListSong: false,
  currentVolume: 75,
  showVolume: false,
  firstLoad: false,
  stopReder: true,
  loader: false,

  audioplayer: {
    path: './assets/music',
    current: 0,
    repeat: false,
    status: true,
    duration: 0,
    song: null,
    video: null,
  },

  videoplayer: {
    path: './assets/video',
    status: true,
    video: null,
  },

  songs: []
  
}