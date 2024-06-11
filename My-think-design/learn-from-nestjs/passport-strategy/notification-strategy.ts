/**
 * 通知策略
 * 
 * 
 */


{
  // BaseNotificationStrategy
  class BaseNotificationStrategy  {
    sendNotification(message: string) {
      console.log('Base notification:', message);
    }
  }

  // notification strategy factory.
  function NotificationStrategyFactory(Base: any, type: string) {
    return class extends Base {
      notificationType: string;

      constructor(...args: any[]) {
        super(...args);
        this.notificationType = type;
        console.log(`${type} notification strategy initialized.`);        
      }

      sendNotification(message: string) {
        console.log(`Sending ${this.notificationType} notification: ${message}`);       
      }
    }
  }

  // const EmailNotificationStrategy = NotificationStrategyFactory(BaseNotificationStrategy, 'Email');
  // const SmsNotificationStrategy = NotificationStrategyFactory(BaseNotificationStrategy, 'SMS');

  // class CustomEmailNotificationStrategy extends EmailNotificationStrategy {
  //   customEmailMethod() {
  //     console.log('Custom method in CustomEmailNotificationStrategy');
  //   }
  // }
  
  // class CustomSmsNotificationStrategy extends SmsNotificationStrategy {
  //   customSmsMethod() {
  //     console.log('Custom method in CustomSmsNotificationStrategy');
  //   }
  // }

  class CustomEmailNotificationStrategy extends NotificationStrategyFactory(BaseNotificationStrategy, 'Email') {
    customEmailMethod() {
      console.log('Custom method in CustomEmailNotificationStrategy');
    }
  }

  class CustomSmsNotificationStrategy extends NotificationStrategyFactory(BaseNotificationStrategy, 'SMS') {
    customSmsMethod() {
      console.log('Custom method in CustomSmsNotificationStrategy');
    }
  }

  const emailNotification = new CustomEmailNotificationStrategy();
  emailNotification.sendNotification('Hello via Email!'); // Outputs: Email notification strategy initialized
                                                          //          Sending Email notification: Hello via Email!
  emailNotification.customEmailMethod(); // Outputs: Custom method in CustomEmailNotificationStrategy

  const smsNotification = new CustomSmsNotificationStrategy();
  smsNotification.sendNotification('Hello via SMS!'); // Outputs: SMS notification strategy initialized
                                                      //          Sending SMS notification: Hello via SMS!
  smsNotification.customSmsMethod(); // Outputs: Custom method in CustomSmsNotificationStrategy
}
