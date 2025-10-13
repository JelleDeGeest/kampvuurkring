export const hasValue = (val: unknown): boolean => {
  if (Array.isArray(val)) {
    return val.length > 0
  }

  return val !== null && typeof val !== 'undefined'
}
