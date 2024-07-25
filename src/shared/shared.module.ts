import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from './infrastructure/share-infrastructure.module';
import { AggregateRehydrator } from './aggregate-rehydrator';

@Module({ imports: [SharedInfrastructureModule], providers: [AggregateRehydrator], exports: [SharedInfrastructureModule, AggregateRehydrator] })
export class SharedModule { }
