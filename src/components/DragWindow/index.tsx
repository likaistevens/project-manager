import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode";
import { IconCloseCircle } from "@arco-design/web-react/icon";

const width = 400;
const height = 400;

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
  const [top, setTop] = useState<string | number>(`calc(50% - ${width / 2}px)`);
  const [left, setLeft] = useState<string | number>(
    `calc(50% - ${height / 2}px)`
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

  //   useEffect(() => {
  // console.log(app);
  //   }, [visible]);

  return (
    <>
      {app &&
        visible &&
        ReactDOM.createPortal(
          <div
            style={{
              width,
              height,
              background: "white",
              position: "absolute",
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              cursor: "move",
              borderRadius: 8,
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
              className="flex justify-between items-center"
              style={{
                width: "100%",
                height: 50,
                padding: "0 15px",
                boxSizing: "border-box",
                borderBottom: "1px solid gray",
                flexShrink: 0,
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
              <div>
                <IconCloseCircle
                  className="cursor-pointer"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-full">
              {children}
            </div>
          </div>,
          app
        )}
    </>
  );
};
