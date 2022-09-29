import { Link, Message } from "@arco-design/web-react";
import {
  IconCopy,
  IconDelete,
  IconEdit,
  IconEye,
  IconEyeInvisible,
} from "@arco-design/web-react/icon";
import React from "react";
import { QrCodeItemType } from "../../type";

export const QrCodeItem: React.FC<{
  item?: QrCodeItemType;
  onDelete: (id: QrCodeItemType) => void;
  onEdit: (info: QrCodeItemType) => void;
  onPreview: (info: QrCodeItemType) => void;
  onHide: (info: QrCodeItemType) => void;
  visible: boolean;
}> = ({ item, visible, onDelete, onEdit, onPreview, onHide }) => {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(item?.schemaStr || "");
      Message.success("复制成功");
    } catch (err) {
      Message.success("复制失败");
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="flex justify-between">
        <div
          className="flex items-center"
          style={{ width: "calc(100% - 88px)" }}
        >
          <Link
            style={{
              fontWeight: item?.name ? 700 : 400,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            onClick={() => {
              item && onPreview(item);
            }}
          >
            {item?.name || item?.schemaStr}
          </Link>
          {/* {item?.desc && (
            <Popover title="" content={<span>{item?.desc}</span>}>
              <IconQuestionCircle className="icon-btn" />
            </Popover>
          )} */}
        </div>

        <div style={{ width: 88, flexShrink: 0 }}>
          {visible ? (
            <IconEyeInvisible
              className="icon-btn"
              onClick={() => {
                item && onHide(item);
              }}
            />
          ) : (
            <IconEye
              className="icon-btn"
              onClick={() => {
                item && onPreview(item);
              }}
            />
          )}
          <IconCopy
            style={{ margin: "0 0 0 8px" }}
            className="icon-btn"
            onClick={onCopy}
          />
          <IconEdit
            style={{ margin: "0 8px" }}
            className="icon-btn"
            onClick={() => {
              item && onEdit(item);
            }}
          />
          <IconDelete
            className="icon-btn"
            onClick={() => {
              item && onDelete(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};
