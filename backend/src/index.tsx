/* eslint-disable import/extensions */
import { Hono } from "hono";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";
import api from "./api";
import settings from "./setting";
import Home from "./home";
import Layout from "./layout";

const app = new Hono();

app.get("/", (c) =>
   c.html(
      <Layout>
         <Home />
      </Layout>
   )
);

app.route("/api", api);
app.route("/settings", settings);

export default app;
