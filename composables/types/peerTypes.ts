import type { DataConnection, Peer } from "peerjs";

export type peerConnectionType = {
    id:string;
    conn?:DataConnection;
    loading?:boolean;
    connected:boolean;
}

export type peerType  = {
    peer:Peer;
    loading:boolean;
    
}

export type peerDataType = {
    type:peerDataMessageType;
    data:fileDataType | string;
}
export type fileDataType = {
    id:string;
    name:string;
    type:string;
    size:number;
    data:string | ArrayBuffer;
}

export enum peerDataMessageType  {
    file,
    ack,
}

export type notificationType = {
    id?:string;
    type:notificationMessageType;
    data:string;
}
export enum notificationMessageType { 
    warning,
    error,
    success,
    info
}