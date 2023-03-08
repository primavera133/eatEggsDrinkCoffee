import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { z } from "zod";
import { getCaloriesRoute } from "./routes/calories";

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
export type PublicProcedure = typeof publicProcedure;

const app = express();
const port = 8080;

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const appRouter = router({
  getUser: publicProcedure.input(z.string()).query((req) => {
    return { id: req.input, name: `${req.input}` };
  }),
  ...getCaloriesRoute(publicProcedure),
});

export type AppRouter = typeof appRouter;

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
