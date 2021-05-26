/**
 * @Author: yangqixin
 * @TIME: 5/25/21 10:01 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

/**
 *
 *  1. Forwarding refs to DOM components
 *  2. Forwarding refs in higher-order-component
 *
 */


import React, {useEffect, useRef} from 'react'


const MyButton = (props) => {
  return (
    <div>
      <button ref={props.innerRef}>{props.children}</button>
    </div>
  )
}

const ForwardedButton = React.forwardRef((props, ref) => (
  <MyButton innerRef={ref} {...props}/>
))

function Hoc (Component) {
  class Wrapper extends React.Component {
    render () {
      const {forwardedRef, ...otherProps} = this.props
      return (
        <div>
          <Component ref={forwardedRef} {...otherProps}/>
        </div>
      );
    }
  }

  return React.forwardRef((props, ref) => (<Wrapper forwardedRef={ref} {...props}/>))
}

// warning: function Component should not pass ref.
// const HocTestComponent = (props) => {
//   useEffect(() => {
//     console.log('HOCTestComponent did mount.')
//   }, [])
//   return (
//     <div>
//       <h1>HOC test component</h1>
//     </div>
//   )
// }

class HocTestComponent extends React.Component {
  divRef = React.createRef()
  componentDidMount () {
    console.log('Class Component: HocTextComponent did mount')
  }
  render () {
    return (
      <div ref={this.divRef}>
        <h1>Hoc Test component.</h1>
      </div>
    )
  }
}

const HOCComponent =Hoc(HocTestComponent)

const UseRef = () => {
  const ref = useRef(null)
  useEffect(() => {
    // 这里就可以取到, HOCTestComponent 的实例
    console.log(ref.current.divRef.current)
  }, [])
  return (
    <div>
      <HOCComponent ref={ref}/>
    </div>
  )
}

class ForwardRefComponent extends React.Component {
  constructor () {
    super()
    this.domRef = React.createRef()
  }
  componentDidMount () {
    console.log(this.domRef.current)
  }

  render () {
    return (
      <div>
        <ForwardedButton ref={this.domRef}>now click me!</ForwardedButton>
        <UseRef />
      </div>
    );
  }
}


export default ForwardRefComponent




