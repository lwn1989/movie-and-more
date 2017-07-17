import React from 'react'

export default class RateStars extends React.Component {
  render () {
    const { rate } = this.props
    var fullStarCount = Math.floor(rate * 1.0 / 2)
    var halfStarCount = (rate * 1.0 / 2) - fullStarCount >= 0.5
    var greyStarCount
    var icons = []
    const greenStarStyle = {
      color: '#6df08c',
      margin: '0 0.15rem'
    }
    const greyStarStyle = {
      color: '#8c8c8c',
      margin: '0 0.15rem'
    }
    const halfStarStyle = {
      color: '#6df08c',
      position: 'relative',
      left: '-1.10rem',
      marginRight: '-0.48rem'
    }
    for (var i = 0; i < fullStarCount; i++) {
      icons.push(<i key={'h' + i} className='fa fa-star' style={greenStarStyle} />)
    }
    if (halfStarCount) {
      icons.push(<i key={'gr'} className='fa fa-star' style={greyStarStyle} />)
      icons.push(<i key={'hg'} className='fa fa-star-half fgIcon' style={halfStarStyle} />)
    }
    if (halfStarCount) {
      greyStarCount = 5 - fullStarCount - 1
    } else {
      greyStarCount = 5 - fullStarCount
    }
    if (greyStarCount !== 0) {
      for (var j = 0; j < greyStarCount; j++) {
        icons.push(<i key={'g' + j} className='fa fa-star' style={greyStarStyle} />)
      }
    }
    return (
      <div>
        {icons}
      </div>
    )
  }
  }
