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
        <div v-for="note in notes" :key="note.path" class="title active">
          <div class="text">
            {{ note.title }}
          </div>
          <div class="date">
            {{ dateStr(note.updatedAt) }} - {{ note.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="note">
      <div class="header bb-lr-10" />
      This is Note with Image maybe Video!
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullscreen: false,
      title: 'Altantur Notes',
      notes: []
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
      .sortBy('date')
      .fetch()
  },
  methods: {
    dateStr (str) {
      const dt = new Date(str)
      return dt.toLocaleDateString()
    },
    close () {
    }
  }
}
</script>
