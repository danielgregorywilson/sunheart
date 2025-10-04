<template>
  <q-page class="">
    <div id="hero">
      <div class="row" style="max-width: 1000px; margin: auto;">
        <q-img
          id="logo"
          src="/images/sunheartrainbowlogo.jpg"
        />
      </div>
      <div class="row headshots q-mt-xs q-gutter-md">
        <q-img
          class="headshot-regular"
          src="/images/davidee2.jpg"
        />
        <q-img
          class="headshot-large"
          src="/images/omni2.jpg"
        />
        <q-img
          class="headshot-regular"
          src="/images/dawn.jpg"
        />
      </div>
      <div id="description" class="row">
        <h4 id="description-text">
          Tantric Devotional New Age Acid Folk Feminist Goddess Grunge
        </h4>  
      </div>
    </div>

    <div class="q-my-md">
      <div
        id="song-dropdown"
        class="row justify-center"
      >
        <q-btn-dropdown
          label="Jump to Song"
          icon="music_note"
        >
          <q-list>
            <q-item
              v-for="track in tracks"
              :key="track[1]"
              clickable
              v-close-popup
              @click="jumpToTrack(track[1])"
            >
              <q-item-section>
                <q-item-label>{{ track[0] }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>

    <div v-if="showDetail" class="q-my-md row justify-center" id="track-detail">
      <TrackDetail
        ref="trackDetailComponent"
        :title="song.title"
        :video_id="song.youtubeId"
        :caption="song.caption"
        :cover_art="song.coverImageUrl"
      ></TrackDetail>
    </div>

    <q-infinite-scroll @load="onLoad" :offset="250" v-if="!showDetail">
      <div
        v-for="track in loadedTracks"
        :key="track[0]" class="row justify-center"
        :id="'track-' + track[2]"
      >
        <TrackDetail
          :title="track[0]"
          :video_id="track[2]"
          :caption="track[3]"
          :cover_art="track[4]"
        ></TrackDetail>
      </div>
    </q-infinite-scroll>
    
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TrackDetail from 'src/components/TrackDetail.vue'
import HeroComponent from 'src/components/HeroComponent.vue'
import { useRoute } from 'vue-router'
import { Track } from 'src/types'

const spreadsheetId = '1-2DJ1WPl7zfVbCKi5yr_IC7U_G43U-oSSkvTle17f5U'
const apiKey = 'AIzaSyCFNzz0b7zqpgWvOtdY983CPs_84cHS2lk'
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`
const trackDetailComponent = ref<InstanceType<typeof TrackDetail> | null>(null)

const TRACKS_LOAD_BATCH = 10
const tracks = ref([])
const loadedTracks = ref([])
const showDetail = ref(false)
const route = useRoute()
const songSlug = ref('')
const song = ref<Track>({
  title: '',
  slug: '',
  youtubeId: '',
  caption: '',
  coverImageUrl: ''
} as Track)

onMounted(() => {
  songSlug.value = route.params.slug as string
})

async function fetchGoogleSheetData() {
  try {
    // Fetch data from Google Sheets API
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract rows from the data
    const rows = data.values;
    tracks.value = rows.slice(1) // Skip the first row (headers)
    // Load initial tracks
    loadedTracks.value = tracks.value.slice(0, TRACKS_LOAD_BATCH)
  } catch (error) {
      console.error('Error fetching Google Sheets data:', error)
  }
}

function onLoad(index: number, done: () => void) {
  const nextTracks = tracks.value.slice(
    loadedTracks.value.length, loadedTracks.value.length + TRACKS_LOAD_BATCH
  )
  loadedTracks.value.push(...nextTracks)
  done()
}

function jumpToTrack(slug: string) {
  trackDetailComponent.value?.resetVideo()
  showDetail.value = true
  songSlug.value = slug
  const track = tracks.value.find((t) => t[1] === slug)
  if (track) {
    song.value = {
      title: track[0],
      slug: track[1],
      youtubeId: track[2],
      caption: track[3],
      coverImageUrl: track[4]
    } as Track
  }
}

onMounted(() => { 
  fetchGoogleSheetData()
})

</script>

<style scoped>
#hero {
  background-image: url('/images/sunheartinwords768X1024.jpg');
  padding: 3vw;

  .headshots {
    display: flex;
    justify-content: center;
  }

  .headshot-regular {
    width: 170px;
    height: 215px;
    margin-top: 46px;
    @media screen and (max-width: 600px) {
      width: 28%;
      height: 150px;
    }
  }
  .headshot-large {
    width: 170px;
    height: 245px;
    @media screen and (max-width: 600px) {
      width: 28%;
      height: 180px; 
    }
  }

  #description {
    max-width: 700px;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);

    #description-text {
      color: white;
      text-align: center;
      font-weight: 900;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}

#song-dropdown {
  max-width: 600px;
  margin: auto;
  color: white;
}

</style>