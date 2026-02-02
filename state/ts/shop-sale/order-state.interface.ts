/**
 * 訂單狀態介面
 */
export interface OrderState {
  payOrder(): void;
  shipOrder(): void;
  deliverOrder(): void;
  cancelOrder(): void;
}
