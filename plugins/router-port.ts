import { setRouter } from "~/utils/router";

export default ({app, store}) => {
  setRouter(app, store.$router)
}
