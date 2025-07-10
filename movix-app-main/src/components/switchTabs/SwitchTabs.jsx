import React, { useState } from 'react'

import "./style.scss"
const SwitchTabs = ({data, onTabChange}) => {
  const [selectedTab, setSelectedTab] = useState(0);        //isme default/initial selected tab ka index pass hoga jo ki day h hmare case me
  const [left, setLeft] = useState(0)

  const activeTab = (tab, index) => {
    setLeft(index*100)
    setTimeout( () => {
      setSelectedTab(index)
    },300)
    onTabChange(tab,index)
  }
  return (
    <div className='switchingTabs'>
      <div className="tabItems">
        {data.map((tab,index) => (
          <span 
          key={index} 
          className={`tabItem ${ selectedTab === index ? "active" : "" }`}
          onClick={ () => activeTab(tab,index)}>
            {tab}
          </span>
        ))}
        <span className='movingBg' style={{left}}/>     {/* we are giving inline style to this element in this left: left since in this key and value is same therefore we can also write it like only left */}
      </div>  
    </div>
  )
}

export default SwitchTabs