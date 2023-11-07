import { Datastore } from "@google-cloud/datastore";
import { GetResponse } from "@google-cloud/datastore/build/src/request";
const datastore = new Datastore();
// Datastore API
// Cloud Datastore Role to Service Account
export async function getEntity(
  kind: string,
  id: string
): Promise<any | undefined> {
  const datastore = new Datastore();
  const dataKey = datastore.key([kind, id]);
  const [entity] = await datastore.get(dataKey);
  return entity;
}

export async function setEntity(kind: string, id: string, entity: Object) {
  const dataKey = datastore.key([kind, id]);
  const newEntity = {
    key: dataKey,
    data: entity,
  };
  const [result] = await datastore.save(newEntity);
  return result;
}

export async function checkKeyAvailability(kind: string, id: string) {
  const exists = await getEntity(kind, id);
  if (exists === undefined) {
    return true;
  }
  return false;
}
