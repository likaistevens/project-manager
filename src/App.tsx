import { IconLoading } from "@arco-design/web-react/icon";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/manager">
      <Suspense fallback={<IconLoading />}>
        <Switch>
          <Route
            path="/no_permission"
            component={lazy(() => import("./pages/NoPermission"))}
          />
          <Route path="/" component={lazy(() => import("./pages/Home"))} />
          <Route>404</Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
