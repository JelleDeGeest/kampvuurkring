import { NextRequest, NextResponse } from 'next/server'
import getPayloadClient from '@/lib/getPayload'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const data = await request.json()

    console.log('Received enrollment data:', JSON.stringify(data, null, 2))

    // Validate required fields
    if (!data.targetType || !data.targetId || !data.children || !data.contactInfo) {
      console.log('Missing required fields:', {
        targetType: !!data.targetType,
        targetId: !!data.targetId,
        children: !!data.children,
        contactInfo: !!data.contactInfo
      })
      return NextResponse.json(
        { error: 'Verplichte velden ontbreken' },
        { status: 400 }
      )
    }

    // Fetch the target item (activity, weekend, or camp)
    const targetItem = await payload.findByID({
      collection: data.targetType as any,
      id: data.targetId,
    })

    if (!targetItem || !targetItem.enrollmentSettings?.enabled) {
      return NextResponse.json(
        { error: 'Inschrijvingen zijn niet beschikbaar voor dit item' },
        { status: 404 }
      )
    }

    // Check if enrollments are manually closed
    if (targetItem.enrollmentSettings?.closed) {
      return NextResponse.json(
        { error: targetItem.enrollmentSettings?.closedMessage || 'De inschrijvingen zijn gesloten' },
        { status: 400 }
      )
    }

    // Check if enrollment deadline has passed
    if (targetItem.enrollmentSettings?.enrollmentDeadline) {
      const deadline = new Date(targetItem.enrollmentSettings.enrollmentDeadline)
      if (deadline < new Date()) {
        return NextResponse.json(
          { error: 'De inschrijvingen voor deze activiteit zijn gesloten' },
          { status: 400 }
        )
      }
    }

    // Check max enrollments (count all children)
    if (targetItem.enrollmentSettings?.maxEnrollments) {
      const existingEnrollments = await payload.find({
        collection: 'enrollments' as any,
        where: {
          targetType: {
            equals: data.targetType,
          },
          targetId: {
            equals: data.targetId,
          },
          status: {
            not_equals: 'cancelled',
          },
        },
      })

      // Count total children enrolled
      let totalChildrenEnrolled = 0
      existingEnrollments.docs.forEach((enrollment: any) => {
        totalChildrenEnrolled += enrollment.numberOfChildren || 1
      })

      const newChildrenCount = data.children?.length || 1
      if (totalChildrenEnrolled + newChildrenCount > targetItem.enrollmentSettings.maxEnrollments) {
        return NextResponse.json(
          { error: `Er zijn nog maar ${targetItem.enrollmentSettings.maxEnrollments - totalChildrenEnrolled} plaatsen beschikbaar` },
          { status: 400 }
        )
      }
    }

    // Prepare enrollment data
    const enrollmentData = {
      targetType: data.targetType,
      targetId: String(data.targetId), // Ensure it's a string
      targetTitle: targetItem.title,
      children: data.children,
      contactInfo: data.contactInfo,
      additionalOptions: data.additionalOptions,
      totalPrice: data.totalPrice || 0,
      participantEmail: data.contactInfo.email, // Set email at root for admin display
      numberOfChildren: data.children?.length || 1, // Set number of children
      status: 'pending',
    }

    console.log('Creating enrollment with data:', JSON.stringify(enrollmentData, null, 2))

    // Create the enrollment
    const enrollment = await payload.create({
      collection: 'enrollments' as any,
      data: enrollmentData,
    })

    return NextResponse.json(
      { 
        success: true, 
        enrollment: enrollment,
        message: targetItem.enrollmentSettings?.customMessage || 'Inschrijving succesvol ontvangen'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verwerken van de inschrijving' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadClient()
    const { searchParams } = new URL(request.url)
    const targetType = searchParams.get('targetType')
    const targetId = searchParams.get('targetId')

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'targetType and targetId parameters are required' },
        { status: 400 }
      )
    }

    // Get enrollments for a specific target
    const enrollments = await payload.find({
      collection: 'enrollments' as any,
      where: {
        targetType: {
          equals: targetType,
        },
        targetId: {
          equals: targetId,
        },
      },
      sort: '-createdAt',
    })

    return NextResponse.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het ophalen van inschrijvingen' },
      { status: 500 }
    )
  }
}