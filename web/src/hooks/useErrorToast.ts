import { useToast } from '@chakra-ui/react'

const defaultErrorMessage = 'An error occured, please try again later'

const useErrorToast = () => {
  const toast = useToast()

  return (message: string = defaultErrorMessage) => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }
}

export default useErrorToast
