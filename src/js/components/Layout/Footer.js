import React from 'react'

const Footer = () => (
  <div className='footer'>
    <div className='sub'>
      <div className='sub-inne'>
        <p>
          Get the best Move & TV Show tailers straight in your inbox each week.
        </p>
        <input className='input1' placeholder='First Name' />
        <input className='input2' placeholder='Email Address' />
        <input className='sub-button' type='submit' value='Subscribe' />
      </div>
    </div>
    <div className='copyright'>
      <p className='icon'>MOVIE <span>&</span> MORE</p>
      <p className='cp'>©2017 Movies & More. All Rights Reserved.</p>
      <a href='#'>Terms of Service</a>
      <a href='#'>Privacy Policy</a>
    </div>
  </div>
)

export default Footer
