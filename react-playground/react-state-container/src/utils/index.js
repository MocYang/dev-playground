
export const noop = () => {}


export const renderProps = (props, config) => {
  const { children, render } = props
  const fn = typeof children === 'function' ? children : render
  return fn ? fn(config) : null
}



