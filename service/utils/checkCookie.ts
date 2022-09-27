import UserModel from "../DB/model/User";
import { IncomingMessage, ServerResponse } from "http";
// import { FULL_CONFIG } from "../const";

// const { ACCESS_KEY } = FULL_CONFIG;

export const checkCookie = async (
  request: IncomingMessage,
  response: ServerResponse
) => {
  const cookie = getCookieObject(request.headers.cookie);
  const usr = await UserModel.findOne({
    uid: cookie.ACCESS_KEY,
  }).lean();
  return usr || null;
};

const getCookieObject = (s?: string) => {
  if (!s || typeof s !== "string") {
    return {};
  }
  try {
    return Object.fromEntries(
      s.split(";").map((item) => {
        const t = item.trim();
        const l = t.split("=");
        return l;
      })
    );
  } catch {
    return {};
  }
};
