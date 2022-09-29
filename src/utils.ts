import { pinyin } from "pinyin-pro";
import { includes } from "lodash";
import { QrCodeItemType } from "./type";

export const getId = (prefix: string) => {
  const min = 100000;
  const max = 999999;
  const range = max - min;
  const random = Math.random();
  const result = min + Math.round(random * range);
  return `${prefix || ""}-${result}-${new Date().getTime()}`;
};

export function includesByPinyin(
  source: string,
  target: string | Record<string, string | undefined>
): boolean {
  const includeStr = (t: string) => {
    const targetPy = pinyin(t, {
      pattern: "pinyin",
      toneType: "none",
    })
      .replaceAll(" ", "")
      .replaceAll("ü", "u")
      .toLocaleLowerCase();
    const sourcePy = pinyin(source, {
      pattern: "pinyin",
      toneType: "none",
      v: true,
    })
      .replaceAll(" ", "")
      .toLocaleLowerCase();
    return includes(targetPy, sourcePy);
  };
  if (typeof target === "string") {
    return includeStr(target);
  } else {
    return Object.values(target).some((item) => {
      return includeStr(item || "");
    });
  }
}

export function getAweme(item: Partial<QrCodeItemType>) {
  const sp = new URLSearchParams();
  item.params?.forEach((p) => {
    sp.append(p[0], p[1]);
  });
  return `${item.protocol}://${item.path}?${sp.toString()}`;
}
