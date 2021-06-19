import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class RestController {
  @Get()
  get() {
    return HttpStatus.OK;
  }
}
