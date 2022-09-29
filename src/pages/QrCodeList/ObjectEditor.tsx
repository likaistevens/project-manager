import { Button, Grid, Input } from "@arco-design/web-react";
import {
  IconDelete,
  IconDoubleDown,
  IconDoubleUp,
  IconPlus,
} from "@arco-design/web-react/icon";
import React, { useEffect, useState } from "react";
import update from "immutability-helper";

type T = Array<[string, string]>;

export const ObjectEditor: React.FC<{
  value?: T;
  onChange?: (v: T) => void;
}> = ({ value, onChange }) => {
  const [entries, setEntries] = useState(value || []);

  //   useEffect(() => {
  //     console.log(entries);
  //   }, [entries]);
  return (
    <div>
      {entries.map(([key, value], index) => {
        return (
          <Grid.Row key={index} gutter={20} className="items-center mb-8">
            <Grid.Col span={11}>
              <Input
                value={key}
                onChange={(v) => {
                  setEntries((old) => {
                    const newValue = update(old, {
                      [index]: { [0]: { $set: v } },
                    });
                    onChange?.(newValue);
                    return newValue;
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={11}>
              <Input
                value={value}
                onChange={(v) => {
                  setEntries((old) => {
                    const newValue = update(old, {
                      [index]: { [1]: { $set: v } },
                    });
                    onChange?.(newValue);
                    return newValue;
                  });
                }}
              />
            </Grid.Col>
            <Grid.Col span={2} className="flex-center">
              <IconDelete
                className="icon-btn"
                onClick={() => {
                  setEntries((old) => {
                    const newValue = update(old, {
                      $splice: [[index, 1]],
                    });
                    onChange?.(newValue);
                    return newValue;
                  });
                }}
              />
            </Grid.Col>
          </Grid.Row>
        );
      })}

      <div className="flex-center mt-16">
        <Button
          long
          shape="round"
          style={{ width: 150, marginLeft: 20 }}
          onClick={() => {
            setEntries((old) => {
              const newValue = update(old, {
                $push: [["", ""]],
              });
              onChange?.(newValue);
              return newValue;
            });
          }}
        >
          <IconPlus /> Add Param
        </Button>
      </div>
    </div>
  );
};
