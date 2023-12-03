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
              <!-- eslint-disable vue/no-v-html -->
              <About v-if="command.input === 'cat ABOUT.md'" />
              <span v-else class="out" v-html="command.output" />
              <!--eslint-enable-->
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
                @keyup.down="history(1)"
                @keyup.up="history(-1)"
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
const output = ''
const folders = 'Applications         Desktop              Downloads            Movies               Pictures             Projects     Library              Music                 Public '
export default {
  data () {
    return {
      active: 0,
      fullscreen: false,
      time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
      val: '',
      valBackup: '',
      commandHistory: [
        'cat ABOUT.md',
        'ls'
      ],
      currCursor: -1,
      tabs: [
        {
          title: '~',
          info: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'cat ABOUT.md',
            output
          },
          base_command: {
            time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
            input: 'ls',
            folders,
            output: 'ABOUT.md       Altantur_Resume.pdf'
          },
          commands: [
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'cat ABOUT.md',
              output
            },
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'ls',
              folders,
              output: 'ABOUT.md        Altantur_Resume.pdf'
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
            - 😍 NuxtJS(VueJS), Typescript<br>
            - 🛒 CI/CD<br>
            - 🚊 NestJS, NodeJS<br>
            - 💨 Tailwind, CSS<br>
            - 🔥 Firebase, GCP<br>
            - 🩵 Finally, a love<br>
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
              folders: 'Vtoura                Alight-Motion            Nexi     TravelHubMongolia',
              output: 'ABOUT.md   Altantur_Resume.pdf'
            },
            {
              time: [today.getHours(), today.getMinutes(), today.getSeconds()].join(':'),
              input: 'cat README.md',
              output: `
                ### My projects made with : <br>
                  - 🛠 Laravel, PHP<br>
                  - 😍 NuxtJS(VueJS), Typescript<br>
                  - 🛒 CI/CD<br>
                  - 🚊 NestJS, NodeJS<br>
                  - 💨 Tailwind, CSS<br>
                  - 🔥 Firebase, GCP<br>
                  - 🩵 Finally, a love<br>
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
        'open Altantur_Resume.pdf'
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
    history (change) {
      let cursor = this.currCursor + change
      if (this.currCursor === -1) {
        this.valBackup = this.tabs[this.active].val
        cursor = this.commandHistory.length - 1
      }
      if (cursor < 0) {
        cursor = 0
      }
      if (cursor === this.commandHistory.length) {
        cursor = -1
      }
      this.currCursor = cursor
      if (cursor === -1) {
        this.tabs[this.active].val = this.valBackup
        this.valBackup = ''
      } else {
        this.tabs[this.active].val = this.commandHistory[cursor]
      }
    },
    enter () {
      const now = new Date()
      const tab = this.tabs[this.active]
      this.time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(':')
      tab.info.time = this.time
      tab.base_command.time = this.time
      if (tab.val.trim()) {
        this.commandHistory = [...this.commandHistory, tab.val]
      }
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
        case 'open Altantur_Resume.pdf':
          window.location.href = '/Altantur_Resume.pdf'
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
