<template>
  <div v-show="!minimized" class="terminal" :class="fullscreen ? 'fullscreen' : ''" @click="focus">
    <div class="header flex items-center justify-between px-2">
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
      <div class="text-white">
        altantur@internet
      </div>
      <div class="buttons" />
    </div>
    <div class="tab-head flex items-center">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="flex-grow flex items-center justify-center tab select-none"
        :class="index === active ? 'active' : ''"
        @click="active = index"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="screen">
      <div
        v-for="(tab, index) in tabs"
        v-show="index === active"
        :key="index"
        class="flex-grow flex flex-col"
      >
        <div
          v-for="(command, i) in tab.commands"
          :key="i"
          class="command"
        >
          <div class="flex flex-row">
            <div class="location">
              {{ tab.title }}
            </div>
            <div class="time px-1">
              ⌚ {{ command.time }}
            </div>
          </div>
          <div class="flex flex-row">
            <div class="text-white">
              $
            </div>
            <div class="text-white px-1">
              {{ command.input }}
            </div>
          </div>
          <div class="flex flex-row">
            <div class="text-output">
              <span class="folders">
                {{ command.folders }}
              </span>
              <span class="out" v-html="command.output" />
            </div>
          </div>
        </div>
        <div
          class="command"
        >
          <div class="flex flex-row">
            <div class="location">
              {{ tab.title }}
            </div>
            <div class="time px-1">
              ⌚ {{ time }}
            </div>
          </div>
          <div class="flex flex-row">
            <div class="text-white">
              $
            </div>
            <div class="text-white px-1">
              <input
                ref="inp"
                v-model="tab.val"
                type="text"
                class="command-input"
                autofocus
                @keyup.enter="enter"
                @keydown.tab.prevent="tabComplete"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const today = new Date()
export default {
  data () {
    return {
      active: 0,
      fullscreen: false,
      time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
      val: '',
      tabs: [
        {
          title: '~',
          info: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'cat ABOUT.md',
            output: `
                <div class="flex flex-wrap">
                  <div class='me'>
                  </div>
                  <div class="flex flex-col justify-between">
                    <p>Hi there 👋</p>
                    <p>🔭 I’m currently working on: <a href="https://togloom.trade/" target="_blank">togloom.trade.</a></p>
                    <p>💬 Ask me about:  Web Development, Geography.</p>
                    <p>🚀 Open for Job: Tell me your story.</p>
                    <p>🎹 Programming Language: PHP, JavaScript.</p>
                    <p>🖥 Tech Stack: Laravel, NuxtJS, Serverless.</p>
                    <p>😄 Pronouns: He/Him.</p>
                  </div>
                </div>
            `
          },
          base_command: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'ls',
            folders: 'Applications         Desktop              Downloads            Movies               Pictures             Projects     Library              Music                 Public ',
            output: 'ABOUT.md       Altantur_CV.pdf'
          },
          commands: [
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'cat ABOUT.md',
              output: `
                <div class="flex flex-wrap">
                  <div class='me'>
                  </div>
                  <div class="flex flex-col justify-between">
                    <p>Hi there 👋</p>
                    <p>🔭 I’m currently working on: <a href="https://togloom.trade/" target="_blank">togloom.trade.</a></p>
                    <p>💬 Ask me about:  Web Development, Geography.</p>
                    <p>🚀 Open for Job: Tell me your story.</p>
                    <p>🎹 Programming Language: PHP, JavaScript.</p>
                    <p>🖥 Tech Stack: Laravel, NuxtJS, Serverless.</p>
                    <p>😄 Pronouns: He/Him.</p>
                  </div>
                </div>
              `
            },
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'ls',
              folders: 'Applications         Desktop              Downloads            Movies               Pictures             Projects     Library              Music                 Public ',
              output: 'ABOUT.md        Altantur_CV.pdf'
            }
          ],
          val: ''
        },
        {
          title: '~/Projects',
          info: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'cat README.md',
            output: `
            ### My projects made with : <br>
            - 🛠 Laravel, PHP<br>
            - 😍 NuxtJS(VueJS), JavaScript<br>
            - 🛒 Deployment(S3, Lambda, EC2), AWS<br>
            - 🚊 Express, NodeJS<br>
            - 💨 Tailwind, CSS<br>
            - 🔥 Firebase, GCP<br>
             `
          },
          base_command: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'ls',
            folders: 'Ocurus         ISU              TogloomTrade            Nexi     TravelHubMongolia',
            output: 'README.md'
          },
          commands: [
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'ls',
              folders: 'Ocurus         ISU              TogloomTrade            Nexi     TravelHubMongolia',
              output: 'ABOUT.md   Altantur_CV.pdf'
            },
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'cat README.md',
              output: `
                ### My projects made with : <br>
                  - 🛠 Laravel, PHP<br>
                  - 😍 NuxtJS(VueJS), JavaScript<br>
                  - 🛒 Deployment(S3, Lambda, EC2), AWS<br>
                  - 🚊 Express, NodeJS<br>
                  - 💨 Tailwind, CSS<br>
                  - 🔥 Firebase, GCP<br>
              `
            }
          ],
          val: ''
        }
      ],
      inputs: [
        'clear',
        'cat README.md',
        'cat ABOUT.md',
        'ls',
        'open Altantur_CV.pdf'
      ],
      trie: {}
    }
  },
  computed: {
    ...mapGetters({
      minimized: 'minimized'
    })
  },
  created () {
    this.inputs.forEach((el) => {
    })
  },
  methods: {
    ...mapActions([
      'setActive',
      'setMinimize'
    ]),
    focus () {
      this.$refs.inp[this.active].focus()
    },
    action () {
      alert('It is for portfolio, not for use :)')
    },
    close () {
      this.setMinimize(true)
      this.setActive(false)
    },
    tabComplete () {
      const tab = this.tabs[this.active]
      alert(tab.val)
    },
    enter () {
      const now = new Date()
      const tab = this.tabs[this.active]
      this.time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':')
      tab.info.time = this.time
      tab.base_command.time = this.time
      switch (tab.val.trim()) {
        case 'clear':
          this.tabs[this.active].commands = []
          break
        case 'cat README.md':
          this.tabs[this.active].commands = [...tab.commands, Object.assign({}, tab.info)]
          break
        case 'cat ABOUT.md':
          this.tabs[this.active].commands = [...tab.commands, Object.assign({}, tab.info)]
          break
        case 'ls':
          this.tabs[this.active].commands = [...tab.commands, Object.assign({}, tab.base_command)]
          break
        case 'open Altantur_CV.pdf':
          window.location.href = '/Altantur_CV.pdf'
          break
        default:
          this.tabs[this.active].commands = [...tab.commands, { input: tab.val, output: 'zsh: command not found: ' + tab.val, time: [now.getHours(), now.getMinutes(), now.getSeconds()].join(':') }]
      }
      this.tabs[this.active].val = ''
      this.$nextTick(() => this.$refs.inp[this.active].scrollIntoView())
    }
  }
}
</script>
