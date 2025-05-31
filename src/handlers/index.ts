export type Handler = (request: Request) => Promise<Response>;
export type CreateHandler = () => Promise<Handler> | Handler;
