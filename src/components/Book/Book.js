import React, { useEffect, useState } from 'react'
import imageBook from '../../fakeAPI/images/imageBook'
import BookList from '../BookList/BookList'

function Book() {
    const [imageHead,setImageHead] = useState(imageBook[0])
    useEffect(() => {
        const effectAction = setTimeout(()=>{
            if (imageHead.id >= imageBook.length) {
                setImageHead(imageBook[0])
            } else {
                setImageHead(imageBook[imageHead.id])
            } 
        },10000)
        return () => {
            clearTimeout(effectAction)
        }

    },[imageHead]) 
  return (
    <div id="book">
        <div className="book-container">
            <h3 className="book-heading"></h3>
            <div className="book-frame">
                <img src={imageHead.link} alt="Image Book" />
            </div>
            <BookList/>
        </div>
    </div>
  )
}

export default Book