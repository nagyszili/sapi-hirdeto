import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdModule } from './ad/ad.module';
import { MainCategoryModule } from './main-category/main-category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdModule,
    MainCategoryModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    MongooseModule.forRoot(config.get('db.url'), {
      useCreateIndex: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
