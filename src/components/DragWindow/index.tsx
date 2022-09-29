import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode";
import { IconClose } from "@arco-design/web-react/icon";
import "./index.css";

const minWidth = 200;
const minHeight = 250;
const titleHeight = 50;

export const DragWindow: React.FC<{
  index: number;
  children: React.ReactNode;
  visible: boolean;
  setVisible: (v: boolean) => void;
  title: string;
  url: string;
}> = ({ index, children, visible, setVisible, title, url }) => {
  const titleRef = useRef(null);
  const app = document.getElementById("app");
  const [top, setTop] = useState<string | number>(
    `calc(50% - ${minHeight / 2}px)`
  );
  const [left, setLeft] = useState<string | number>(
    `calc(50% - ${minWidth / 2}px)`
  );
  const [offsetX, setOffsetX] = useState(100);
  const [offsetY, setOffsetY] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  useEffect(() => {
    if (visible) {
      const canvas = document.getElementById(`canvas${index}`);
      console.log("DragWindow", canvas);

      canvas &&
        QRCode.toCanvas(canvas, url, function (error: any) {
          if (error) console.error(error);
          console.log("success!");
        });
    }
  }, [visible]);

  return (
    <>
      {app &&
        visible &&
        ReactDOM.createPortal(
          <div
            className="portal"
            style={{
              minWidth,
              minHeight,
              top,
              left,
              zIndex: index,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onMouseMove={(e) => {
              if (isDrag) {
                setTop(e.clientY - offsetY);
                setLeft(e.clientX - offsetX);
              }
            }}
            onMouseDown={(e) => {
              setIsDrag(true);
              setOffsetX(
                (e.nativeEvent as any).layerX || e.nativeEvent.offsetX
              );
              setOffsetY(
                (e.nativeEvent as any).layerY || e.nativeEvent.offsetY
              );
            }}
            onMouseUp={(e) => {
              setIsDrag(false);
            }}
            onMouseLeave={(e) => {
              setIsDrag(false);
            }}
          >
            <div
              className="flex justify-between items-center title"
              style={{
                height: titleHeight,
              }}
              ref={titleRef}
            >
              <span
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </span>
              <div
                style={{ width: 30, height: "100%" }}
                className="flex-center"
                onMouseMove={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                onMouseLeave={(e) => e.stopPropagation()}
              >
                <IconClose
                  fontSize={18}
                  className="icon-btn"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </div>
            </div>
            <div
              className="flex-center w-full h-full"
              style={{ minHeight: minHeight - titleHeight }}
            >
              {children}
            </div>
          </div>,
          app
        )}
    </>
  );
};
