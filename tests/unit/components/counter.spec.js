import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

  // test('should match with the snapshot', () => {

  //   const wrapper = shallowMount(Counter)

  //   expect(wrapper.html()).toMatchSnapshot()

  // })

  test('should h2 tag has to be with the default value "Counter" ', () => {

    const wrapper = shallowMount(Counter)

    expect(wrapper.find('h2').exists()).toBeTruthy()

    const text = wrapper.find('h2').text()
    expect(text).toEqual('Counter')

  })

})