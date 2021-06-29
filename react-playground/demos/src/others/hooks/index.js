/**
 * @Author: yangqixin
 * @TIME: 6/8/21 5:48 PM
 * @FILE: index.js
 * @Email: 958292256@qq.com
 */

// hook by hand. V.1

import ReactDOM from 'react-dom'

let workInProgressHook
let isMount = true

const fiber = {
  memoizedState: null,
  stateNode: null
}

const Dispatcher = (() => {
  function mounWorkInProgressHook () {
    const hook = {
      queue: {
        pending: null
      },
      memoizedState: null,
      next: null
    }

    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook

    return workInProgressHook
  }

  function updateWorkInProgressHook () {
    let hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
    return hook
  }

  function useState (initialState) {
    let hook

    if (isMount) {
      hook = mounWorkInProgressHook()
      hook.memoizedState = initialState
    } else {
      hook = updateWorkInProgressHook()
    }

    let baseState = hook.memoizedState
    if (hook.queue.pending) {
      let firstUpdate = hook.queue.pending.next

      do {
        const action = firstUpdate.action
        baseState = action(baseState)
        firstUpdate = firstUpdate.next
      } while (firstUpdate !== hook.queue.pending)

      hook.queue.pending = null
    }

    hook.memoizedState = baseState

    return [baseState, dispatchAction.bind(null, hook.queue)]
  }

  return {
    useState
  }
})();


function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }

  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }

  queue.pending = update

  isMount = false
  workInProgressHook = fiber.memoizedState
  schedule()
}

function App() {
  let [count, setCount] = Dispatcher.useState(1)
  let [age, setAge] = Dispatch.useState(10)

  return (
    <>
      <p>Clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>Add age</button>
    </>
  )
}

function schedule() {
  ReactDOM.render(
    <App />,
    document.getElementById('#app')
  )
}

schedule()
