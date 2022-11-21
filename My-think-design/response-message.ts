/**
 * Response message format.
 * 
 * 1xx: 臨時資訊回應
 * 2xx: 成功回應
 * 3xx: 重新導向
 * 4xx: 客戶端請求錯誤
 * 5xx: 伺服器內部錯誤
 * 
 * Reference:
 *  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

interface IResponseWrapper<T> {
    
}

abstract class AbsResponsWrapper<T> implements IResponseWrapper<T> {
    
}

class UnifiedResponse<T> implements AbsResponsWrapper<T> {
    _status: string;
    _statusCode: number;
    _data?: T | undefined;
    
    constructor(status: string, statusCode: number, data?: T) {
        this._status = status;
        this._statusCode = statusCode;
        this._data = data;
    }
    
    /**
     * set up the status.
     * 
     * @param s the status' string.
     * @returns the object of BadRequestResponse.
     */
    public setStatus(s: string): AbsResponsWrapper<T> {
        this._status = s;
        return this;
    }

    /**
     * set up the status code.
     * 
     * @param sc the status code's value.
     * @returns the object of BadRequestResponse.
     */
    public setStatusCode(sc: number): AbsResponsWrapper<T> {
        this._statusCode = sc;
        return this;
    }

    /**
     * set up the data.
     * 
     * @param d the data's object.
     * @returns the object of BadRequestResponse.
     */
    public setData(d: T): AbsResponsWrapper<T> {
        this._data = d;
        return this;
    }    
}


/**
 * define several custom response message, i.e., 404, 201, 500, ..., etc.
 */
class SuccessfulResponse<T> extends UnifiedResponse<T> {
    constructor(data?: T) {
        super('Successful', 200, data);
    }
}

class BadRequestResponse<T> extends UnifiedResponse<T> {
    constructor(data?: T) {
        super('Bad request', 400, data);
    }
}

class CreatedResponse<T> extends UnifiedResponse<T> {
    constructor(data?: T) {
        super('Created object', 201, data);
    }
}

class AcceptedResponse<T> extends UnifiedResponse<T> {
    /**
     * request has been accepted for processing, but the processing has not been completed.
     */
    constructor() {
        super('Accepted request, but not ', 202);
    }
}

class NoContentResponse<T> extends UnifiedResponse<T> {
    constructor() {
        super('No Content', 204);
    }
}

class UnauthorizedResponse<T> extends UnifiedResponse<T> {
    /**
     * response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
     */
    constructor() {
        super('Unauthorized', 401);
    }
}

class ForbiddenResponse<T> extends UnifiedResponse<T> {
    /**
     * response status code indicates that the server understands the request but refuses to authorize it.
     */
    constructor() {
        super('Forbidden', 403);
    }
}

class NotFoundResponse<T> extends UnifiedResponse<T> {
    /**
     * response status code indicates that the server cannot find the requested resource.
     */
    constructor() {
        super('Not Found', 404);
    }
}

class InternalServerErrorResponse<T> extends UnifiedResponse<T> {
    /**
     * server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     */
    constructor() {
        super('Internal Server Error', 500);
    }
}

class BadGatewayResponse<T> extends UnifiedResponse<T> {
    /**
     * server error response code indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.
     */
    constructor() {
        super('Bad Gateway', 502);
    }
}