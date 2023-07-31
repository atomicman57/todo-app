import {
  ValidationError,
  NotFoundError,
  errorHandler,
} from '../../utils/errors'
import { Response } from 'express'

describe('Error Handling', () => {
  describe('ValidationError', () => {
    it('should create a ValidationError with message and statusCode', () => {
      const error = new ValidationError('Validation failed')
      expect(error.message).toEqual('Validation failed')
      expect(error.statusCode).toEqual(400)
    })
  })

  describe('NotFoundError', () => {
    it('should create a NotFoundError with message and statusCode', () => {
      const error = new NotFoundError('Resource not found')
      expect(error.message).toEqual('Resource not found')
      expect(error.statusCode).toEqual(404)
    })
  })

  describe('errorHandler', () => {
    let res: Response

    beforeEach(() => {
      res = ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown) as Response
    })

    it('should return a 400 error with message if error has a message property', () => {
      const error = { message: 'Bad request' }
      errorHandler(error, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Bad request' })
    })

    it('should return a custom error with message and statusCode if error is an instance of BaseHttpError', () => {
      const error = new NotFoundError('Resource not found')
      errorHandler(error, res)
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Resource not found' })
    })
  })
})
