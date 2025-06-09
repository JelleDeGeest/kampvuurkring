import { NextRequest, NextResponse } from 'next/server'
import getPayloadClient from '@/lib/getPayload'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tak = searchParams.get('tak')
    
    if (!tak) {
      return NextResponse.json({ error: 'Tak parameter is required' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    
    // Fetch activities where division contains the specified tak
    const result = await payload.find({
      collection: 'activiteiten',
      where: {
        division: {
          contains: tak,
        },
      },
      sort: 'startDate',
      draft: false,
      depth: 2, // Include related data like banner images
    })

    return NextResponse.json({
      docs: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      pagingCounter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    })
  } catch (error) {
    console.error('Error fetching activities by tak:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    )
  }
}