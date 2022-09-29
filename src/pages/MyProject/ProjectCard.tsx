import { Grid, Link } from "@arco-design/web-react";
import React from "react";
import { FieldTypeMap, ProjectCardType } from "../../type";
import { color } from "../../const";
import { TodoTextArea } from "../../components/TodoTextArea";
import update from "immutability-helper";
import { updateProject } from "../../api/project";
import { debounce } from "lodash";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import TextArea from "../../components/TextArea";
import "./index.css";

export const ProjectCard: React.FC<{
  index: number;
  projectList: ProjectCardType[];
  setProjectList: React.Dispatch<React.SetStateAction<ProjectCardType[]>>;
  onDelete: (item: ProjectCardType) => void;
  onEdit: (item: ProjectCardType) => void;
}> = ({ index, projectList, setProjectList, onDelete, onEdit }) => {
  const color = getColor(projectList.length - index - 1);
  const info = projectList[index];

  const onSubmit = debounce(async (newValue: ProjectCardType) => {
    await updateProject(newValue);
  }, 500);

  return (
    <div
      style={{
        marginBottom: 20,
        borderRadius: 6,
        overflow: "hidden",
        border: `1px solid ${color}`,
      }}
    >
      <div
        className="flex justify-between items-center"
        style={{
          background: color,
          padding: "10px 15px",
          fontSize: 18,
          fontWeight: 600,
          color: "#fff",
        }}
      >
        <span>{info.name}</span>
        <div>
          <IconEdit
            style={{ marginRight: 8 }}
            className="card-icon-btn"
            onClick={() => {
              onEdit(info);
            }}
          />
          <IconDelete
            className="card-icon-btn"
            onClick={() => {
              onDelete(info);
            }}
          />
        </div>
      </div>
      <div style={{ padding: 15 }}>
        <Grid.Row style={{ alignItems: "unset" }}>
          <Grid.Col span={8}>
            {Object.entries(info.fields).map(([field, link]) => {
              return <LinkCard key={field} link={link || ""} field={field} />;
            })}
          </Grid.Col>
          <Grid.Col span={16}>
            <TodoTextArea
              value={info.todo}
              onChange={(v) => {
                setProjectList((oldValue) => {
                  const newValue = update(oldValue, {
                    [index]: { todo: { $set: v } },
                  });
                  onSubmit(newValue[index]);
                  return newValue;
                });
              }}
            />
          </Grid.Col>
        </Grid.Row>
        {info.hasDesc && (
          <div>
            <TextArea
              value={info.description}
              onChange={(v) => {
                setProjectList((oldValue) => {
                  const newValue = update(oldValue, {
                    [index]: { description: { $set: v } },
                  });
                  onSubmit(newValue[index]);
                  return newValue;
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const LinkCard: React.FC<{ link: string; field: string }> = ({
  link,
  field,
}) => {
  if (!link) {
    return null;
  }
  return (
    <div style={{ padding: "5px 0" }}>
      <Link href={link} target="__blank">
        {FieldTypeMap[field]}
      </Link>
    </div>
  );
};

const getColor = (index: number) => {
  return color[index % 13];
};
