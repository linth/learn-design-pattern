import { log } from "console";
import { LogContextBuilder } from "./logger";
import { NotificationBuilder } from "./notification";

{
  const user = {
    id: '123',
  };
  const order = {
    id: '456',
  };
  const req = {
    id: '789',
  };

  // 建立通知
  const notification = new NotificationBuilder()
    .to(user.id)
    .via('email')
    .title('訂單完成')
    .body(`你的訂單 ${order.id} 已完成`)
    .priority('high')
    .build();

  // 建立 log context
  const logCtx = new LogContextBuilder()
    .request(req.id)
    .action('SendOrderNotification')
    .user(user.id)
    .payload(notification)
    .success()
    .build();

  // 顯示建立好的物件
  console.log(notification);
  console.log(logCtx);

  /**
   * 後續就可以使用專案內的logger or mq方式進行資料傳送，資料的格式與內容則是使用builder建立好的物件
   */
  // logger.info(logCtx);
  // mq.publish('notification.send', notification);
}