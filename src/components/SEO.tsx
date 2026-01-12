import { useEffect } from 'react'
import { setPageSEO, SEOData } from '../utils/seo'

interface SEOProps extends SEOData {
  children?: never
}

/**
 * SEO component
 * Sets page title and meta tags when mounted
 */
export const SEO = (props: SEOProps) => {
  useEffect(() => {
    setPageSEO(props)
  }, [props.title, props.description, props.image, props.url])

  return null
}
