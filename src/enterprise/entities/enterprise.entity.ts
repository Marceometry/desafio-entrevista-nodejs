import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Record } from '../../record/entities/record.entity'

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  cnpj: string

  @Column()
  address: string

  @Column()
  phone: string

  @Column()
  motorbikeParkingSpots: number

  @Column()
  carParkingSpots: number

  @OneToMany(() => Record, (record) => record.enterprise)
  records: number[]
}
