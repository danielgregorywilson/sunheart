<template>
  <div>
    <p>{{ title }}</p>
    <q-video
      :src="props.clip"
    />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  clip: string;
}>()

</script>
