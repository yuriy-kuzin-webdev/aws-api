import schema from "./schema";
import { handlerPath } from "@libs/handler-resolver";

const create = {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: "post",
        path: "employees",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        private: true,
      },
    },
  ],
};
export { create };
