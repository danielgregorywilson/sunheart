<template>
  <div style="width: 500px;">
    <!-- <p>{{ title }}</p> -->
    <!-- <q-video
      :src="props.clip"
      :ratio="16/16"
    /> -->
    <iframe width="560" height="315"
    :src="props.clip" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <p class="q-mt-sm q-mb-md">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  clip: string;
  caption: string;
}>()

</script>
