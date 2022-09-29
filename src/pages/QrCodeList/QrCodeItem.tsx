import { Link, Popover } from "@arco-design/web-react";
import {
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
  return (
    <div style={{ marginBottom: 10 }}>
      <div className="flex justify-between">
        <div
          className="flex items-center"
          style={{ width: "calc(100% - 36px)" }}
        >
          <Link
            href={item?.url}
            target="_blank"
            style={{
              fontWeight: item?.title ? 700 : 400,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {item?.title || item?.url}
          </Link>
          {/* {item?.desc && (
            <Popover title="" content={<span>{item?.desc}</span>}>
              <IconQuestionCircle className="icon-btn" />
            </Popover>
          )} */}
        </div>

        <div style={{ width: 58, flexShrink: 0 }}>
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
