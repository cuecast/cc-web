import { setClient } from '~/services/api'

export default ({app, store}) => {
  setClient(app.$axios)
}
