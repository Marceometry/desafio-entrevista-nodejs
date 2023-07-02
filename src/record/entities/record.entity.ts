import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Vehicle } from '../../vehicle/entities/vehicle.entity'
import { Enterprise } from 'src/enterprise/entities/enterprise.entity'

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  entry_timestamp: Date

  @Column({ nullable: true })
  exit_timestamp: Date

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.records)
  enterprise: number

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.records)
  vehicle: number
}
