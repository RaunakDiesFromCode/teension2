import { createRouteHandler } from "uploadthing/server"
import { fileRouter } from "./core"

export const {GET, POST} = createRouteHandler({
  router: fileRouter
});