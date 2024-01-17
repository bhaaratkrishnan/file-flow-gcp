export type shortUrlResponse = {
  fileUrl: string;
};

export type urlsSchemaFs = {
  timeStamp: { _seconds: number; _nanoseconds: number };
  fileUrl: string;
  fileGsUrl: string;
  fileName: string;
  fileType: string;
};

export type userSchemaFs = {
  count: number;
  fileFlows: string[];
  timeStamp: { _seconds: number; _nanoseconds: number };
};

export type userSchemaWithIdFs = { id: string } & userSchemaFs;

