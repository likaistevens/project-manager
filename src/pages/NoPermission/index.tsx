import { Result } from "@arco-design/web-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { _fetch } from "../../api/fetch";

export default function NoPermission() {
  const history = useHistory();
  const validate = async () => {
    const usr = await _fetch("/validateUser");
    if (usr) {
      history.replace("/");
    }
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <div>
      <Result
        status="500"
        subTitle="Access to this resource on the server is denied."
        // extra={<Button type='primary'>Back</Button>}
      />
    </div>
  );
}
