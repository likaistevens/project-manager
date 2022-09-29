import { QrCodeItemType } from "../../type";
import { QrCodeItem } from "./QrCodeItem";
import { Button, Form, Input, Message, Modal } from "@arco-design/web-react";
import React, { useEffect, useState } from "react";
import { IconPlus } from "@arco-design/web-react/icon";
import {
  createQrCode,
  deleteQrCode,
  listQrCode,
  updateQrCode,
} from "../../api/qrcode";
import { getAweme, includesByPinyin } from "../../utils";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { debounce } from "lodash";
import { DragWindow } from "../../components/DragWindow";
import update from "immutability-helper";
import { EditQrModal } from "./EditQrModal";

export const QrCodeList = () => {
  const [qrCodeList, setQrCodeList] = useState<QrCodeItemType[]>([]);
  const [originList, setOriginList] = useState<QrCodeItemType[]>([]);
  const [visible, setVisible] = useState(false);
  const [visibleDragWindow, setIsVisibleDragWindow] = useState<
    Record<string, boolean>
  >({});
  const [search, setSearch] = useLocalStorage<string>("qr_code_search");
  const [form] = Form.useForm();

  const getList = async (v?: string) => {
    const data = await listQrCode(v);
    if (search) {
      onSearch(search, data);
    } else {
      setQrCodeList(data);
    }
    setOriginList(data);
  };

  const onSubmit = async () => {
    setVisible(false);
    const fields = form.getFields();

    console.log(fields);
    console.log(getAweme(fields));
    if (fields.id) {
      await updateQrCode(fields);
    } else {
      await createQrCode(fields);
    }
    getList();
    form.resetFields();
    Message.success("操作成功");
  };

  const onDelete = async (item: QrCodeItemType) => {
    Modal.confirm({
      title: "确认删除？",
      content: `确认删除 ${item.name}？`,
      okButtonProps: {
        status: "danger",
      },
      onOk: async () => {
        await deleteQrCode({ id: item.id });
        getList();
      },
    });
  };

  const onEdit = (info: QrCodeItemType) => {
    form.setFieldsValue(info);
    setVisible(true);
  };

  const onPreview = (info: QrCodeItemType) => {
    setIsVisibleDragWindow((old) => {
      return update(old, { [info.id || ""]: { $set: true } });
    });
  };

  const onHide = (info: QrCodeItemType) => {
    setIsVisibleDragWindow((old) => {
      return update(old, { [info.id || ""]: { $set: false } });
    });
  };

  const onCreate = () => {
    form.resetFields();
    setVisible(true);
  };

  const onSearch = debounce((v: string, list?: QrCodeItemType[]) => {
    if (v) {
      const newList = (list || originList).filter((item) => {
        return includesByPinyin(v, {
          title: item.name,
          url: item.aweme,
        });
      });

      setQrCodeList(newList);
    } else {
      setQrCodeList(list || originList);
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
        {qrCodeList.map((item, index) => {
          return (
            <QrCodeItem
              key={item.id}
              item={item}
              visible={visibleDragWindow[item.id]}
              onDelete={onDelete}
              onEdit={onEdit}
              onPreview={onPreview}
              onHide={onHide}
            />
          );
        })}
      </div>
      <EditQrModal
        form={form}
        onSubmit={onSubmit}
        visible={visible}
        setVisible={setVisible}
      />
      {qrCodeList.map((item, index) => {
        return (
          <DragWindow
            key={item.id}
            index={index}
            title={item.name || item.aweme}
            url={item.aweme}
            visible={visibleDragWindow[item.id]}
            setVisible={(v) => {
              setIsVisibleDragWindow((old) => {
                return update(old, { [item.id]: { $set: v } });
              });
            }}
          >
            <canvas id={`canvas${index}`} />
          </DragWindow>
        );
      })}
    </div>
  );
};
