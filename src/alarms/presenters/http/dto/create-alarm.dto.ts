export class CreateAlarmDto {
    name: string;
    severity: string;
    triggeredAt: Date;
    items: { name: string, type: string }[]
}
