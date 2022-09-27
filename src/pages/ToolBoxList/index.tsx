import { LinkItemType } from "../../type";
import { LinkItem } from "./LinkItem";
import { Button, Form, Input, Message, Modal } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { IconPlus } from "@arco-design/web-react/icon";
import {
  createToolBoxItem,
  deleteToolBoxItem,
  listToolBoxItem,
  updateToolBoxItem,
} from "../../api/toolbox";
import { includesByPinyin } from "../../utils";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { debounce } from "lodash";

export const ToolBoxList = () => {
  const [toolBoxList, setToolBoxList] = useState<LinkItemType[]>([]);
  const [originList, setOriginList] = useState<LinkItemType[]>([]);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useLocalStorage<string>("tool_box_search");
  const [form] = Form.useForm();

  const getList = async (v?: string) => {
    const data = await listToolBoxItem(v);
    if (search) {
      onSearch(search, data);
    } else {
      setToolBoxList(data);
    }
    setOriginList(data);
  };

  const onSubmit = async () => {
    setVisible(false);
    const fields = form.getFields();
    if (fields.id) {
      await updateToolBoxItem(fields);
    } else {
      await createToolBoxItem(fields);
    }
    getList();
    form.resetFields();
    Message.success("操作成功");
  };

  const onDelete = async (item: LinkItemType) => {
    Modal.confirm({
      title: "确认删除？",
      content: `确认删除 ${item.title}？`,
      okButtonProps: {
        status: "danger",
      },
      onOk: async () => {
        await deleteToolBoxItem({ id: item.id });
        getList();
      },
    });
  };

  const onEdit = (info: LinkItemType) => {
    form.setFieldsValue(info);
    setVisible(true);
  };

  const onCreate = () => {
    form.resetFields();
    setVisible(true);
  };

  const onSearch = debounce((v: string, list?: LinkItemType[]) => {
    if (v) {
      const newList = (list || originList).filter((item) => {
        return includesByPinyin(v, {
          title: item.title,
          des: item.desc,
          url: item.url,
        });
      });

      setToolBoxList(newList);
    } else {
      setToolBoxList(list || originList);
    }
  }, 300);

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
        {toolBoxList.map((item, index) => {
          return (
            <LinkItem
              key={item.id}
              item={item}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </div>

      <Modal
        title="Modal Title"
        visible={visible}
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
        maskClosable={false}
      >
        <Form form={form} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }}>
          <Form.Item field="title" label="标题" wrapperCol={{ span: 15 }}>
            <Input />
          </Form.Item>

          <Form.Item field="url" label="链接" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item field="desc" label="描述">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
