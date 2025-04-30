// frontend/lib/getPayload.ts
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'      // this resolves to your payload.config.ts

let client: Payload | null = null         // cache it between calls / RSC renders

export default async function getPayloadClient(): Promise<Payload> {
  if (client) return client               // already initialised

  client = await getPayload({ config })   // spins up (or re-uses) the in-process instance
  return client
}