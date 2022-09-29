import React, { useEffect, useState } from "react";
import { MyProject } from "./MyProject";
import { Button, Grid, Upload, Image } from "@arco-design/web-react";
import "./Home.css";
import { TodoList } from "./TodoList";
import { ToolBoxList } from "./ToolBoxList";
import { Diary } from "./Diary";
import { DragWindow } from "../components/DragWindow";
import update from "immutability-helper";
import { UploadImg } from "./UploadImg";

const Home = () => {
  // const [visible, setVisible] = useState(false);
  const list = [
    "aweme://lynxview?surl=http%3A%2F%2F10.93.235.210%3A4000%2Fdist%2Fstation%2Ftemplate.js&trans_status_bar=0&hide_nav_bar=0&use_spark=1&anchor_id=7022965704806652678&game_id=cgmo00000000000011911365&global_game_id=cgmo00000000000011911365",
    "https://www.baidu.com",
    "https://www.google.com.hk/",
  ];
  const [visibleList, setIsVisibleList] = useState<boolean[]>([false, false]);

  return (
    <>
      <Grid.Row className="h-screen w-screen overflow-hidden">
        <Grid.Col span={5} className="main-col">
          {/* <div style={{ height: "34%" }} className="overflow-auto"> */}
          <TodoList />
          {/* </div>
          <div style={{ height: "66%", borderTop: "1px dashed gray" }}>
            {list.map((item, index) => {
              return (
                <Button
                  key={item}
                  onClick={() => {
                    setIsVisibleList((old) => {
                      return update(old, { $splice: [[index, 1, true]] });
                    });
                    // setVisible(true);
                  }}
                />
              );
            })}
          </div> */}
          <UploadImg />
        </Grid.Col>

        <Grid.Col span={7} className="main-col">
          <MyProject />
        </Grid.Col>

        <Grid.Col span={6} className="main-col">
          <ToolBoxList />
        </Grid.Col>

        <Grid.Col span={6} className="main-col">
          <Diary />
        </Grid.Col>
      </Grid.Row>
      {list.map((item, index) => {
        return (
          <DragWindow
            key={item}
            index={index}
            title={item}
            url={item}
            visible={visibleList[index]}
            setVisible={(v) => {
              setIsVisibleList((old) => {
                return update(old, { $splice: [[index, 1, v]] });
              });
            }}
          >
            <canvas id={`canvas${index}`} />
          </DragWindow>
        );
      })}
    </>
  );
};

export default Home;
