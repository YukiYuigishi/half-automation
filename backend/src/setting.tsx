import { Hono } from "hono";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "hono/jsx";
// eslint-disable-next-line import/extensions
import Layout from "./layout";

const StartUpTimerPage = (props: { id: String }) => (
   <div>
      <h1>{props.id}</h1>
   </div>
);

const settings = new Hono();
settings.get("/", (c) => c.html(<h1>てすと</h1>));
settings.get("/:id", (c) => {
   const { id } = c.req.param();

   return c.html(
      <Layout>
         <StartUpTimerPage id={id}></StartUpTimerPage>
      </Layout>
   );
});

export default settings;
