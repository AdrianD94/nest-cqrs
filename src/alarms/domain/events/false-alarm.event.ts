import { AutowiredEvent } from "src/shared/decorators/autowired-event.decorator";

@AutowiredEvent
export class FalseAlarmEvent{
    constructor(public readonly alarmId:string){}
}