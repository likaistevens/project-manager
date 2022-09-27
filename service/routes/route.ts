import { IncomingMessage, ServerResponse } from "http";
import { checkCookie } from "../utils/checkCookie";
import path from "path";
import fs from "fs";
import { FULL_CONFIG } from "../const";
import dotenv from "dotenv";

dotenv.config();

const { API_PREFIX, CLIENT_PREFIX } = FULL_CONFIG;

const SupportFileType = ["json", "js", "css", "png", "ico", "jpg", "jpeg"];
const isProd = process.env.NODE_ENV === "production";
const clientBuildPath = path.join(
  __dirname,
  isProd ? "../../../" : "../../",
  process.env.BUILD_PATH || "./dist/client"
);
console.log("clientBuildPath", clientBuildPath);
console.log(
  `isProd = ${isProd}`,
  path.join(__dirname, isProd ? "../../../" : "../../")
);

export type Route = (
  pathname: string,
  handle: Record<string, Function>,
  request: IncomingMessage,
  response: ServerResponse
) => void;

const route: Route = async (pathname, handle, request, response) => {
  console.log("About to a request for " + pathname);
  const judgePrefix = pathname.startsWith(API_PREFIX);
  const shortUrl = pathname.substring(API_PREFIX.length);

  // 前端静态资源
  if (SupportFileType.some((f) => pathname.includes(`.${f}`))) {
    console.log("readfile", path.join(clientBuildPath, `${pathname}`));
    let buf = fs.readFileSync(path.join(clientBuildPath, `${pathname}`));
    response.write(buf);
    response.end();
    return;
  }

  // 前端路由都指向index.html
  if (pathname.startsWith(CLIENT_PREFIX)) {
    console.log("readfile", path.join(clientBuildPath, "/index.html"));
    let buf = fs.readFileSync(path.join(clientBuildPath, "/index.html"));
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(buf);
    response.end();
    return;
  }

  // 服务端路由
  if (judgePrefix && typeof handle[shortUrl] === "function") {
    const origin = request.headers.origin || "http://localhost:3300";
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    const usr = await checkCookie(request, response);
    if (!usr) {
      response.writeHead(500, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          message: "没有权限查看",
          status: "no-permission",
        })
      );
      response.end();
      return;
    }

    response.writeHead(200, { "Content-Type": "application/json" });
    if (request.method?.toLocaleLowerCase() === "post") {
      let postData = "";

      request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
      });

      request.addListener("end", async function () {
        const res = await handle[shortUrl]({
          request,
          response,
          postData,
          uid: usr.uid,
        });
        response.end(JSON.stringify(res));
      });
    } else {
      const res = await handle[shortUrl]({ request, response, uid: usr.uid });
      // console.log(res);
      response.end(JSON.stringify(res));
    }
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("404 Not found");
    response.end();
  }
};

export default route;
