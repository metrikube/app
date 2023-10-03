import type { DashboardMetricsAdapter, WidgetModel } from '@metrikube/core';

interface Execution {
  close: () => void;
}

interface EventHandlers {
  onOpen?: () => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
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
    if (eventHandlers.onError) {
      eventSource.onerror = eventHandlers.onError;
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
