declare module "iyzipay" {
  interface IyzicoOptions {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  interface IyzicoResult {
    status: string;
    token?: string;
    checkoutFormContent?: string;
    paymentStatus?: string;
    basketId?: string;
    conversationId?: string;
    errorCode?: string;
    errorMessage?: string;
    [key: string]: unknown;
  }

  class Iyzipay {
    constructor(options: IyzicoOptions);
    checkoutFormInitialize: {
      create(
        request: Record<string, unknown>,
        callback: (err: unknown, result: IyzicoResult) => void
      ): void;
    };
    checkoutFormResult: {
      retrieve(
        request: { locale?: string; conversationId?: string; token: string },
        callback: (err: unknown, result: IyzicoResult) => void
      ): void;
    };
  }

  export = Iyzipay;
}
