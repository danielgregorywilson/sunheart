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
        <h4 id="description-text">Tantric Devotional New Age Acid Folk Feminist Goddess Grunge</h4>  
      </div>
      
    </div>
    

    
    <div
      v-for="track in tracks"
      :key="track[0]" class="row justify-center"
    >
      <TrackDetail
        :title="track[0]"
        :video_id="track[1]"
        :caption="track[2]"
        :cover_art="track[3]"
      ></TrackDetail>
    </div>
    
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TrackDetail from 'src/components/TrackDetail.vue';

const spreadsheetId = '1-2DJ1WPl7zfVbCKi5yr_IC7U_G43U-oSSkvTle17f5U'
const apiKey = 'AIzaSyCFNzz0b7zqpgWvOtdY983CPs_84cHS2lk';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;

const tracks = ref([]);

async function fetchGoogleSheetData() {
  try {
    // Fetch data from Google Sheets API
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract rows from the data
    const rows = data.values;
    tracks.value = rows.slice(1) // Skip the first row (headers)
  } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
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

</style>