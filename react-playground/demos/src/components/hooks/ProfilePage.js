import React from 'react'

const Profile = (props) => {
  const showMessage = () => {
    console.log(props.user, 'in Func')
    alert('Followed ' + props.user)
  }

  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }
  return <button onClick={handleClick}>Follow {props.user}</button>
}

export default Profile
