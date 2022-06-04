import React, { useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Button } from 'antd'
import styles from './scrollBarCommon.module.scss'
import { UpCircleFilled, LeftCircleFilled } from '@ant-design/icons'

const ScrollBarCommon = (props) => {
  const buttonTopRef = useRef(null)
  const buttonLeftRef = useRef(null)
  const scrollRef = useRef(null)

  const heightScrollBar = (value = '') => {
    return Number(value) && typeof value !== 'string'
      ? `${value}px`
      : typeof value === 'string' && value.includes('px')
      ? value
      : '200px'
  }
  const widthScrollBar = (value = '') => {
    return Number(value) && typeof value !== 'string'
      ? `${value}px`
      : (typeof value === 'string' && value.includes('px')) ||
        value.includes('%')
      ? value
      : '100%'
  }

  const handleScrollFrame = (props) => {
    const { scrollHeight, scrollTop, scrollLeft, scrollWidth } = props
    if (scrollRef.current.getScrollLeft()) {
      scrollLeft > scrollWidth / 2
        ? (buttonLeftRef.current.style.display = 'block')
        : (buttonLeftRef.current.style.display = 'none')
    } else if (scrollRef.current.getScrollTop()) {
      scrollTop > scrollHeight / 2
        ? (buttonTopRef.current.style.display = 'block')
        : (buttonTopRef.current.style.display = 'none')
    }
  }

  const trackVertical = (props) => {
    const style = {
      width: '7px',
      right: 0,
      bottom: 2,
      top: 2,
      borderRadius: '4px',
    }
    return <div style={{ ...props.style, ...style }}></div>
  }

  const thumbVertical = (props) => {
    const style = {
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
    }
    return (
      <div
        style={{
          ...props.style,
          ...style,
        }}
      ></div>
    )
  }

  const trackHorizontal = (props) => {
    const style = {
      height: '7px',
      right: 2,
      bottom: 0,
      left: 2,
      borderRadius: '4px',
    }
    return <div style={{ ...props.style, ...style }}></div>
  }

  const thumbHorizontal = (props) => {
    const style = {
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
    }
    return (
      <div
        style={{
          ...props.style,
          ...style,
        }}
      ></div>
    )
  }

  // const handleScrollStart = () => {}
  // const handleScrollStop = () => {}
  // const handleUpdateScroll = () => {}

  return (
    <div style={{ position: 'relative' }}>
      <Scrollbars
        renderTrackVertical={trackVertical}
        renderThumbVertical={thumbVertical}
        renderTrackHorizontal={trackHorizontal}
        renderThumbHorizontal={thumbHorizontal}
        onScrollFrame={handleScrollFrame}
        // onScrollStart={handleScrollStart}
        // onScrollStop={handleScrollStop}
        // onUpdate={handleUpdateScroll}
        autoHide={true}
        hideTracksWhenNotNeeded={true}
        autoHideTimeout={1000}
        autoHideDuration={500}
        style={{
          height: heightScrollBar(props.height),
          width: widthScrollBar(props.width),
        }}
        universal={true}
        ref={scrollRef}
        thumbSize={props.size || 50}
        thumbMinSize={50}
        {...props}
      >
        {props.children}
      </Scrollbars>
      <Button
        icon={<UpCircleFilled />}
        ref={buttonTopRef}
        className={styles.btnGoToTop}
        onClick={() => {
          scrollRef.current.scrollToTop()
          buttonTopRef.current.style.display = 'none'
        }}
      ></Button>
      <Button
        icon={<LeftCircleFilled />}
        ref={buttonLeftRef}
        className={styles.btnGoToLeft}
        onClick={() => {
          scrollRef.current.scrollToLeft()
          buttonLeftRef.current.style.display = 'none'
        }}
      ></Button>
    </div>
  )
}

export default ScrollBarCommon
