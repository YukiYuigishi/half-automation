import { Hono } from "hono";
import * as model from "./model";
import { Bindings } from "./bindings";

const api = new Hono<{ Bindings: Bindings }>();

api.get("/", (c) => c.json({ HAAPI: "Hello" }));

api.get("/timer/:id", async (c) => {
   const { id } = c.req.param();
   const timer = await model.getTime(c.env.BlOG_EXAMPLE, id);
   if (!timer) {
      const data = { error: "Not Found", ok: false };
      return c.json(data, 404);
   }

   return c.json({ timer, ok: true });
});

api.put("/timer/:id", async (c) => {
   const { id } = c.req.param();
   const { time } = c.req.query();
   if (!time) {
      const data = { error: "Query Error", ok: false };
      return c.json(data, 400);
   }
   const param: model.Param = { startTime: time };
   await model.updateTime(c.env.BlOG_EXAMPLE, id, param);

   return c.json({ ok: true });
});
export default api;
