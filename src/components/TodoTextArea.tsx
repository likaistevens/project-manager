import { Button, Checkbox, Link } from "@arco-design/web-react";
import React, { useRef, useState } from "react";
import { TodoItem } from "../type";
import update from "immutability-helper";
import { getId } from "../utils";
import { IconPlusCircle } from "@arco-design/web-react/icon";

const finishedStyle = { textDecoration: "line-through", color: "#86909c" };

export const TodoTextArea: React.FC<{
  value?: TodoItem[];
  onChange?: (v: TodoItem[], item: TodoItem, status: string) => void;
}> = ({ value, onChange }) => {
  const ref = useRef(Math.round(Math.random() * 1000));
  const timerRef = useRef<any>(null);

  const [contentEditable, setContentEditable] = useState<boolean>();

  const focus = (index: number, direction: "next" | "pre" | "cur") => {
    setTimeout(() => {
      clearTimeout(timerRef.current);
      console.log("clear timeout");
      setContentEditable(true);
      console.log("setContentEditable true");
    }, 0);

    const map = {
      next: index + 1,
      pre: index - 1,
      cur: index,
    };
    const t = document.querySelector(
      `#todo_input_${ref.current}_${map[direction]}`
    ) as any;
    t && t.focus();
  };

  if (!value?.length) {
    return (
      <Button
        type="dashed"
        long
        style={{ background: "#fff", height: "100%" }}
        onClick={() => {
          const newItem = { id: getId("todo"), event: "", done: false };
          onChange?.(
            update(value || [], {
              $push: [newItem],
            }),
            newItem,
            "create"
          );
        }}
      >
        <IconPlusCircle fontSize={30} />
      </Button>
    );
  }

  return (
    <div
      // id={`todo_input_area`}
      onDoubleClick={() => {
        setContentEditable(true);
      }}
      onBlur={() => {
        timerRef.current = setTimeout(() => {
          console.log("setContentEditable false");
          setContentEditable(false);
        }, 100);
      }}
    >
      {value?.map((item, index) => {
        return (
          <div key={item.id} className="flex">
            <Checkbox
              checked={item.done}
              onChange={(v) => {
                const newList = update(value, {
                  [index]: { done: { $set: v } },
                });
                onChange?.(newList, newList[index], "update");
              }}
              style={{ marginRight: 8 }}
            />
            <div
              style={{
                ...(item.done ? finishedStyle : { fontWeight: 600 }),
                cursor: contentEditable ? "text" : "pointer",
              }}
              className="inline-block w-full break-all"
              id={`todo_input_${ref.current}_${index}`}
              contentEditable={contentEditable}
              suppressContentEditableWarning
              // onDoubleClick={() => {
              //   // focus(index, "cur");
              //   setContentEditable((old) => {
              //     console.log(
              //       update(old, {
              //         [index]: { $set: true },
              //       })
              //     );
              //     return update(old, {
              //       [index]: { $set: true },
              //     });
              //   });
              // }}
              onBlur={(e) => {
                // setContentEditable((old) => {
                //   return update(old, {
                //     [index]: { $set: false },
                //   });
                // });
                const newText = (e.target as any).innerHTML;
                const newList = update(value, {
                  [index]: { event: { $set: newText } },
                });
                onChange?.(newList, newList[index], "update");
              }}
              onKeyDown={(e) => {
                const newText = (e.target as any).innerHTML;
                if (e.key === "Enter") {
                  (e as any).returnValue = false;
                  const newValue = update(value, {
                    $splice: [
                      [
                        index + 1,
                        0,
                        { event: "", done: false, id: getId("todo") },
                      ],
                    ],
                  });
                  onChange?.(newValue, newValue[index + 1], "create");
                  setTimeout(() => {
                    focus(index, "next");
                  }, 0);

                  e.stopPropagation();
                  e.preventDefault();
                } else if (e.key === "Backspace") {
                  if (!newText) {
                    const newValue = update(value, {
                      $splice: [[index, 1]],
                    });
                    onChange?.(newValue, value[index], "delete");
                    setTimeout(() => {
                      focus(index, "pre");
                    }, 0);
                  }
                } else if (e.key === "ArrowDown") {
                  focus(index, "next");
                } else if (e.key === "ArrowUp") {
                  focus(index, "pre");
                }
              }}
              dangerouslySetInnerHTML={{
                // __html: `${
                //   item.event?.startsWith("http")
                //     ? `<a href=${item.event} target="_blank">${item.event}</a>`
                //     : `${item.event}`
                // }`,
                __html: item.event,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
