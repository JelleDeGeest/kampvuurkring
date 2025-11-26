// Shared hook to filter out past dates for frontend API requests
// but allow all dates in admin panel

export const filterPastDatesHook = async ({ args, operation, req }: any) => {
  // Only filter on 'read' operations (find, findByID)
  // Skip filtering for admin panel requests or when accessing by specific ID
  const isAdminRequest = req?.url?.includes('/admin') ||
                         req?.headers?.get?.('referer')?.includes('/admin') ||
                         req?.user // If user is authenticated, they're likely in admin

  const isFindByIdOperation = operation === 'read' && args?.req?.params?.id

  if (operation === 'read' && !isAdminRequest && !isFindByIdOperation) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Add a where clause to filter out past items
    // An item is considered "past" if its endDate (or startDate if no endDate) is before today
    const dateFilter = {
      or: [
        { endDate: { greater_than_equal: today.toISOString() } },
        {
          and: [
            { endDate: { exists: false } },
            { startDate: { greater_than_equal: today.toISOString() } },
          ],
        },
      ],
    }

    // Merge with existing where clause if present
    if (args.where) {
      args.where = {
        and: [args.where, dateFilter],
      }
    } else {
      args.where = dateFilter
    }
  }
  return args
}
