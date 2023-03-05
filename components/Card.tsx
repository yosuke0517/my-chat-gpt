import React, { useCallback, useState } from 'react'

interface CardProps {
  id: string
  text: string
  onDrop: (draggedId: string, droppedId: string) => void
}

const Card: React.FC<CardProps> = ({ id, text, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      setIsDragging(true)
      e.dataTransfer.setData('text', id)
    },
    [id]
  )

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const draggedId = e.dataTransfer.getData('text')
      onDrop(draggedId, id)
    },
    [id, onDrop]
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`card ${isDragging ? 'dragging' : ''}`}
    >
      {text}
    </div>
  )
}

export default Card
