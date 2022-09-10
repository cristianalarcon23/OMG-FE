import React, { useState } from 'react';

export default function Home() {


  const [itemData, setItemData] = useState({
    name: "",
    brand: "",
    type: "",
    secondHand: false,
    serialNumber: "",
    snPicture: "",
    itemPicture: "",
    warrantyPicture: ""
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setItemData(prev => {
      return {
        ...prev, 
        [name]: value,
      }
    })
  }



  return (
    <div>
      <form action="http://localhost:8001/api/v1/items" method="POST">
        <input type="text" name="name" value={itemData.name} onChange={handleChange}/>
        <input type="text" name="brand" value={itemData.brand} onChange={handleChange}/>
        <input type="text" name="type" value={itemData.type} onChange={handleChange}/>
        <input type="text" name="secondHand" value={itemData.secondHand} onChange={handleChange}/>
        <input type="text" name="serialNumber" value={itemData.serialNumber} onChange={handleChange}/>
        <input type="text" name="snPicture" value={itemData.snPicture} onChange={handleChange}/>
        <input type="text" name="itemPicture" value={itemData.itemPicture} onChange={handleChange}/>
        <input type="text" name="warrantyPicture" value={itemData.warrantyPicture} onChange={handleChange}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
