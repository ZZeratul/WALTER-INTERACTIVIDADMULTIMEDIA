import { Module } from '@nestjs/common'
import { ParametricasModule } from './parametricas/parametricas.module'

@Module({
  imports: [ParametricasModule],
})
export class ApplicationModule {}
