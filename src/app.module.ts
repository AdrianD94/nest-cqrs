import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/alarms.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/application-bootstrap-options';
import { AlarmInfrastructureModule } from './alarms/infrastructure/alarm-infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CqrsModule.forRoot(),CoreModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions){
    return{
      module: AppModule,
      imports:[
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(AlarmInfrastructureModule.use(options.driver))
      ]
    }
  }
}
