import { findNextNoon } from "~/server/utils/timestamp";
export default defineEventHandler(async (event) => {
  const clientIp = getHeader(event, "X-Forwarded-For") ?? "Undefined";
  const data = await getEntity("user", clientIp);
  let count: number;
  let fileFlows: string[];
  let timeStamp: Date;
  if (data === undefined) {
    timeStamp = findNextNoon();
    await setEntity("user", clientIp, {
      count: 0,
      fileFlows: [],
      timeStamp: timeStamp,
    });
    count = 0;
    fileFlows = [];
  } else {
    count = data.count;
    fileFlows = data.fileFlows;
    timeStamp = data.timeStamp;
  }
  return {
    ip: clientIp,
    count: count,
    fileFlows: fileFlows,
    timeStamp: timeStamp,
  } as {
    ip: string;
    count: number;
    fileFlows: string[];
    timeStamp: Date;
  };
});
