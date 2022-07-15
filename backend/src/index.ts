import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("test"));

app.get("/api", (c) => c.json({ message: "Hello World" }));

app.fire();
