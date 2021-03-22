<template>
  <div class="dock flex justify-between items-center px-2">
    <a
      v-for="(social,index) in socials"
      :key="index"
      :href="social.link"
      target="_blank"
      class="app cursor-pointer"
      :style="{ backgroundImage: 'url(' + social.icon + ')' }"
      @click="social.active = true"
    >
      <span class="tooltiptext">
        {{ social.text }}
      </span>
      <div v-show="social.active" class="flex justify-center" :class="social.active ? 'active' : ''">
        .
      </div>
    </a>
    <nuxt-link
      class="app cursor-pointer"
      :style="{ backgroundImage: 'url(/notes.png)' }"
      :to="latest_note"
    >
      <span v-show="active" class="tooltiptext">
        Notes
      </span>
      <div v-if="$nuxt.$route.name === 'notes-path'" class="flex justify-center" :class="active ? 'active' : ''">
        .
      </div>
    </nuxt-link>
    <nuxt-link
      class="app cursor-pointer"
      :style="{ backgroundImage: 'url(/terminal.png)' }"
      to="/"
      @click.native="open()"
    >
      <span v-show="active" class="tooltiptext">
        Terminal
      </span>
      <div v-if="$nuxt.$route.name === 'index'" class="flex justify-center" :class="active ? 'active' : ''">
        .
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      socials: [
        {
          text: 'Show Github Profile',
          link: 'https://github.com/altantur',
          active: false,
          icon: '/github.png'
        },
        {
          text: 'Connect on LinkedIn',
          link: 'https://www.linkedin.com/in/altantur/',
          active: false,
          icon: '/linkedin.png'
        },
        {
          text: 'Follow on Twitter',
          link: 'https://twitter.com/Altantur',
          active: false,
          icon: '/twitter.png'
        },
        {
          text: 'Email me',
          link: 'mailto: turuu.br@gmail.com',
          active: false,
          icon: '/mail.png'
        }
      ],
      latest_note: '/notes'
    }
  },
  computed: {
    ...mapGetters({
      active: 'active'
    })
  },
  async created () {
    const notes = await this.$content('notes')
      .only(['slug'])
      .sortBy('updatedAt', 'desc')
      .limit(1)
      .fetch()
    if (notes.length) {
      this.latest_note = notes[0].path
    }
  },
  methods: {
    ...mapActions([
      'setActive',
      'setMinimize'
    ]),
    open () {
      this.setMinimize(false)
      this.setActive(true)
    }
  }
}
</script>
