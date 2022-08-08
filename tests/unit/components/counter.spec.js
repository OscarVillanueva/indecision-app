import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter Component', () => {

  let wrapper;

  // Antes de cada prueba vuelve a montar el Counter
  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  // test('should match with the snapshot', () => {

  //   expect(wrapper.html()).toMatchSnapshot()

  // })

  test('should h2 tag has to be with the default value "Counter" ', () => {

    expect(wrapper.find('h2').exists()).toBeTruthy()

    const text = wrapper.find('h2').text()
    expect(text).toEqual('Counter')

  })

  test('should the value in p tag equal to 11', () => {

    // const pTags = wrapper.findAll('p')
    const value = wrapper.find('[data-test-id="counter"]').text()

    // expect(pTags[1].text()).toEqual('11')
    expect(value).toEqual('11')

  })

  test('should increase and decrease the value of the counter', async () => {

    const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

    // Incrementamos 3 veces el valor
    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')
    await increaseBtn.trigger('click')

    // Reducimos 2 veces el valor
    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')

    let value = wrapper.find('[data-test-id="counter"]')
    expect(value.text()).toEqual('12')


  })

  test('should set the value of start', () => {

    // const start = wrapper.props('start')
    const { start } = wrapper.props()

    const value = wrapper.find('[data-test-id="counter"]').text()

    expect(value).toBe(`${start}`)

  })

  test('should draw the title prop', () => {

    const title = 'Hola Mundo!'

    wrapper = shallowMount(Counter, {
      props: {
        title,
      }
    })

    const text = wrapper.find('h2').text()
    expect(text).toEqual(title)

  })

})