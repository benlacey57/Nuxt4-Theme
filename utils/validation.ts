export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => boolean | string
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validate a value against a set of rules
 */
export const validateField = (
  value: any,
  rules: ValidationRule,
  fieldName = 'Field'
): ValidationResult => {
  const errors: string[] = []

  // Required validation
  if (rules.required && isEmpty(value)) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }

  // Skip other validations if value is empty and not required
  if (isEmpty(value)) {
    return { isValid: true, errors: [] }
  }

  // String-based validations
  if (typeof value === 'string') {
    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${fieldName} must be at least ${rules.minLength} characters`)
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${fieldName} must be no more than ${rules.maxLength} characters`)
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${fieldName} format is invalid`)
    }
  }

  // Custom validation
  if (rules.custom) {
    const customResult = rules.custom(value)
    if (typeof customResult === 'string') {
      errors.push(customResult)
    } else if (customResult === false) {
      errors.push(`${fieldName} is invalid`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate an entire form object
 */
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  rules: Record<keyof T, ValidationRule>
): { isValid: boolean; errors: Record<keyof T, string[]> } => {
  const errors = {} as Record<keyof T, string[]>
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    const fieldResult = validateField(
      formData[field as keyof T],
      fieldRules as ValidationRule,
      field
    )
    
    if (!fieldResult.isValid) {
      errors[field as keyof T] = fieldResult.errors
      isValid = false
    }
  }

  return { isValid, errors }
}

// Common validation rules
export const commonRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string) => isValidEmail(value) || 'Please enter a valid email address'
  },
  url: {
    custom: (value: string) => isValidUrl(value) || 'Please enter a valid URL'
  },
  phone: {
    pattern: /^[\+]?[\d\s\-\(\)]{10,}$/,
    custom: (value: string) => value.replace(/\D/g, '').length >= 10 || 'Please enter a valid phone number'
  },
  password: {
    minLength: 8,
    custom: (value: string) => {
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter'
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter'
      if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number'
      return true
    }
  }
  }
