class LogContext {
  requestId?: string;
  traceId?: string;
  action?: string;
  userId?: string;
  payload?: any;
  status?: 'success' | 'fail';
  error?: any;
}



export class LogContextBuilder {
  private ctx = new LogContext();

  request(reqId: string) {
    this.ctx.requestId = reqId;
    return this;
  }

  action(action: string) {
    this.ctx.action = action;
    return this;
  }

  user(userId: string) {
    this.ctx.userId = userId;
    return this;
  }

  payload(data: any) {
    this.ctx.payload = data;
    return this;
  }

  success() {
    this.ctx.status = 'success';
    return this;
  }

  fail(error: any) {
    this.ctx.status = 'fail';
    this.ctx.error = error;
    return this;
  }

  build(): LogContext {
    return this.ctx;
  }
}
