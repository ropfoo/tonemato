import express from "express";
import cors from "cors";
import { getCache } from "./cache/get-cache";
import updateCache from "./cache/update-cache";
import { isCacheStale } from "./cache/is-cache-stale";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", async (req, res) => {
  const cache = await getCache();

  res.json({
    type: "cache",
    test: "hello from ralts",
    cache,
  });
});

app.listen(3005, async () => {
  try {
    console.log("ralts is starting");

    if (await isCacheStale()) {
      console.log("updating cache...");
      await updateCache();
      console.log("cache was successfully updated!");
    } else {
      console.log("cache is already up to date!");
    }

    console.log("ralts is ready to use!");
  } catch (e) {
    console.error("failed updating cache:  ", e);
  }
});
