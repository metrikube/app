import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

import { ApiProperty } from '@nestjs/swagger'

@Entity('alert')
export class AlertEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ name: 'id', type: String, description: 'Alert id', example: 'fab8f183-7021-4a42-b429-447ee7415b93' })
  id: string

  @Column()
  @ApiProperty({
    name: 'label',
    type: String,
    description: 'Alert label',
    example: 'EC2 Instance usage alert when cost is greater than 100$'
  })
  label: string

  @ApiProperty({
    name: 'triggered',
    type: Boolean,
    description: 'Alert triggered',
    example: false
  })
  @Column()
  triggered: boolean

  @ApiProperty({
    name: 'condition',
    type: 'json',
    description: 'Alert condition'
  })
  @Column({ type: 'json' })
  condition: {
    field: string
    operator: string
    value: number
  }

  @CreateDateColumn()
  @ApiProperty({
    name: 'createdAt',
    type: Date,
    description: 'Plugin creation date',
    example: '2023-01-01T00:00:00.000Z'
  })
  createdAt: Date
}
