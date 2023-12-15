import { getEntity } from "~/server/utils/datastore";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  // trying to generate id
  if (id === undefined) {
    return;
  }
  const entity = await getEntity("urls", id);
  if (entity === undefined) {
    setResponseStatus(event, 404);
    return { detail: "File not found" };
  }
  return sendRedirect(event, entity.fileUrl, 302);
});
