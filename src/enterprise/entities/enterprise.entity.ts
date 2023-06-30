import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}
