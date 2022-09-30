import { checkCookie } from "../utils/checkCookie";
import { HandleProps } from "./type";
import _ from "lodash";

export const validateUser = async (props: HandleProps) => {
  const usr = await checkCookie(props.request, props.response);
  return _.pick(usr, ["username", "_id"]);
};
