export default {
   /*
      Generate a random string without uppercase character
   */
   generatePartyCode() {
      var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
      var result = ''
      for (var i = 0; i < 6; i++) {
         result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      }
      return result
   },
   /*
      Shuffle an array in place
   */
   shuffle(array) {
      var j, x, i
      for (i = array.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1))
         x = array[i]
         array[i] = array[j]
         array[j] = x
      }
      return array
   },
   cleanTracksResponse(response) {
      const tracks = []
      response.forEach(track => {
         const artists = this.cleanArtistsResponse(track.track.artists)
         const parsedTrack = {
            id: track.track.id,
            images: track.track.album.images,
            name: track.track.name,
            artists: artists,
            uri: track.track.uri,
            votes: 0,
            playlist_uri: null,
            playlist_id: null,
            duration_ms: null
         }
         tracks.push(parsedTrack)
      })
      return tracks
   },
   cleanArtistsResponse(response) {
      const artists = []
      response.forEach(artist => {
         const parsedArtist = {
            id: artist.id,
            name: artist.name,
            uri: artist.uri
         }
         artists.push(parsedArtist)
      })
      return artists
   },
   cleanPlaylistResponse(response) {
      const playlists = []
      response.forEach(playlist => {
         const parsedPlaylist = {
            id: playlist.id,
            uri: playlist.uri,
            name: playlist.name,
            description: playlist.description,
            images: playlist.images,
            tracks: playlist.tracks
         }
         playlists.push(parsedPlaylist)
      })
      return playlists
   }
}
