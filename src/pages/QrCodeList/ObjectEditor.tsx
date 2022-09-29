import { Button, Grid, Input } from "@arco-design/web-react";
import { IconDelete, IconPlus } from "@arco-design/web-react/icon";
import React from "react";
import update from "immutability-helper";

type T = Array<[string, string]>;

export const ObjectEditor: React.FC<{
  value?: T;
  onChange?: (v: T) => void;
}> = ({ value = [], onChange }) => {
  return (
    <div>
      {value?.map(([k, v], index) => {
        return (
          <Grid.Row key={index} gutter={20} className="items-center mb-8">
            <Grid.Col span={8}>
              <Input
                value={k}
                onChange={(v) => {
                  onChange?.(
                    update(value, {
                      [index]: { [0]: { $set: v } },
                    })
                  );
                }}
              />
            </Grid.Col>
            <Grid.Col span={14}>
              <Input
                value={v}
                onChange={(v) => {
                  const newValue = update(value, {
                    [index]: { [1]: { $set: v } },
                  });
                  onChange?.(newValue);
                }}
              />
            </Grid.Col>
            <Grid.Col span={2} className="flex-center">
              <IconDelete
                className="icon-btn"
                onClick={() => {
                  const newValue = update(value, {
                    $splice: [[index, 1]],
                  });
                  onChange?.(newValue);
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
            onChange?.(
              update(value, {
                $push: [["", ""]],
              })
            );
          }}
        >
          <IconPlus /> Add Param
        </Button>
      </div>
    </div>
  );
};
