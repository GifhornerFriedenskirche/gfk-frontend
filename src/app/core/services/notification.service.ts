import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  
  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  showSuccess(title: string, message: string, duration: number = 5000): void {
    this.addNotification('success', title, message, duration);
  }

  showError(title: string, message: string, duration: number = 8000): void {
    this.addNotification('error', title, message, duration);
  }

  showWarning(title: string, message: string, duration: number = 6000): void {
    this.addNotification('warning', title, message, duration);
  }

  showInfo(title: string, message: string, duration: number = 5000): void {
    this.addNotification('info', title, message, duration);
  }

  private addNotification(type: Notification['type'], title: string, message: string, duration: number): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      title,
      message,
      duration,
      timestamp: new Date()
    };

    const currentNotifications = this.notifications$.value;
    this.notifications$.next([...currentNotifications, notification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notifications$.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notifications$.next(filteredNotifications);
  }

  clearAll(): void {
    this.notifications$.next([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
