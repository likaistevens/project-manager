import { _fetch } from "./fetch";

export const listProject = async (v?: string) => {
  const sp = new URLSearchParams();
  if (v) {
    v && sp.set("search", v);
    const res = await _fetch("/listProject?" + sp);
    return res;
  } else {
    const res = await _fetch("/listProject");
    return res;
  }
};

export const createProject = async (data: any) => {
  const res = await _fetch("/createProject", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const updateProject = async (data: any) => {
  const res = await _fetch("/updateProject", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteProject = async (data: any) => {
  const res = await _fetch("/deleteProject", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res;
};
