<template>
  <q-page class="">
    <div id="hero">
      <div class="row">
        <q-img
          id="logo"
          src="../assets/sunheartrainbowlogo.jpg"
        />
      </div>
      <div class="row q-mt-md q-gutter-md">
        <q-img
          class="col"
          src="../assets/davidee2.jpg"
        />
        <q-img
          class="col"
          src="../assets/omni2.jpg"
        />
        <q-img
          class="col"
          src="../assets/dawn.jpg"
        />
      </div>
      <div class="row">
        <h5 id="title">Tantric Devotional New Age Acid Folk Feminist Goddess Grunge</h5>  
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
  width: 100vw;
  height: 100vw;
  padding: 3vw;
}

#title {
  color: white;
  text-align: center;
  font-weight: 900;
}

</style>