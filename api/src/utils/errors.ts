import { Response } from 'express'

export class BaseHttpError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class ValidationError extends BaseHttpError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends BaseHttpError {
  constructor(message: string) {
    super(message, 404)
  }
}

export function errorHandler(error: unknown, res: Response) {
  if (error instanceof BaseHttpError) {
    res.status(error.statusCode).json({ message: error.message })
  } else if (error && typeof error === 'object' && 'message' in error) {
    res.status(400).json({ message: error.message })
  } else {
    res.status(500).json({ message: 'An error occurred' })
  }
}
