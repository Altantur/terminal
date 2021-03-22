<template>
  <div class="notes flex" :class="fullscreen ? 'fullscreen' : ''">
    <div class="articles">
      <div class="header bt-lr-10">
        <div class="buttons flex items-center justify-between select-none">
          <div class="close s-15 flex items-center justify-center" @click="close()">
            ✕
          </div>
          <div class="min s-15 flex items-center justify-center" @click="setMinimize(true)">
            −
          </div>
          <div class="max s-15 flex items-center justify-center" @click="fullscreen = !fullscreen">
            +
          </div>
        </div>
      </div>
      <div class="titles">
        <nuxt-link
          v-for="note in notes"
          :key="note.path"
          :to="'/notes/' + note.slug "
        >
          <div
            class="title"
            :class="{ active: isActive(note.slug) }"
          >
            <div class="text">
              {{ note.title }}
            </div>
            <div class="date">
              {{ dateStr(note.updatedAt) }} - {{ note.description }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-if="!!selected" class="note">
      <div class="header bb-lr-10" />
      <div class="updated-at">
        {{ toHumanRead(selected.updatedAt) }}
      </div>
      <article>
        <h1
          class="flex justify-center"
        >
          {{ selected.title }}
        </h1>
        <nuxt-content :document="selected" />
      </article>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ params }) {
    const slug = params.path
    return { slug }
  },
  data () {
    return {
      fullscreen: false,
      title: 'Altantur Notes',
      notes: [],
      selected: null
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          'twitter:title': '📝 Altantur Notes...',
          content: 'I am Altantur, here to help you.'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'I am Altantur, here to help you.'
        }
      ]
    }
  },
  async created () {
    this.notes = await this.$content('notes')
      .only(['title', 'updatedAt', 'description', 'slug'])
      .sortBy('updatedAt', 'desc')
      .fetch()
    if (this.slug) {
      this.selected = await this.$content('notes/' + this.slug)
        .fetch()
    }
  },
  methods: {
    dateStr (str) {
      const dt = new Date(str)
      return dt.toLocaleDateString()
    },
    toHumanRead (str) {
      const date = new Date(str)
      return date.toLocaleString()
    },
    isActive (slug) {
      if (this.selected) {
        return this.selected.slug === slug
      }
      return false
    },
    close () {
    }
  }
}
</script>
