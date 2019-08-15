import { setApi } from '~/utils/api'

export default ({store}) => {
  setApi(store.$axios)
}
