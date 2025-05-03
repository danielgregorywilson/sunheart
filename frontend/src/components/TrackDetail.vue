<template>
  <div style="width: 500px;">
    <!-- <p>{{ title }}</p> -->
    <div class="video-container custom-player">
      <iframe 
          :src="'https://www.youtube-nocookie.com/embed/' + props.video_id + '?autoplay=0&controls=1&disablekb=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&playsinline=1&loop=0'"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
      </iframe>
      <!-- The overlay that hides the title area -->
      <div class="title-hider"></div>
    </div>
    <!-- <iframe 11
      width="560" 
      height="315" 1
      :src="props.clip + '?controls=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white'"
      frameborder="0" 
      allowfullscreen>
    </iframe> -->
    <p class="q-mt-sm q-mb-md">{{ caption }}</p>
  </div>
</template>

<style>
    /* Container to maintain aspect ratio and hide overflow */
    .video-container {
        position: relative;
        width: 100%;
        max-width: 560px;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        overflow: hidden;
    }
    
    /* Position the iframe absolutely within container */
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
    
    /* Optional: Add custom controls styling with CSS */
    .custom-player {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        border-radius: 4px;
    }
</style>

<script setup lang="ts">

let props = defineProps<{
  title: string;
  video_id: string;
  caption: string;
}>()

</script>
