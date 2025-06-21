import { NextRequest, NextResponse } from 'next/server'
import getPayloadClient from '@/lib/getPayload'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()
    const payload = await getPayloadClient()

    // Update the enrollment status
    const updatedEnrollment = await payload.update({
      collection: 'enrollments',
      id,
      data: {
        status: status
      }
    })

    return NextResponse.json(updatedEnrollment)
  } catch (error) {
    console.error('Error updating enrollment status:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment status' },
      { status: 500 }
    )
  }
}