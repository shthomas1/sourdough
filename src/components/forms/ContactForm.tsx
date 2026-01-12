import { useState } from 'react'
import { z } from 'zod'
import { siteConfig } from '../../config/site.config'
import './ContactForm.css'

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Provider types
type FormProvider = 'emailjs' | 'resend' | 'formspree' | 'netlify' | 'api' | 'none'

interface ContactFormProps {
  provider?: FormProvider
  providerConfig?: {
    emailjs?: {
      serviceId: string
      templateId: string
      publicKey: string
    }
    resend?: {
      apiKey: string
      to: string
    }
    formspree?: {
      formId: string
    }
    netlify?: {
      formName: string
    }
    api?: {
      endpoint: string
      table?: string
    }
  }
  title?: string
  subtitle?: string
  fields?: {
    name?: boolean
    email?: boolean
    phone?: boolean
    company?: boolean
    message?: boolean
  }
  onSubmit?: (data: ContactFormData) => Promise<void> | void
}

/**
 * ContactForm component with Zod validation and pluggable providers
 * Supports EmailJS, Resend, Formspree, Netlify, or custom API
 */
export const ContactForm = ({
  provider = 'api',
  providerConfig,
  title = 'Contact Us',
  subtitle = 'Get in touch with us. We\'d love to hear from you.',
  fields = {
    name: true,
    email: true,
    phone: false,
    company: false,
    message: true,
  },
  onSubmit,
}: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitStatus({ type: null, message: '' })

    // Validate with Zod
    const result = contactFormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {}
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as keyof ContactFormData] = error.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Call custom onSubmit if provided
      if (onSubmit) {
        await onSubmit(result.data)
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        setFormData({ name: '', email: '', phone: '', message: '', company: '' })
        return
      }

      // Handle different providers
      let success = false

      switch (provider) {
        case 'api':
          if (providerConfig?.api) {
            const response = await fetch(providerConfig.api.endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...result.data,
                table: providerConfig.api.table || 'contacts',
                createdAt: new Date().toISOString(),
              }),
            })
            const data = await response.json()
            success = response.ok && data.success !== false
          }
          break

        case 'formspree':
          if (providerConfig?.formspree) {
            const response = await fetch(`https://formspree.io/f/${providerConfig.formspree.formId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(result.data),
            })
            success = response.ok
          }
          break

        case 'netlify':
          if (providerConfig?.netlify) {
            const formDataToSubmit = new FormData()
            Object.entries(result.data).forEach(([key, value]) => {
              if (value) formDataToSubmit.append(key, value)
            })
            formDataToSubmit.append('form-name', providerConfig.netlify.formName)
            const response = await fetch('/', {
              method: 'POST',
              body: formDataToSubmit,
            })
            success = response.ok
          }
          break

        case 'emailjs':
          // EmailJS requires client-side library - user needs to install @emailjs/browser
          console.warn('EmailJS provider requires @emailjs/browser package. Install it and configure.')
          success = false
          break

        case 'resend':
          // Resend requires server-side implementation
          console.warn('Resend provider requires server-side implementation.')
          success = false
          break

        case 'none':
          // Just validate, don't submit
          success = true
          break
      }

      if (success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        setFormData({ name: '', email: '', phone: '', message: '', company: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again or contact us directly.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-form-wrapper">
      {(title || subtitle) && (
        <div className="contact-form-header">
          {title && <h2 className="contact-form-title">{title}</h2>}
          {subtitle && <p className="contact-form-subtitle">{subtitle}</p>}
        </div>
      )}
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {fields.name && (
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'form-input-error' : ''}`}
              required
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
        )}

        {fields.email && (
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'form-input-error' : ''}`}
              required
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
        )}

        {fields.phone && (
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        )}

        {fields.company && (
          <div className="form-group">
            <label htmlFor="company" className="form-label">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        )}

        {fields.message && (
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
              rows={6}
              required
            />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>
        )}

        <button type="submit" className="form-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitStatus.type && (
          <div className={`form-status form-status-${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  )
}
