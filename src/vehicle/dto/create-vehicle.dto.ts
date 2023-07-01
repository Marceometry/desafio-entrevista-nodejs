export class CreateVehicleDto {
  brand: string
  model: string
  color: string
  plate: string
  type: 'car' | 'motorbike'
}
