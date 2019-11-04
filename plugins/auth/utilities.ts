export const isUnset = o => typeof o === 'undefined' || o === null
export const isSet = o => !isUnset(o)

export const isSameURL = (a, b) => a.split('?')[0] === b.split('?')[0]

export const isRelativeURL = u =>
  u && u.length && /^\/[a-zA-Z0-9@\-%_~][/a-zA-Z0-9@\-%_~]*[?]?([^#]*)#?([^#]*)$/.test(u)

export function normalizePath(path = '') {
  // Remove query string
  let result = path.split('?')[0]

  // Remove redundant / from the end of path
  if (result.charAt(result.length - 1) === '/') {
    result = result.slice(0, -1)
  }

  return result
}

export function encodeValue(val) {
  if (typeof val === 'string') {
    return val
  }
  return JSON.stringify(val)
}

export function decodeValue(val) {
  // Try to parse as json
  if (typeof val === 'string') {
    try {
      return JSON.parse(val)
    } catch (_) {
    }
  }

  // Return as is
  return val
}

export const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        // @ts-ignore
        component => component.options && component.options[key] === value
      )
    }
    // SSR
    return Object.values(m.components).some(component =>
      // @ts-ignore
      Object.values(component._Ctor).some(
        // @ts-ignore
        ctor => ctor.options && ctor.options[key] === value
      )
    )

  })
}


