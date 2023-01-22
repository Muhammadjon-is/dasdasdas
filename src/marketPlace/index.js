

import express from "express"
import BooksModel from "./model.js"
import createHttpError from 'http-errors'

const MarketPlace = express.Router()

// !Post
MarketPlace.post("/", async (req, res, next) => {
    res.send("dsdsds")
    try{
  const newBook = new BooksModel(req.body)
  const {_id} = await newBook.save()
  res.status(200).send({_id})
    }catch(error){
        next(error)
    }
})
MarketPlace.get("/", async (req, res, next) => {
    try{
     const books = await BooksModel.find()
     res.send(books)
    }catch(error){
        next(error)
    }
})
MarketPlace.get("/:productId", async (req, res, next) => {
    try{
        const book = await BooksModel.findById(req.params.productId)
        if (book) {
          res.send(book)
        } else {
          next(createHttpError(404, `User with id ${req.params.productId} not found!`))
        }
    }catch(error){
        next(error)
    }
})
MarketPlace.put("/:productId", async (req, res, next) => {
    try{
        const updatedBooks = await BooksModel.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true, runValidators: true }  
            )
      
          if(updatedBooks) {
            res.send(updatedBooks)
          } else {
            next(createHttpError(404, `User with id ${req.params.productId} not found!`))
          }
    }catch(error){
        next(error)
    }
})


MarketPlace.delete("/:productId", async (req, res, next) => {
    try{
        const deletedBook = await BooksModel.findByIdAndDelete(req.params.productId)

        if (deletedBook) {
          res.status(204).send()
        } else {
          next(createHttpError(404, `User with id ${req.params.productId} not found!`))
        }
    }catch(error){
        next(error)
    }
})

export default MarketPlace
