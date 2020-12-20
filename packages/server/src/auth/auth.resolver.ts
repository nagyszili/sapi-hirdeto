import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AccessToken } from './token.type';
import { LoginCredentials } from 'src/user/login-credentials.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(@Args() loginInput: LoginCredentials): Promise<AccessToken> {
    return this.authService.login(loginInput.email, loginInput.password);
  }
}
