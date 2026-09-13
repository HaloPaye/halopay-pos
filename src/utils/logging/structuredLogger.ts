export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

export class StructuredLogger {
  private correlationId: string;

  constructor(correlationId: string = 'default-session') {
    this.correlationId = correlationId;
  }

  public format(level: LogLevel, message: string, metadata?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      correlationId: this.correlationId,
      metadata,
    };
  }

  public serialize(level: LogLevel, message: string, metadata?: Record<string, unknown>): string {
    return JSON.stringify(this.format(level, message, metadata));
  }
}