import useErrorToast from '../../hooks/useErrorToast'
import { useToast as baseUseToast } from '@chakra-ui/react'

jest.mock('@chakra-ui/react', () => {
  const original = jest.requireActual('@chakra-ui/react')
  return {
    __esModule: true,
    ...original,
    useToast: jest.fn(),
  }
})

describe('useErrorToast', () => {
  const useToast = baseUseToast as jest.Mock
  const mockToast = jest.fn()

  beforeEach(() => {
    useToast.mockReturnValue(mockToast)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('calls the toast function with default message', () => {
    const errorToast = useErrorToast()
    errorToast()
    expect(useToast).toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'An error occured, please try again later',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  })

  it('calls the toast function with custom message', () => {
    const errorToast = useErrorToast()
    errorToast('Custom error message')
    expect(useToast).toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Custom error message',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  })
})
