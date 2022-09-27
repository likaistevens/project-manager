import { _fetch } from "./fetch";

export const listDiary = async (v?: string) => {
  const sp = new URLSearchParams();
  if (v) {
    v && sp.set("search", v);
    const res = await _fetch("/listDiary?" + sp);
    return res;
  } else {
    const res = await _fetch("/listDiary");
    return res;
  }
};

export const createDiary = async (data: any) => {
  const res = await _fetch("/createDiary", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const updateDiary = async (data: any) => {
  const res = await _fetch("/updateDiary", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteDiary = async (data: any) => {
  const res = await _fetch("/deleteDiary", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};
