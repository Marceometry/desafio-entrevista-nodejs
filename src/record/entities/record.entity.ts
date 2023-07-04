import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Enterprise } from '../../enterprise/entities/enterprise.entity'
import { Vehicle } from '../../vehicle/entities/vehicle.entity'

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
