import type { DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

interface Execution {
  close: () => void;
}

interface EventHandlers {
  onOpen?: () => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: () => void;
}

export class GetWidgetsUsecase {
  constructor(private readonly dashboardMetrics: DashboardMetricsAdapter) {}

  execute(eventHandlers: EventHandlers): Execution {
    const eventSource = this.dashboardMetrics.getWidgets();
    if (eventHandlers.onOpen) {
      eventSource.onopen = eventHandlers.onOpen;
    }
    if (eventHandlers.onMessage) {
      eventSource.onmessage = eventHandlers.onMessage;
    }
    return {
      close: () => {
        if (eventHandlers.onClose) {
          eventHandlers.onClose();
        }
        eventSource.close();
      }
    };
  }
}
