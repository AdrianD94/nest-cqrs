import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/application-bootstrap-options';

@Module({})
export class CoreModule {
    static forRoot(options: ApplicationBootstrapOptions) {
        const imports = options.driver === 'orm' ? [
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                password: 'root',
                username: 'postgres',
                autoLoadEntities: true,
                synchronize: true
            })
        ] : []
        return {
            module: CoreModule,
            imports
        }
    }
}
