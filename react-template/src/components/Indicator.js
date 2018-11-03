import React from 'react'

const Indicator = (props) => <div className={`indicator ${props.active ? 'active' : ''}`} onClick={props.onClick}/>

export default Indicator
