import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn, UpdateEvent } from 'typeorm';

import { MetricThresholdOperator, MetricThresholdOperatorEnum } from '@metrikube/common';

import { Alert } from '../../../domain/models/alert.model';
import { WidgetEntity } from './widget.entity';

@Entity('alert')
export class AlertEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column({ default: false })
  triggered: boolean;

  @Column({ type: 'datetime', default: null })
  triggeredAt: Date;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @JoinColumn({ foreignKeyConstraintName: 'fk_widget_id' })
  @ManyToOne(() => WidgetEntity, (widget: WidgetEntity) => widget.metric)
  widget: WidgetEntity;

  @Column({ type: 'uuid', nullable: false })
  @RelationId((alert: AlertEntity) => alert.widget)
  widgetId: WidgetEntity['id'];

  @Column({ type: 'json' })
  condition: {
    field: string;
    operator: MetricThresholdOperator;
    threshold: string | number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @BeforeUpdate()
  // beforeUpdate(event: UpdateEvent<AlertEntity>) {
  //   console.log("event : ", event);
  //   if (event.entity?.triggered) event.entity.triggeredAt = new Date();
  // }

  static toModel(entity: AlertEntity): Alert {
    return new Alert(entity.id, entity.label, entity.widgetId, entity.isActive, entity.triggered, entity.triggeredAt, {
      field: entity.condition.field,
      operator: entity.condition.operator as MetricThresholdOperatorEnum,
      threshold: entity.condition.threshold
    });
  }

  static toModelDetailed(entity: AlertEntity): Alert {
    const alertModel = AlertEntity.toModel(entity);
    alertModel.widget = entity.widget && WidgetEntity.toModel(entity.widget);
    return alertModel;
  }
}
