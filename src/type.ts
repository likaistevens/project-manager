export const FieldTypeMap: Record<string, string> = {
  meego: "Meego",
  demand: "需求文档",
  design: "设计图",
  test: "提测文档",
  dev: "技术文档",
  summary: "项目总结",
  retrospect: "项目复盘",
  eventTracking: "埋点文档",
  starling: "Starling",
};

export type ProjectCardType = {
  id: string;
  name: string;
  fields: Partial<Record<string, string>>;
  hasDesc?: boolean;
  todo?: TodoItem[];
  description?: string;
};

export type TodoItem = {
  id: string;
  done: boolean;
  event: string;
};

export type LinkItemType = {
  id?: string;
  title?: string;
  url?: string;
  desc?: string;
};

export type DiaryItem = {
  id?: string;
  date?: number;
  content?: string;
};

export type QrCodeItemType = {
  id?: string;
  title?: string;
  url?: string;
  imageId?: string;
};
