import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmFactory } from './domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './application/queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './application/event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from './application/commands/acknowledge-alarm.command-handler';
import { AcknowledgeAlarmEventEventHandler } from './application/event-handlers/alarm-acknowledge.event-handler';
import { FalseAlarmCommandHandler } from './application/commands/false-alarm.command-handler';
import { FalseAlarmEventHandler } from './application/event-handlers/false-alarm.event-handler';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory, CreateAlarmCommandHandler, GetAlarmsQueryHandler, AlarmCreatedEventHandler, AcknowledgeAlarmCommandHandler, AcknowledgeAlarmEventEventHandler, FalseAlarmCommandHandler, FalseAlarmEventHandler],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule]
    }
  }
}
