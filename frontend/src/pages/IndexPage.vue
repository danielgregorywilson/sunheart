<template>
  <q-page class="">
    <div id="hero">
      <div class="row" style="max-width: 1000px; margin: auto;">
        <q-img
          id="logo"
          src="../assets/sunheartrainbowlogo.jpg"
        />
      </div>
      <div class="row q-mt-md q-gutter-md" style="max-width: 600px; margin: auto;">
        <q-img
          class="headshot-regular"
          src="../assets/davidee2.jpg"
        />
        <q-img
          class="headshot-large"
          src="../assets/omni2.jpg"
        />
        <q-img
          class="headshot-regular"
          src="../assets/dawn.jpg"
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
  background-image: url('../assets/sunheartinwords768X1024.jpg');
  padding: 3vw;

  .headshot-regular {
    width: 170px;
    height: 215px;
    margin-top: 46px;
  }
  .headshot-large {
    width: 170px;
    height: 245px;
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