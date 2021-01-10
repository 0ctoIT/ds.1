<template>
  <div>
  <v-layout>
    <v-flex xs6>
      <Panel title="Song Metadata">
        <v-layout>
          <v-flex xs6>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>
            <v-btn
              class="cyan"
              dark
              :to="{ path: './edit'}" append>
            Edit Song
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <img class="album-image" :src="song.albumImageUrl" />
            <br>
            {{song.album}}
          </v-flex>
        </v-layout>
      </Panel>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <Panel title="Video">
        <!-- youtube embedded -->
        <youtube
          :video-id="song.youtubeIdUrl"
          :player-width="500"
          :player-height="200">
        </youtube>
      </PaneL>
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
    <v-flex xs6>
      <Panel title="Lyrics">
        <textarea
          readonly
          v-model="song.lyrics"
        ></textarea>
      </Panel>
    </v-flex>
    <v-flex xs6 class="ml-2">
      <Panel title="tabs">
        <textarea
          readonly
          v-model="song.tab"
        /></textarea>
      </Panel>
    </v-flex>
  </v-layout>
  </div>
</template>
<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
  }
}
</script>
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 36px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
textarea {
  width: 100%;
  height: 600px;
  font-family: monospace;
  border: none;
  padding: 20px;
}
</style>
