import { Hono } from "hono";
import { html } from "hono/html";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";
import api from "./api";

const app = new Hono();

const Layout = (props: { children?: any }) => html`<!DOCTYPE html>
   <html>
      <body>
         ${props.children}
      </body>
   </html>`;

const Content = (props: { name: string }) => (
   <Layout>
      <h1>Hello {props.name}!</h1>
   </Layout>
);

app.get("/hello/:name", (c) => {
   const { name } = c.req.param();
   return c.html(<Content name={name} />);
});

app.route("/api", api);

export default app;
