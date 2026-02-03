import { createFileRoute } from '@tanstack/react-router'
import { prepareElectricUrl, proxyElectricRequest } from '../../lib/electric-proxy'

const serve = async ({ request }: { request: Request }) => {
  const originUrl = prepareElectricUrl(request.url)
  originUrl.searchParams.set('table', 'agents')
  return proxyElectricRequest(originUrl)
}

export const Route = createFileRoute('/api/agents')({
  server: {
    handlers: {
      GET: serve,
    },
  },
})
