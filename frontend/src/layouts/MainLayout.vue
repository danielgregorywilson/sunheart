<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar id="main-toolbar">
        <div class="q-ml-auto q-gutter-sm">
          <q-btn
            v-for="link in linksList"
            class="toolbar-link"
            :key="link.title"
            :label="$q.screen.lt.sm ? '' : link.title"
            :icon="link.icon"
            flat
            dense
            @click="onClick(link)"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
body {
  background-color: #000 !important;
}

#main-toolbar {
  background-color: rgb(70, 65, 143);
}
</style>

<script setup lang="ts">
import { EssentialLinkProps } from 'src/types';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    external: true,
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

function onClick(link: EssentialLinkProps) {
  if (link.external) {
    window.open(link.link, '_blank', 'noopener');
  } else {
    router.push(link.link);
  }
}

</script>
