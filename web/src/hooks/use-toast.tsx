import { useState } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  action?: { label: string; onClick: () => void }
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({
    title,
    description,
    action,
  }: {
    title?: string
    description?: string
    action?: { label: string; onClick: () => void }
  }) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, title, description, action, open: true }
    setToasts((prev) => [...prev, newToast])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)

    return { id, dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)) }
  }

  return { toast, toasts }
}
