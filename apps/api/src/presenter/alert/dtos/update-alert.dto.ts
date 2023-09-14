import { PartialType, PickType } from '@nestjs/swagger';

import { AlertEntity } from '../../../infrastructure/database/entities/alert.entity';

export class UpdateAlertDto extends PartialType(PickType(AlertEntity, ['label', 'isActive', 'triggered', 'condition'])) {}
