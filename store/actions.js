export default {
  setActive ({ commit }, active) {
    commit('SET_ACTIVE', active)
  },
  setMinimize ({ commit }, min) {
    commit('SET_MINIMIZE', min)
  }
}
