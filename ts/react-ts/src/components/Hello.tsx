import * as React from 'react'

import '../assets/utils'

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => {
  return (
    <h2>
      hello from {props.compiler} {props.framework} .
    </h2>
  )
}
