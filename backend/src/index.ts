import { Hono } from "hono";
import api from "./api";

const app = new Hono();
app.get("/", (c) => c.text("half-automation api"));

app.route("/api", api);

export default app;
