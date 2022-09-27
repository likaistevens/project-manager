import {
  Button,
  Checkbox,
  Form,
  Input,
  Message,
  Modal,
} from "@arco-design/web-react";
import React, { useEffect, useRef, useState } from "react";
import { FieldTypeMap, ProjectCardType } from "../../type";
import { ProjectCard } from "./ProjectCard";
import { IconPlus } from "@arco-design/web-react/icon";
import {
  createProject,
  deleteProject,
  listProject,
  updateProject,
} from "../../api/project";
import { includesByPinyin } from "../../utils";
import { debounce } from "lodash";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const MyProject: React.FC = () => {
  const [projectList, setProjectList] = useState<ProjectCardType[]>([]);
  const [originList, setOriginList] = useState<ProjectCardType[]>([]);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useLocalStorage<string>("my_project_search");
  const [form] = Form.useForm();

  const getList = async (v?: string) => {
    const data = await listProject(v);
    if (search) {
      onSearch(search, data);
    } else {
      setProjectList(data);
    }
    setOriginList(data);
  };

  const onSubmit = async () => {
    setVisible(false);
    const fields = form.getFields();
    if (fields.id) {
      await updateProject(fields);
    } else {
      await createProject(fields);
    }
    getList();
    form.resetFields();
    Message.success("操作成功");
  };

  const onDelete = async (item: ProjectCardType) => {
    Modal.confirm({
      title: "确认删除",
      content: `确认删除 ${item.name}？`,
      okButtonProps: {
        status: "danger",
      },
      onOk: async () => {
        await deleteProject({ id: item.id });
        getList();
      },
    });
  };

  const onEdit = (item: ProjectCardType) => {
    form.setFieldsValue(item);
    setVisible(true);
  };

  const onCreate = () => {
    form.resetFields();
    setVisible(true);
  };

  const onSearch = debounce((v: string, list?: ProjectCardType[]) => {
    if (v) {
      setProjectList(
        (list || originList).filter((item) => includesByPinyin(v, item.name))
      );
    } else {
      setProjectList(list || originList);
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
        {projectList.map((item, index) => {
          return (
            <ProjectCard
              key={item.id}
              index={index}
              projectList={projectList}
              setProjectList={setProjectList}
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
        <div>
          <Form
            form={form}
            style={{ width: "100%" }}
            autoComplete="off"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
          >
            <Form.Item
              field="name"
              label="项目名称"
              rules={[{ required: true }]}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
            {Object.entries(FieldTypeMap).map(([field, label]) => {
              return (
                <Form.Item
                  key={field}
                  field={`fields.${field.toString()}`}
                  label={label}
                >
                  <Input />
                </Form.Item>
              );
            })}
            <Form.Item
              field="hasDesc"
              triggerPropName="checked"
              wrapperCol={{
                span: 17,
                offset: 5,
              }}
            >
              <Checkbox>备注</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
