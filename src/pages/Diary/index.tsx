import { Button, Input } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { DiaryItem } from "../../type";
import { DiaryCard } from "./DiaryCard";
import { IconPlus } from "@arco-design/web-react/icon";
import { getId } from "../../utils";
import { debounce } from "lodash";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { listDiary } from "../../api/diary";
import update from "immutability-helper";
import dayjs from "dayjs";

export const Diary: React.FC = () => {
  const [diaryList, setDiaryList] = useState<DiaryItem[]>([]);
  const [originList, setOriginList] = useState<DiaryItem[]>([]);
  const [isEditList, setIsEditList] = useState<number[]>([]);

  const [search, setSearch] = useLocalStorage<string>("diary_search");

  const getList = async (v?: string) => {
    const data = await listDiary(v);
    if (search) {
      onSearch(search, data);
    } else {
      setDiaryList(data);
    }
    setOriginList(data);
  };
  const onCreate = () => {
    const date = new Date().getTime();
    setIsEdit(date, true);
    setDiaryList((oldList) => {
      return [
        {
          id: getId("diary"),
          date,
          conten: "",
        },
        ...oldList,
      ];
    });
  };

  const onSearch = debounce((v: string, list?: DiaryItem[]) => {
    if (v) {
      setDiaryList(
        (list || originList).filter((item) => {
          const dateStr = dayjs(item.date).format("YYYYMMDD");
          return dateStr.includes(v) || item.content?.includes(v);
        })
      );
    } else {
      setDiaryList(list || originList);
    }
  }, 300);

  const setIsEdit = (date: number, isEdit: boolean) => {
    if (isEdit) {
      setIsEditList((old) => {
        return update(old, { $push: [date] });
      });
    } else {
      setIsEditList((old) => {
        const index = old.indexOf(date);
        if (index < -1) {
          return old;
        } else {
          return update(old, { $splice: [[index, 1]] });
        }
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div
      className="flex h-full"
      style={{
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", marginBottom: 20, height: 32 }}>
        <Input.Search
          allowClear
          placeholder=""
          onChange={(v) => {
            setSearch(v);
            onSearch(v);
          }}
          value={search}
        />
        <Button
          type="primary"
          long
          shape="round"
          style={{ width: 150, marginLeft: 20 }}
          onClick={onCreate}
        >
          <IconPlus />
        </Button>
      </div>
      <div
        className="overflow-auto"
        style={{
          marginRight: -20,
          paddingRight: 20,
        }}
      >
        {diaryList.map((item) => {
          return (
            <DiaryCard
              key={item.id}
              item={item}
              isEdit={Boolean(item?.date && isEditList.includes(item.date))}
              setIsEdit={(isEdit) => {
                console.log(item?.date || 0, isEdit);
                setIsEdit(item?.date || 0, isEdit);
              }}
              getList={getList}
              setDiaryList={setDiaryList}
            />
          );
        })}
      </div>
    </div>
  );
};
