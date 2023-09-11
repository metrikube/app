import { AlertRepository } from '../../../domain/interfaces/repository/alert.repository';
import { Alert } from '../../../domain/models/alert.model';
import { UpdateAlertDto } from '../../../presenter/alert/dtos/update-alert.dto';

export class AlertInMemoryRepositoryImpl implements AlertRepository {
  private alerts: Alert[] = [];

  async getAlerts(): Promise<Alert[]> {
    return this.alerts;
  }

  async findAlertById(id: string): Promise<Alert | undefined> {
    return this.alerts.find((alert) => alert.id === id);
  }

  async findByWidgetId(widgetId: string): Promise<Alert[]> {
    return this.alerts.filter((alert) => alert.widgetId === widgetId);
  }

  async createAlerts(alertOrAlerts: Partial<Alert[]>): Promise<Alert[]> {
    const newAlerts = Array.isArray(alertOrAlerts) ? alertOrAlerts : [alertOrAlerts];
    for (const newAlert of newAlerts) {
      this.alerts.push(newAlert as Alert);
    }
    return newAlerts as Alert[];
  }

  async updateAlert(id: string, payload: UpdateAlertDto): Promise<void> {
    const index = this.alerts.findIndex((alert) => alert.id === id);
    if (index !== -1) this.alerts[index] = { ...this.alerts[index], ...payload };
  }

  async deleteAlert(alertId: string): Promise<void> {
    const index = this.alerts.findIndex((alert) => alert.id === alertId);
    if (index !== -1) this.alerts.splice(index, 1);
  }
}
