export default function({ $axios }) {
  $axios.defaults.baseURL = 'https://cuecast-api.herokuapp.com/api'
  $axios.setHeader('accept-encoding', null)
}
