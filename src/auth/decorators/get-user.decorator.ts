import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  if (!user)
    throw new InternalServerErrorException(
      'No existe el usuario en la petición (request)'
    );

  return !data ? user : user[data];
});
