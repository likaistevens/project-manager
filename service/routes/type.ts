import { IncomingMessage, ServerResponse } from "http";

export type HandleProps = {
  request: IncomingMessage;
  response: ServerResponse;
  postData: any;
  uid: string;
};
