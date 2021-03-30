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
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      plugins: [
        {
          requestDidStart(): any {
            return {
              // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              didEncounterErrors(requestContext): any {
                console.log(requestContext.errors);
              },
              // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
              willSendResponse(requestContext): any {
                if (config.get('debugMode')) {
                  console.log(
                    ' === REQUEST ===\n',
                    requestContext.request.query,
                  );
                  console.log(
                    ' === VARIABLES ===\n',
                    requestContext.request.variables,
                  );
                  console.log(
                    ' === RESPONSE ===\n',
                    JSON.stringify(requestContext.response.data, null, '  '),
                  );
                }
              },
            };
          },
        },
      ],
    }),
    MongooseModule.forRoot(config.get('db.url'), {
      useCreateIndex: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
