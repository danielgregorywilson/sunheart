<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="q-ml-auto q-gutter-sm">
          <q-btn
            v-for="link in linksList"
            class="toolbar-link"
            :key="link.title"
            :label="$q.screen.lt.sm ? '' : link.title"
            :icon="link.icon"
            flat
            dense
            :to="link.link"
            target="_blank"
            rel="noopener"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: 'Always coming home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Announcements',
    caption: 'News and Muse from Sunheart Central',
    icon: 'campaign',
    link: 'https://sunheartmusic.blogspot.com/'
  },
  {
    title: 'Contact',
    caption: 'We are here now. Connect.',
    icon: 'chat',
    link: '/contact'
  },
  {
    title: 'More good music',
    caption: 'Our friends make lovely sounds',
    icon: 'record_voice_over',
    link: '/ourfriends'
  }
];

</script>

<style scoped>

</style>
