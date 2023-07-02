import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import { Record } from '../../record/entities/record.entity'

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  brand: string

  @Column()
  model: string

  @Column()
  color: string

  @Column()
  plate: string

  @Column()
  type: 'car' | 'motorbike'

  @OneToMany(() => Record, (record) => record.vehicle)
  records: number[]
}
