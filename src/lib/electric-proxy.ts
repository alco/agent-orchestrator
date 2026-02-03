import { ELECTRIC_PROTOCOL_QUERY_PARAMS } from '@electric-sql/client'

/**
 * Prepare an Electric URL by copying protocol params from the incoming request
 * and setting up Electric Cloud authentication if configured
 */
export function prepareElectricUrl(requestUrl: string): URL {
  const url = new URL(requestUrl)
  const origin = new URL(`${process.env.ELECTRIC_URL}/v1/shape`)

  // Copy Electric protocol params from client request
  url.searchParams.forEach((value, key) => {
    if (ELECTRIC_PROTOCOL_QUERY_PARAMS.includes(key)) {
      origin.searchParams.set(key, value)
    }
  })

  // Add Electric Cloud authentication if configured
  if (process.env.ELECTRIC_SOURCE_ID && process.env.ELECTRIC_SECRET) {
    origin.searchParams.set('source_id', process.env.ELECTRIC_SOURCE_ID)
    origin.searchParams.set('secret', process.env.ELECTRIC_SECRET)
  }

  return origin
}

/**
 * Proxy a request to Electric and return the response
 */
export async function proxyElectricRequest(originUrl: URL): Promise<Response> {
  const res = await fetch(originUrl)

  // Create new headers without encoding info (let TanStack handle that)
  const headers = new Headers(res.headers)
  headers.delete('content-encoding')
  headers.delete('content-length')
  headers.set('vary', 'cookie')

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}
