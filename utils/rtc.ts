import { api } from "~/utils";

export const JOIN_CALL = "JOIN_CALL";
export const EXCHANGE = "EXCHANGE";
export const LEAVE_CALL = "LEAVE_CALL";

export const ice = {
  iceServers: [
    {
      urls: "stun:stun2.l.google.com:19302"
    }
  ]
};

