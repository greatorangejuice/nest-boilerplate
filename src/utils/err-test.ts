import { Response } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrTest {
  constructor(private response: Response) {}

  returnException(code: number, message: string) {
    this.response.status(code).json({
      message: message,
    });
  }
}
