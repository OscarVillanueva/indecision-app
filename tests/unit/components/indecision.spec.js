import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision app', () => {

  let wrapper;
  let consoleSpy;

  // Mock o simulación del fetch y json()
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif'
    })
  }))

  // Antes de cada prueba vuelve a montar el Counter
  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    consoleSpy = jest.spyOn(console, 'log')

    jest.clearAllMocks()
  })

  test('should match with the snapshot', () => expect(wrapper.html()).toMatchSnapshot())

  test('should not occurs anything at write into the input', async () => {

    const getResponseSpy = jest.spyOn(wrapper.vm, 'getResponse')

    const input = wrapper.find('input')
    await input.setValue('Hola mundo')

    expect(consoleSpy).toHaveBeenCalled()
    expect(getResponseSpy).not.toHaveBeenCalled()

  })

  test('should do a fetch at write an ?', async () => {

    const getResponseSpy = jest.spyOn(wrapper.vm, 'getResponse')

    const input = wrapper.find('input')
    await input.setValue('Hola mundo?')

    expect(getResponseSpy).toHaveBeenCalled()

  })

  test('tests in getResponse', async () => {

    await wrapper.vm.getResponse()

    expect(wrapper.find('img').isVisible()).toBeTruthy()
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect(wrapper.vm.answer).toBe('¡Si!')

  })

  test('should catch the error in API', async () => {

    global.fetch.mockImplementationOnce(() => Promise.reject('API is DOWN'))

    await wrapper.vm.getResponse()

    expect(wrapper.find('img').isVisible()).toBeFalsy()
    expect(wrapper.vm.answer).toBe('No se encontró respuesta')

  })

})