<template>
   <div class="fullscreen">
      <router-view class="tab"></router-view>
      <HostTabBar class="tab-bar" />
   </div>
</template>

<script>
import HostTabBar from '@/components/HostTabBar.vue'
import PlaylistApi from '@/api/modules/playlist.api.js'

import { mapState, mapActions } from 'vuex'

export default {
   components: {
      HostTabBar
   },
   computed: {
      ...mapState('party', ['party_playlist', 'firebase_party', 'firebase_votes'])
   },
   watch: {
      async firebase_party(newValue, oldValue) {
         if (newValue.playback_state != oldValue.playback_state) {
            await this.updateLocalPlaybackState(newValue.playback_state)
         }
         if (newValue.currently_playing != oldValue.currently_playing) {
            await this.updateLocalCurrentlyPlaying(newValue.currently_playing)
         }
         if (newValue.party_mode.battle_songs != oldValue.party_mode.battle_songs) {
            await this.updateLocalPartyMode(newValue.party_mode)
         }
         if (newValue.proposed_tracks != oldValue.proposed_tracks) {
            newValue.proposed_tracks.forEach(async track => {
               //controlla se una proposta nuova era già presente in una vecchia
               const already_existed = oldValue.proposed_tracks.find(
                  old_track => old_track.id == track.id
               )
               //Se la proposta non era presente la aggiunge alla playlist
               if (already_existed == undefined) {
                  await PlaylistApi.addTrackToPlaylist(track, this.party_playlist.id)
               }
            })
            await this.emptyProposedTracks()
            await this.updateLocalProposedTracks(newValue.proposed_tracks)
         }
      },
      firebase_votes(newVal) {
         this.updateLocalVotes(newVal)
      }
   },
   methods: {
      ...mapActions('party', [
         'updateLocalPlaybackState',
         'updateLocalCurrentlyPlaying',
         'updateLocalVotes',
         'updateLocalPartyMode',
         'updateLocalProposedTracks',
         'cleanFirebaseProposedTracks',
         'emptyProposedTracks'
      ])
   },
   created() {
      if (this.$router.currentRoute.name != 'HostPlayer') {
         this.$router.push({ name: 'HostPlayer' })
      }
   }
}
</script>

<style lang="sass" scoped>
.tab-bar
   bottom: 0px
   position: fixed
.tab
   box-sizing: border-box
   height: calc(100% - 72px)
   margin: 0px 0px 72px 0px
   overflow: scroll
   width: 100%
</style>
