<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="q-ml-auto q-gutter-sm q-display-none q-display-md-flex">
          <q-btn
            v-for="link in linksList"
            :key="link.title"
            :label="link.title"
            :icon="link.icon"
            flat
            dense
            :to="link.link"
            target="_blank"
            rel="noopener"
          />
        </div>

        <div class="q-ml-auto q-display-xs">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

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
    icon: 'code',
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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
/* Hide on md and up */
.q-display-xs {
  display: none;
}
@media (max-width: 959px) {
  .q-display-xs {
    display: inline-block !important;
  }
  .q-display-md-flex {
    display: none !important;
  }
}
/* Show on md and up */
.q-display-md-flex {
  display: flex;
  align-items: center;
}
</style>
