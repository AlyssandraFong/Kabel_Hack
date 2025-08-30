"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  fallbackSrc?: string
}

const ImageFallback = ({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/placeholder.svg",
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImgSrc(fallbackSrc)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default ImageFallback
