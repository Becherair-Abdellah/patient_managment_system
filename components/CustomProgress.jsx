"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function CustomProgress() {
  const [progress, setProgress] = useState(0)
useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-gray-200 h-[4px] w-[150px] rounded-full rotate-90 absolute left-[-57px] top-[114px]">
    <Progress value={progress} className="w-[100%]" />
    </div>
  )
}
