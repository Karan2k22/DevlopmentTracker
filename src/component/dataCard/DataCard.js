import React from 'react'

const DataCard = ({
  color="",
  discription = "",
  date = "",
  status = "",
  click_item ,
   setclick_item,
   setdata,
 
  
}) => {
  const handleClick = () => {
    if (setclick_item) {
      setclick_item(!click_item);
      setdata({discription : discription, date : date, status : status})
    }
  };
  return (
    <div style={{background: color, margin:"10px",padding:"12px",borderRadius:"5px", cursor:"pointer"}}
    
    
      onClick={handleClick}
    
    >
      <p>{discription}</p>
      <div><span><b>Date : </b></span>{date}</div>
    </div>
  )
}

export default DataCard