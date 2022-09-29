import { Button, Form, Modal, Image, Upload } from "@arco-design/web-react";
import useForm from "@arco-design/web-react/es/Form/useForm";
import React from "react";
import { _fetch } from "../../api/fetch";

export const UploadImg = () => {
  const getImage = async () => {
    const sp = new URLSearchParams();
    sp.append("id", "fefb26a976468a018ad6bcb8f35dc218");
    await _fetch(
      `http://localhost:9500/api/common_api/v1/getimage?${sp.toString()}`
    );
  };

  return (
    <>
      <Upload
        listType="picture-card"
        multiple
        name="file"
        action="http://likai1996.cn/api/common_api/v1/upload"
        // customRequest={async (option) => {
        //   const { onProgress, onError, onSuccess, file } = option;
        //   const formData = new FormData();
        //   formData.append("file", file);

        //   const res = await _fetch("/upload", {
        //     method: "POST",
        //     body: formData,
        //   });
        //   console.log(res);
        // }}
        // action="/"
        headers={
          {
            // "Access-Control-Allow-Origin": "*",
            // "access-control-allow-headers": "*",
            // credentials: "mode",
            // mode: "no-cors",
            // "Access-Control-Allow-Headers":
            //   "Access-Control-Allow-Origin,Content-Type",
          }
        }
        // withCredentials
      />
      <form
        action="http://localhost:9500/api/common_api/v1/upload"
        // action="/upload"
        encType="multipart/form-data"
        method="post"
      >
        <div>
          File: <input type="file" name="upload" />
        </div>
        <input type="submit" value="Upload" />
      </form>

      <Button onClick={getImage}>GET</Button>
      <Image
        width={100}
        height={100}
        src="http://likai1996.cn/api/common_api/v1/getimage?id=fefb26a976468a018ad6bcb8f35dc218"
      />
    </>
  );
};
