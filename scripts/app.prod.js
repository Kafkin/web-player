/* all reactive variables */ import store from './store.js'
/* helper fn */ import { post, get } from './helper.js'

// vue component
Vue
  .createApp({

    data: () => store,

    watch: {
      currentVolume( nv, ov ) {
        this.$refs.audioplayer.volume = nv / 100
      },
    },

    methods: {
      async setSong( command ){
        if( this.audioplayer.repeat === this.audioplayer.current ) {
          this.loader = true

          this.$refs.videoplayer.load()
          this.$refs.videoplayer.load()
          this.playVideo()
          this.playSong()
          
          return
        }

        this.loader = false
        
        let data = this.songs.at( this.audioplayer.current )

        if( !data ) {
          this.audioplayer.current = 0
          data = this.songs.at( 0 )
        }

        await post( 'https://serega-test.ru/api/uploading-file-api/video', { id: data.id }, async ( data ) => {
          this.$refs.videoplayer.src = URL.createObjectURL( await data.blob() )
        })

        await post( 'https://serega-test.ru/api/uploading-file-api/audio', { id: data.id }, async ( data ) => {
          this.$refs.audioplayer.src = URL.createObjectURL( await data.blob() )
        })

        this.audioplayer.song = data

        if( this.firstLoad ) {
          this.playVideo()
          this.playSong()
        }

        this.loader = true
      },
      
      playSong() {
        this.firstLoad = true
        this.audioplayer.status = false
        this.$refs.audioplayer.play()
      },
      
      playVideo() {
        this.firstLoad = true
        this.videoplayer.status = false
        this.$refs.videoplayer.play()
      },
      
      pauseSong() {
        this.audioplayer.status = true
        this.$refs.audioplayer.pause()
      },

      pauseVideo() {
        this.videoplayer.status = true
        this.$refs.videoplayer.pause()
      },

      updateProgress() {
        if( this.stopReder ) {
          const { duration, currentTime } = this.$refs.audioplayer
          this.audioplayer.currentTime = currentTime
          this.audioplayer.duration = duration
  
          this.currentTimeOnLine = currentTime
        }
      },

      setProgress() {
        if( !this.stopReder ) {
          this.$refs.audioplayer.currentTime = ( this.audioplayer.currentTime / this.audioplayer.duration ) * this.audioplayer.duration
          this.stopReder = true
        }
      },

      toTime( totalSeconds) {
        if( !totalSeconds ) return '0:00'

        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.ceil( totalSeconds % 60 )
        
        return `${ minutes }:${ seconds < 10 ? 0 : '' }${ seconds }`
      },

    },

    computed: {

    },

    components: { 

    },

    async mounted() {
      await post( 'https://serega-test.ru/api/uploading-file-api/all', null, async ( data ) => {
        this.songs = await data.json(); this.setSong( this.songs.at( 0 ).id )
      })
    }

  })
  .mount( '#app' )
