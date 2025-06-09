# Querying Activities by Tak (Division)

This document explains how to fetch activities filtered by tak (division) in the Kampvuurkring frontend.

## Overview

Activities in the system can be filtered by division (tak) such as:
- `kapoenen` (6-8 jaar)
- `wouters` (8-11 jaar) 
- `jonggivers` (11-14 jaar)
- `givers` (14-17 jaar)
- `jin` (17-18 jaar)

## Methods to Query Activities by Tak

### 1. Using Custom API Route

We've created a custom API route that simplifies fetching activities for a specific tak:

```typescript
// Fetch activities for kapoenen
const response = await fetch('/api/activiteiten/by-tak?tak=kapoenen')
const data = await response.json()
const activities = data.docs
```

See: `/app/api/activiteiten/by-tak/route.ts`

### 2. Using Payload REST API Directly

You can query the Payload CMS REST API directly with proper query parameters:

```typescript
// Using where[division][contains] query parameter
const params = new URLSearchParams({
  'where[division][contains]': 'kapoenen',
  'sort': 'startDate',
  'limit': '10'
})

const response = await fetch(`/api/activiteiten?${params.toString()}`)
```

### 3. Using Custom Hook (Client Components)

For client components, use the `useActivitiesByTak` hook:

```typescript
import { useActivitiesByTak } from '@/hooks/useActivitiesByTak'

function MyComponent() {
  const { activities, loading, error } = useActivitiesByTak({
    tak: 'wouters',
    limit: 5,
    sort: '-startDate' // Most recent first
  })
  
  // Render activities...
}
```

See: `/hooks/useActivitiesByTak.ts`

### 4. Server Components with Payload Client

In server components, use the Payload client directly:

```typescript
import getPayloadClient from '@/lib/getPayload'

const payload = await getPayloadClient()

const result = await payload.find({
  collection: 'activiteiten',
  where: {
    division: {
      contains: 'givers',
    },
  },
  sort: 'startDate',
  draft: false,
})

const activities = result.docs
```

See: `/components/TakActivitiesServer.tsx`

### 5. Using GraphQL

You can also query via GraphQL:

```graphql
query GetActivitiesForDivision($division: String!) {
  Activiteiten(
    where: {
      division: { contains: $division }
    }
    sort: "startDate"
    limit: 10
  ) {
    docs {
      id
      title
      startDate
      endDate
      division
      description
    }
  }
}
```

## Example Components

### Client Component Example
See: `/components/ActivitiesByTak.client.tsx`

This component:
- Fetches activities for a selected tak
- Shows loading and error states
- Displays activities in cards
- Includes a tak selector

### Server Component Example  
See: `/components/TakActivitiesServer.tsx`

This component:
- Fetches data on the server
- Supports draft mode
- Shows enrollment buttons
- No loading states needed

### Full Page Example
See: `/app/(my-app)/activiteiten/[tak]/page.tsx`

This dynamic route page:
- Shows all activities, weekends, and camps for a tak
- Uses tak-specific colors
- Filters to show only future events
- Includes navigation to other takken

## Usage Examples

### Get all Kapoenen activities:
```
GET /api/activiteiten/by-tak?tak=kapoenen
```

### Get Jin activities with limit:
```
GET /api/activiteiten?where[division][contains]=jin&limit=5&sort=-startDate
```

### Navigate to tak-specific page:
```
/activiteiten/wouters
/activiteiten/givers
```

## Important Notes

1. The `division` field can contain multiple values (array), so we use `contains` operator
2. Activities with `division: 'event'` are shown for all takken
3. Draft mode is supported - include credentials for authenticated requests
4. Always handle loading and error states in client components
5. Server components can fetch data directly without loading states