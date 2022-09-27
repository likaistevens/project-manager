import { Link, Popover } from "@arco-design/web-react";
import {
  IconDelete,
  IconEdit,
  IconQuestionCircle,
} from "@arco-design/web-react/icon";
import React from "react";
import { LinkItemType } from "../../type";

export const LinkItem: React.FC<{
  item?: LinkItemType;
  onDelete: (id: LinkItemType) => void;
  onEdit: (info: LinkItemType) => void;
}> = ({ item, onDelete, onEdit }) => {
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
          {item?.desc && (
            <Popover title="" content={<span>{item?.desc}</span>}>
              <IconQuestionCircle className="cursor-pointer" />
            </Popover>
          )}
        </div>

        <div style={{ width: 36, flexShrink: 0 }}>
          <IconEdit
            style={{ marginRight: 8 }}
            className="cursor-pointer"
            onClick={() => {
              item && onEdit(item);
            }}
          />
          <IconDelete
            className="cursor-pointer"
            onClick={() => {
              item && onDelete(item);
            }}
          />
        </div>
      </div>
    </div>
  );
};
