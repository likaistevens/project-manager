import React, { useEffect, useState } from "react";
import { MyProject } from "./MyProject";
import { Button, Grid, Upload, Image } from "@arco-design/web-react";
import "./Home.css";
import { TodoList } from "./TodoList";
import { ToolBoxList } from "./ToolBoxList";
import { Diary } from "./Diary";
import { DragWindow } from "../components/DragWindow";
import update from "immutability-helper";
import { QrCodeList } from "./QrCodeList";
// import { UploadImg } from "./UploadImg";

const Home = () => {
  return (
    <>
      <Grid.Row className="h-screen w-screen overflow-hidden">
        <Grid.Col span={5} className="main-col">
          <div style={{ height: "50%" }} className="overflow-auto">
            <TodoList />
          </div>
          <div
            style={{
              height: "50%",
              borderTop: "1px dashed gray",
              paddingTop: 20,
            }}
          >
            <QrCodeList />
          </div>
          {/* <UploadImg /> */}
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
    </>
  );
};

export default Home;
