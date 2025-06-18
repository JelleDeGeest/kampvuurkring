import { NextResponse } from 'next/server'

export async function GET() {
  // Basic health check
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'kampvuurkring-frontend',
    environment: process.env.NODE_ENV || 'development'
  }

  // Optional: Add database connectivity check
  // try {
  //   await checkDatabaseConnection()
  //   health.database = 'connected'
  // } catch (error) {
  //   health.database = 'disconnected'
  //   health.status = 'degraded'
  // }

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 503
  })
}