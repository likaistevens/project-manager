import { Input, DatePicker, Modal } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { DiaryItem } from "../../type";
import update from "immutability-helper";
import { remove, findIndex } from "lodash";
import { IconDelete, IconEdit, IconSave } from "@arco-design/web-react/icon";
import { createDiary, deleteDiary, updateDiary } from "../../api/diary";
import dayjs, { Dayjs } from "dayjs";

const color = "#A9AEB8";

const dayMap = [
  "星期天",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

export const DiaryCard: React.FC<{
  item: DiaryItem;
  isEdit: boolean;
  setIsEdit: (v: boolean) => void;
  getList: (v?: string) => Promise<void>;
  setDiaryList: React.Dispatch<React.SetStateAction<DiaryItem[]>>;
}> = ({ item, isEdit, setIsEdit, getList, setDiaryList }) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Dayjs>(dayjs(item.date || 0));

  const onDelete = async () => {
    Modal.confirm({
      title: "确认删除",
      content: `确认删除 ${dayjs(item.date).format("YYYY-MM-DD")} 的日志？`,
      okButtonProps: {
        status: "danger",
      },
      onOk: async () => {
        if (item.id?.startsWith("diary")) {
          setDiaryList((oldList) => {
            const temp = [...oldList];
            remove(temp, (x) => x.id === item.id);
            return temp;
          });
        } else {
          await deleteDiary({ id: item.id });
        }
        getList();
      },
    });
  };

  const onSave = async () => {
    if (item.id?.startsWith("diary")) {
      await createDiary({ ...item, content });
    } else {
      await updateDiary({ ...item, content });
    }
    getList();
    setIsEdit(false);
  };

  const onChangeDate = async (dateString: string, date: dayjs.Dayjs) => {
    if (item.id?.startsWith("diary")) {
      setDiaryList((oldList) => {
        const index = findIndex(oldList, (x) => x.id === item.id);
        return update(oldList, {
          [index]: { date: { $set: date.valueOf() } },
        });
      });
    } else {
      await updateDiary({ ...item, date: date.valueOf() });
    }
    setDate(date);
  };

  useEffect(() => {
    item.content && setContent(item.content);
  }, []);

  return (
    <div
      style={{
        marginBottom: 20,
        borderRadius: 6,
        overflow: "hidden",
        border: `1px solid ${color}`,
      }}
    >
      <div
        className="flex justify-between items-center"
        style={{
          background: color,
          padding: "10px 15px",
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
        }}
      >
        <div>
          {/* @ts-ignore */}
          <DatePicker
            triggerElement={
              <span className="icon-btn">{date.format("MM - DD")}</span>
            }
            style={{ width: 268 }}
            value={date}
            onChange={onChangeDate}
          />
          <span style={{ marginLeft: 20 }}>{dayMap[date.get("day")]}</span>
        </div>

        <div>
          {isEdit ? (
            <IconSave
              style={{ marginRight: 8 }}
              className="icon-btn"
              onClick={onSave}
            />
          ) : (
            <IconEdit
              style={{ marginRight: 8 }}
              className="icon-btn"
              onClick={() => {
                console.log("card setIsEdit", true);
                setIsEdit(true);
              }}
            />
          )}

          <IconDelete className="icon-btn" onClick={onDelete} />
        </div>
      </div>
      <div style={{ padding: 15 }}>
        {isEdit ? (
          <Input.TextArea
            placeholder="Please enter ..."
            value={content}
            onChange={setContent}
            autoSize={{ minRows: 5 }}
            // style={{ width: 350 }}
          />
        ) : (
          <div style={{ whiteSpace: "pre-wrap" }}>{item.content}</div>
        )}
      </div>
    </div>
  );
};

const getColor = (index: number) => {
  return color[index % 13];
};
