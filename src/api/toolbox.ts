import { _fetch } from "./fetch";

export const listToolBoxItem = async (v?: string) => {
  const sp = new URLSearchParams();
  if (v) {
    v && sp.set("search", v);
    const res = await _fetch("/listToolBoxItem?" + sp);
    return res;
  } else {
    const res = await _fetch("/listToolBoxItem");
    return res;
  }
};

export const createToolBoxItem = async (data: any) => {
  console.log(data);
  const res = await _fetch("/createToolBoxItem", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const updateToolBoxItem = async (data: any) => {
  const res = await _fetch("/updateToolBoxItem", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteToolBoxItem = async (data: any) => {
  const res = await _fetch("/deleteToolBoxItem", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};
