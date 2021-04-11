import React from "react";
function Category({data}){
  return(
      <div className={'category_item'} onClick={() => window.location.href = `/postsByCategory/${data.id}`}>
        <span className={'category_title'}>{data.title}</span>
        <span className={'category_description'}>{data.description}</span>
      </div>
  )
}

export default Category