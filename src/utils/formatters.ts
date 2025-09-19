import { format, parseISO } from 'date-fns'

// Format date from YYYY-MM-DD to readable format
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    return format(date, 'MMM dd, yyyy')
  } catch (error) {
    return dateString
  }
}

// Format date to year only
export const formatYear = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    return format(date, 'yyyy')
  } catch (error) {
    return dateString
  }
}

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return 'N/A'
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }
  return `${remainingMinutes}m`
}

// Format vote average to one decimal place
export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

// Format numbers with commas (for budget, revenue, etc.)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Format large numbers (for vote counts, etc.)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}