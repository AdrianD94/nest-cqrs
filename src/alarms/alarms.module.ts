import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmFactory } from './domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './application/queries/get-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory, CreateAlarmCommandHandler, GetAlarmsQueryHandler],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule]
    }
  }
}
