import { Hono } from "hono";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";
import api from "./api";
import Home from "./home";
import Layout from "./layout";

const app = new Hono();

const Content = (props: { name: string }) => (
   <Layout>
      <h1>Hello {props.name}!</h1>
   </Layout>
);

app.get("/hello/:name", (c) => {

   const { name } = c.req.param();
   return c.html(<Content name={name} />);
});

app.route("/setting",setting);


app.route("/api", api);

export default app;
