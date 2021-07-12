import {
  createParamDecorator,
  ExecutionContext,
  UseGuards,
  applyDecorators,
  SetMetadata,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES } from './constants';
import { RoleJwtAuthGuard } from 'src/auth/guard/role-jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export const UserRole = () =>
  applyDecorators(
    UseGuards(RoleJwtAuthGuard, RolesGuard),
    SetMetadata('roles', [ROLES.USER, ROLES.ADMIN]),
  );

export const AdminRole = () =>
  applyDecorators(
    UseGuards(RoleJwtAuthGuard, RolesGuard),
    SetMetadata('roles', [ROLES.ADMIN]),
  );
