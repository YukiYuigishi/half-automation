import { Hono } from "hono";
import { Bindings } from "./bindings";

const api = new Hono<{ Bindings: Bindings }>();

api.get("/", (c) => c.json({ message: "Hello" }));

export default api;
