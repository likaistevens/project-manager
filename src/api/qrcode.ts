import { _fetch } from "./fetch";

export const listQrCode = async (v?: string) => {
  const sp = new URLSearchParams();
  if (v) {
    v && sp.set("search", v);
    const res = await _fetch("/listQrCode?" + sp);
    return res;
  } else {
    const res = await _fetch("/listQrCode");
    return res;
  }
};

export const createQrCode = async (data: any) => {
  console.log(data);
  const res = await _fetch("/createQrCode", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const updateQrCode = async (data: any) => {
  const res = await _fetch("/updateQrCode", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteQrCode = async (data: any) => {
  const res = await _fetch("/deleteQrCode", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};
