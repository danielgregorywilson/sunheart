<template>
  <div class="q-mt-md q-px-md" style="max-width: 500px;">
    <!-- <p>{{ title }}</p> -->
    <q-img 
      v-if="showCover"
      class="cover-art q-mb-md"
      :src="'/covers/' + props.cover_art"
      :alt="props.title + ' cover art'"
      @click="playVideo"
    />
    <iframe
      class="q-mb-md video"
      :id="'video-' + props.video_id"
      frameborder="0"
      :style="{ display: showCover ? 'none' : '' }"
    >
    </iframe>
    <p class="track-caption q-mt-sm q-mb-md">{{ caption }}</p>
  </div>
</template>

<style>
  .cover-art {
    cursor: pointer;
  }

  .video {
    width: 100%;
    height: 500px;
  }
  
  .track-caption {
    font-size: 16pt;
    color: #ddd;
    text-align: center;
  }
</style>

<script setup lang="ts">

import { ref } from 'vue';

const showCover = ref(true);

let props = defineProps<{
  title: string;
  video_id: string;
  caption: string;
  cover_art: string;
}>()

function playVideo() {
  showCover.value = !showCover.value;
  const iframe = document.querySelector(
    '#video-' + props.video_id
  ) as HTMLIFrameElement
  iframe.src = 'https://www.youtube.com/embed/' + props.video_id + '?autoplay=1'
}

// Make resetVideo available to parent component
defineExpose({ resetVideo })

function resetVideo() {
  showCover.value = true;
  const iframe = document.querySelector(
    '#video-' + props.video_id
  ) as HTMLIFrameElement
  iframe.src = ''
}

</script>
