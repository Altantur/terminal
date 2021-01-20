import { mount } from '@vue/test-utils'
import Terminal from '@/components/Terminal.vue'

describe('Terminal', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Terminal)
    expect(wrapper.vm).toBeTruthy()
  })
})
