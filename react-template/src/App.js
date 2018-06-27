/* eslint-disable-next-line */
import React, { Component } from 'react'
import './assets/styles/style.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.page = React.createRef()
    this.state = {
      pageHeight: 0,
      emojiScale: 1
    }
  }

  componentDidMount () {
    const pageElem = this.page.current
    this.setState({
      pageHeight: pageElem.offsetHeight
    })
  }

  handleScroll = (e) => {
    const appElem = e.target
    const pageHeight = this.state.pageHeight
    const scrollTop = appElem.scrollTop
    const activePage = scrollTop / pageHeight
    // 缩放倍率需要根据元素实际位置调整
    if (activePage >= 1 && activePage <= 2.3) {
      this.setState({
        emojiScale: 4 * (1 - (activePage - 1.3))
      })
    }
  }

  render () {
    const emojiScale = this.state.emojiScale
    return (
      <div className="app" onScroll={this.handleScroll}>
        <div ref={this.page} className="page page1" />
        <div className="page page2" />
        <div className="page page3">
          <div className="page3__bg" />
          <div className="emoji-mdr" style={{transform: `rotateX(-30deg) scale(${emojiScale})`}}/>
        </div>
        <div className="page page4" />
      </div>
    )
  }
}

export default App
