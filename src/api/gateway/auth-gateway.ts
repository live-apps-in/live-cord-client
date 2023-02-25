import { AxiosRequestConfig } from "axios";
import { Gateway } from "./index";
import { gatewayConfig } from "src/config";

export class AuthGateway extends Gateway {
    constructor(config: AxiosRequestConfig<any> & { setupCustomizations?: boolean } = {}) {
        super({ baseURL: gatewayConfig.auth, ...config });
    }
}

export const authGateway = new AuthGateway().create();
