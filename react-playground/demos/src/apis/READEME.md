# React API list


react@17.0.3

1. 组件类
    * Component
    
    *react/src/ReactBaseClasses.js*
    
    ```javascript
    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      // If a component has string refs, we will assign a different object later.
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }
    ```
    
    `Component` 组件的实例化
    
    *react-reconciler/src/ReactFiberClassComponent.js*
    
    ```typescript
    function constructClassInstance(
      workInProgress: Fiber,
      ctor: any,
      props: any,
    ): any {
      // ...省略很多代码...
      const instance = new ctor(props, context);
      const state = (workInProgress.memoizedState =
      instance.state !== null && instance.state !== undefined
        ? instance.state
        : null);
      adoptClassInstance(workInProgress, instance);
          // ...
    }
    // adoptClassInstance
    function adoptClassInstance(workInProgress: Fiber, instance: any): void {
      instance.updater = classComponentUpdater;
      workInProgress.stateNode = instance;
      // The instance needs access to the fiber so that it can schedule updates
      setInstance(instance, workInProgress);   
    }
     // classComponentUpdater
    const classComponentUpdater = {
    isMounted,
    enqueueSetState(inst, payload, callback) {
      const fiber = getInstance(inst);
      const eventTime = requestEventTime();
      const lane = requestUpdateLane(fiber);
  
      const update = createUpdate(eventTime, lane);
      update.payload = payload;
      if (callback !== undefined && callback !== null) {
        update.callback = callback;
      }
  
      enqueueUpdate(fiber, update, lane);
      const root = scheduleUpdateOnFiber(fiber, lane, eventTime);
      if (root !== null) {
        entangleTransitions(root, fiber, lane);
      }
  
      if (enableSchedulingProfiler) {
        markStateUpdateScheduled(fiber, lane);
      }
    },
    enqueueReplaceState(inst, payload, callback) {
      const fiber = getInstance(inst);
      const eventTime = requestEventTime();
      const lane = requestUpdateLane(fiber);
  
      const update = createUpdate(eventTime, lane);
      update.tag = ReplaceState;
      update.payload = payload;
  
      if (callback !== undefined && callback !== null) {
        update.callback = callback;
      }
  
      enqueueUpdate(fiber, update, lane);
      const root = scheduleUpdateOnFiber(fiber, lane, eventTime);
      if (root !== null) {
        entangleTransitions(root, fiber, lane);
      }
  
      if (enableSchedulingProfiler) {
        markStateUpdateScheduled(fiber, lane);
      }
    },
    enqueueForceUpdate(inst, callback) {
      const fiber = getInstance(inst);
      const eventTime = requestEventTime();
      const lane = requestUpdateLane(fiber);
  
      const update = createUpdate(eventTime, lane);
      update.tag = ForceUpdate;
  
      if (callback !== undefined && callback !== null) {
        update.callback = callback;
      }
  
      enqueueUpdate(fiber, update, lane);
      const root = scheduleUpdateOnFiber(fiber, lane, eventTime);
      if (root !== null) {
        entangleTransitions(root, fiber, lane);
      }  
  
      if (enableSchedulingProfiler) {
        markForceUpdateScheduled(fiber, lane);
      }
     }
    }
   
    ```
    
    * PureComponent
    
     `PureComponent`和 `Component`用法，差不多一样，唯一不同的是，
    纯组件PureComponent会`浅比较`，`props`和`state`是否相同，来决定是否重新渲染组件。
    所以一般用于性能调优，减少`render`次数.
    
    ```javascript
    class TestPureComponent extends React.PureComponent {
      constructor () {
        super()
        this.state = {
          data: {
            name: 'no one',
            age: 10000
          }
        }
      }
    
      handleClick = () => {
        /* 如下 setState 点击按钮不会更新 age. 因为 PureComponent 在 shouldComponentUpdate 中对 data 对象进行了浅比较.
         显然,data 对象的 引用没有改变,浅比较结果导致 shouldComponentUpdate 返回 false.
         const {data} = this.state
         data.age++
         this.setState({data})
        */
        /*
         而给 data 对象设置新的对象就会导致浅比较失效,进而更新 age 成功.
        */
        this.setState((preState, preProps) => ({
          data: {
            ...preState.data,
            age: preState.data.age + 1
          }
        }))
      }
    
      render () {
        const {
          name,
          age
        } = this.state.data
        return (
          <div>
            <div>name: {name}</div>
            <span>age: {age}</span>
            <div>
              <button onClick={this.handleClick}>click me</button>
            </div>
          </div>
        )
      }
    }
    ```
    react/src/ReactBaseClasses.js#129
    
    ```javascript
    /**
     * Convenience component with default shallow equality check for sCU.
     */
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      // If a component has string refs, we will assign a different object later.
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    
    ```
    `react-reconciler/src/ReactFiberClassComponent.new.js#315`
    ```javascript
    function checkShouldComponentUpdate(
      workInProgress,
      ctor,
      oldProps,
      newProps,
      oldState,
      newState,
      nextContext,
    ) {
      const instance = workInProgress.stateNode;
      if (typeof instance.shouldComponentUpdate === 'function') {
        // ...
        const shouldUpdate = instance.shouldComponentUpdate(
          newProps,
          newState,
          nextContext,
        );
        
    
        return shouldUpdate;
      }
    
      // 关键在这里
      if (ctor.prototype && ctor.prototype.isPureReactComponent) {
        return (
          !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
        );
      }
    
      return true;
    }
    ```
    `react/packages/shared/shallowEqual.js`
    ```javascript
    /**
     * Performs equality by iterating through keys on an object and returning false
     * when any key has values which are not strictly equal between the arguments.
     * Returns true when the values of all keys are strictly equal.
     */
    function shallowEqual(objA: mixed, objB: mixed): boolean {
      // 还有这里
      if (is(objA, objB)) {
        return true;
      }
    
      if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
      ) {
        return false;
      }
    
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
    
      if (keysA.length !== keysB.length) {
        return false;
      }
    
      // Test for A's keys different from B.
      for (let i = 0; i < keysA.length; i++) {
        if (
          !hasOwnProperty.call(objB, keysA[i]) ||
          !is(objA[keysA[i]], objB[keysA[i]])
        ) {
          return false;
        }
      }
    
      return true;
    }
    ```
    
    * memo
    
    React.memo only checks for prop changes.
    
    ```javascript
    import React, { useState } from 'react'
    
    const Text = (props) => {
      console.log('Text rendered.')
      if (props) {
        return (
          <div>
            <span>num: {props.num}</span>
            <br/>
            <span>number: {props.number}</span>
          </div>
        )
      }
    }
    
    const areEqual = (preProps, nextProps) => {
      // 相同的 props,组件不渲染
      if (preProps.number === nextProps.number) {
        return true
    
        // 大于等于 5,依旧不渲染
      } else if (preProps.number !== nextProps.number && nextProps.number >= 5) {
        return true
    
      } else {
        // 其它情况,渲染
        return false
      }
    }
    
    const MemoText = React.memo(Text, areEqual)
    
    const TestMemo = () => {
      const [number, setNumber] = useState(0)
      const [num, setNum] = useState((0))
      return (
        <div>
          <div>
            <span>num: {num}</span>
            <br/>
            <button onClick={() => setNum(num + 1)}>num++</button>
            <button onClick={() => setNum(num - 1)}>num--</button>
          </div>
          <div>
            <span>number: {number}</span>
            <br/>
            <button onClick={() => setNumber(number + 1)}>number++</button>
            <button onClick={() => setNumber(number - 1)}>number--</button>
          </div>
          <div>
            <MemoText number={number} num={num}/>
          </div>
        </div>
      )
    }
    
    export default TestMemo
    ```
    
    * forwardRef, createRef
    
    React.forwardRef creates a React component that forwards the ref attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:
    
    * Forwarding refs to DOM components
    * Forwarding refs in higher-order-components
   
    * lazy
    * Suspense 
    React.lazy和Suspense配合一起用，能够有动态加载组件的效果。React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。
    
    ```javascript
    import React from 'react'
    import Test from "./Test";
    
    const LazyTest = React.lazy(() => new Promise((resolve => {
      setTimeout(() =>{
        resolve({
          default: () => <Test />
        })
      }, 2000)
    })))
    
    const LazyComponent = () => {
      return (
        <div>
          <React.Suspense fallback={<div>spinning</div>}>
            <LazyTest />
          </React.Suspense>
        </div>
      )
    }
    
    export default LazyComponent
 
    // Test
     const Test = () => {
       useEffect(() => {
         console.log(' Test Component did mount.')
       }, [])
       return (
         <div>
           <h1>Test Component</h1>
         </div>
       )
     }
  
    // 官方示例
    // This component is loaded dynamically
     const OtherComponent = React.lazy(() => import('./OtherComponent'));
     
     function MyComponent() {
       return (
         // Displays <Spinner> until OtherComponent loads
         <React.Suspense fallback={<Spinner />}>
           <div>
             <OtherComponent />
           </div>
         </React.Suspense>
       );
     }
    ```
    
    * Fragment
    The React.Fragment component lets you return multiple elements in a render() method without creating an additional DOM element:
    ```javascript
    render() {
      return (
        <React.Fragment>
          Some text.
          <h2>A heading</h2>
        </React.Fragment>
      );
    }
    ```
    You can also use it with the shorthand <></> syntax. For more information, see React v16.2.0: Improved Support for Fragments.
    
    * Profiler
    * StrictMode
    
2. 工具类

    * createElement
    * cloneElement
    * createContext
    * createFactory
    * createRef
    * isValidElement
    * Children.map
    * Children.forEach
    * Children.count
    * Children.toArray
    * Children.only
    
3. react-hooks

    * useState
    * useEffect
    * useMemo
    * useCallback
    * useRef
    * useLayoutEffect
    * useReducer
    * useContext
    * useImperativeHandle
    * useDebugValue
    * useTransition
    
4. react-dom
    * render
    * hydrate
    * createPortal
    * unstable_batchedUpdates
    * flushSync
    * findDOMNode
    * unmountComponentAtNode

## 组件类

## 工具类

## Hooks

## react-dom

