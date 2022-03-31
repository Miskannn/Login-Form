import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  messages: string[] | undefined;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
