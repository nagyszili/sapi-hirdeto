import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MainCategoryModule } from './main-category/main-category.module';
import { AdModule } from './ad/ad.module';
import { SeederModule } from './seeder/seeder.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/locations.module';

@Module({
  imports: [
    AuthModule,
    AdModule,
    MainCategoryModule,
    UserModule,
    LocationModule,
    SeederModule,
    CategoryModule,
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    MongooseModule.forRoot(config.get('db.url'), {
      useCreateIndex: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
