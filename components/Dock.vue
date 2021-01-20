<template>
  <div class="dock flex justify-between items-center px-2">
    <a
      v-for="(social,index) in socials"
      :key="index"
      :href="social.link"
      target="_blank"
      class="app cursor-pointer"
      :style="{ backgroundImage: 'url(' + social.icon + ')' }"
    >
      <span class="tooltiptext">
        {{ social.text }}
      </span>
    </a>
    <div
      class="app cursor-pointer"
      :style="{ backgroundImage: 'url(/terminal.png)' }"
      @click="setMinimize(false)"
    >
      <span class="tooltiptext">
        Terminal
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      socials: [
        {
          text: 'Show Github Profile',
          link: 'https://github.com/altantur',
          icon: '/github.png'
        },
        {
          text: 'Connect on LinkedIn',
          link: 'https://www.linkedin.com/in/altantur/',
          icon: '/linkedin.png'
        },
        {
          text: 'Follow on Twitter',
          link: 'https://twitter.com/Altantur',
          icon: '/twitter.png'
        },
        {
          text: 'Email me',
          link: 'mailto: turuu.br@gmail.com',
          icon: '/mail.png'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'setMinimize'
    ])
  }
}
</script>
