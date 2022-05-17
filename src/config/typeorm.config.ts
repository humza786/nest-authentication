import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'user-management',
  autoLoadEntities: true,
  synchronize: true,
  entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
}
