<template>
  <div class="flex flex-wrap">
    <div class="profile-picture-container" @click="toggleProfileImage()">
      <div class="me" :class="{ blurry: isBlurry }" />
      <div v-if="isBlurry" class="reveal-text select-none">
        👆 Show profile picture
      </div>
    </div>
    <div class="flex flex-col justify-between out">
      <p>Hey there 👋</p>
      <p>🔭 I’m currently working on: <a href="https://alightcreative.com/" target="_blank">Alight Creative Inc</a></p>
      <p>💬 Ask me about: Web Development, Geography.</p>
      <p>🚀 Open for Job: Yes! Please tell me your story.</p>
      <p>🎹 Programming Language: NodeJS/TypeScript.</p>
      <p>🖥 Tech Stack: Web Apps!.</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBlurry: true
    }
  },
  methods: {
    toggleProfileImage () {
      this.isBlurry = !this.isBlurry
    }
  }
}
</script>
