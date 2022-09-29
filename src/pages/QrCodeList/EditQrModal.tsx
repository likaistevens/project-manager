import {
  Button,
  Form,
  FormInstance,
  Grid,
  Input,
  Modal,
} from "@arco-design/web-react";
import { IconDoubleUp, IconDoubleDown } from "@arco-design/web-react/icon";
import React, { useEffect } from "react";
import { decodeAweme, encodeAweme } from "../../utils";
import { ObjectEditor } from "./ObjectEditor";

export const EditQrModal: React.FC<{
  form: FormInstance;
  onSubmit: () => Promise<any>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ form, onSubmit, visible, setVisible }) => {
  useEffect(() => {
    form.setFieldsValue({
      protocol: "aweme",
      path: "lynxview",
      params: [
        ["surl", "http://10.93.235.210:4000/dist/station/template.js"],
        ["game_id", "cgmo00000000000011911365"],
        ["global_game_id", "cgmo00000000000011911365"],
      ],
    });
  }, []);

  const syncUp = () => {
    const aweme = form.getFieldValue("aweme");
    const fields = decodeAweme(aweme);
    console.log(fields);
    form.setFieldsValue(fields);
  };

  const syncDown = () => {
    const fields = form.getFields();
    form.setFieldValue("aweme", encodeAweme(fields));
  };

  return (
    <Modal
      title="Edit QR Code"
      visible={visible}
      onOk={onSubmit}
      onCancel={() => setVisible(false)}
      autoFocus={false}
      focusLock={true}
      maskClosable={false}
    >
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        layout="vertical"
        onValuesChange={(v, vs) => {
          if (
            Object.keys(v).includes("protocol") ||
            Object.keys(v).includes("path") ||
            Object.keys(v).includes("params")
          ) {
            form.setFieldValue("aweme", encodeAweme(vs));
          }
        }}
      >
        <Form.Item
          field="name"
          label="Name"
          wrapperCol={{ span: 15 }}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Grid.Row gutter={20}>
          <Grid.Col span={12}>
            <Form.Item
              field="protocol"
              label="Protocol"
              wrapperCol={{ span: 15 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item
              field="path"
              label="Path"
              wrapperCol={{ span: 15 }}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>

        <Form.Item
          field="params"
          label="Search Params"
          rules={[{ required: true }]}
        >
          <ObjectEditor />
        </Form.Item>

        <div className="flex justify-between mb-16" style={{ marginTop: -52 }}>
          <Button
            long
            shape="round"
            style={{ width: 100, marginLeft: 20 }}
            onClick={syncUp}
          >
            <IconDoubleUp />
          </Button>
          <Button
            long
            shape="round"
            style={{ width: 100, marginLeft: 20 }}
            onClick={syncDown}
          >
            <IconDoubleDown />
          </Button>
        </div>

        <Form.Item field="aweme" label="Aweme">
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>

        {/* <Form.Item field="desc" label="描述">
        <Input />
      </Form.Item> */}
      </Form>
    </Modal>
  );
};
