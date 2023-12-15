import { Firestore } from "@google-cloud/firestore";
const fireStore = new Firestore();
// Datastore API
// Cloud Datastore Role to Service Account
export async function getEntity(
  kind: string,
  id: string
): Promise<any | undefined> {
  const document = fireStore.doc(`${kind}/${id}`);
  const documentData = await document.get();
  return documentData.data();
}

export async function setEntity(kind: string, id: string, entity: Object) {
  const document = fireStore.doc(`${kind}/${id}`);
  await document.set(entity);
}

export async function checkKeyAvailability(kind: string, id: string) {
  const exists = await getEntity(kind, id);
  if (exists === undefined) {
    return true;
  }
  return false;
}
