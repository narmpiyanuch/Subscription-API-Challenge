import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { PrisamaModule } from 'prisma/prisma.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BlacklistModule } from './blacklist/blacklist.module';

@Module({
  imports: [RegisterModule, PrisamaModule, SubscriptionModule, BlacklistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
