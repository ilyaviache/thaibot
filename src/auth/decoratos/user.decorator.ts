import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: string, req) => {
  // console.log('req', req.args[0].user)
  return req.args[0].user;
});
