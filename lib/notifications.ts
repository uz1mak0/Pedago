// Web Notification API & Push Reminder Manager

export interface NotificationResult {
  granted: boolean;
  message: string;
}

class NotificationManager {
  private hasNotificationSupport(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.hasNotificationSupport()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationResult> {
    if (!this.hasNotificationSupport()) {
      return {
        granted: false,
        message: 'Push notifications are not supported in this browser environment.',
      };
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return {
          granted: true,
          message: 'Push notifications enabled! You will receive daily practice reminders.',
        };
      } else {
        return {
          granted: false,
          message: 'Notification permission was denied. You can re-enable it in browser settings.',
        };
      }
    } catch {
      return {
        granted: false,
        message: 'Could not request notification permissions.',
      };
    }
  }

  public sendNotification(title: string, options?: NotificationOptions): boolean {
    if (!this.hasNotificationSupport() || Notification.permission !== 'granted') {
      return false;
    }

    try {
      new Notification(title, {
        icon: '/icon.svg',
        badge: '/icon.svg',
        ...options,
      });
      return true;
    } catch {
      return false;
    }
  }

  public triggerDailyGoalReminder(streakDays: number): boolean {
    const title = '🇵🇭 Pedago: Oras na para mag-aral!';
    const body = `Huwag kalimutan ang iyong ${streakDays}-araw na streak! Mag-aral ng 5 minutong Tagalog ngayon. (Keep your ${streakDays}-day streak alive! Practice 5 minutes of Tagalog now.)`;

    return this.sendNotification(title, {
      body,
      tag: 'pedago-daily-reminder',
    });
  }
}

export const notificationManager = new NotificationManager();
