import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPatients } from '@/lib/actions/dashboard-actions';
import React from 'react'

const CustomCard =({title,nbr ,icon,className,discr}) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0" className={className}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{nbr}</div>
      <p className="text-xs text-muted-foreground">
      
        {discr}
      </p>
    </CardContent>
  </Card>
  )
}

export default CustomCard
