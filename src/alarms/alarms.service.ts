import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './application/commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './application/queries/get-alarms.query';
import { AcknowledgeAlarmCommand } from './application/commands/acknowledge-alarm.command';

@Injectable()
export class AlarmsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }
  async create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  async findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

  async acknowledge(alarmId:string){
    return this.commandBus.execute(new AcknowledgeAlarmCommand(alarmId))
  }
}
