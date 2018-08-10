import url from '../config'

const getUrl = path => `${url.root}${path}`

export default {
  requestUrl: getUrl('')
}
