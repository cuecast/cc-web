import { setAuth } from "~/utils/auth";

export default function ({app}) {
  setAuth(app.$auth)
}

