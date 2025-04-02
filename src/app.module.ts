// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}





import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { Document } from './document/document.entity';
import { User } from './user/user.entity';

// import { DocumentModule } from './document/document.module';
// import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'veda123',
      database: 'newstag',
      entities: [User, Document],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    DocumentModule,
    IngestionModule,
  ],
})

export class AppModule {}
