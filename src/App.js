import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Form, CardColumns, Spinner } from "react-bootstrap";
import RecipeCard from "./components/Card"
import Modal from "./components/Modal"
import { RecipeContext } from "./context/RecipeContext"
import './App.scss';
require("dotenv").config();

function App() {
  const [recipes, setRecipes, modal, , loading, setLoading] = useContext(RecipeContext)
  const [search, setSearch] = useState("")

  const getRecipes = useCallback(() => {
    setLoading(true)
    const example = `https://api.edamam.com/search?q=chicken&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`
    axios.get(example)
      .then(response => {
        setLoading(false)
        const recipesList = response.data.hits.map(recipe => recipe.recipe)
        setRecipes(recipesList)
      })
      .catch(err => console.log(err))
  }, [setRecipes, setLoading])

  useEffect(() => {
    getRecipes();
  }, [getRecipes])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const url = `https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_EDAMAM_ID}&app_key=${process.env.REACT_APP_EDAMAM_KEY}`;
    axios.get(url)
    .then(response => {
      setLoading(false)
      const recipesList = response.data.hits.map(recipe => recipe.recipe)
      setRecipes(recipesList)
    })
    .catch(err => console.log(err))

    setSearch("")
  }

  return (
      <div className="App">
        <header>
          <h1 className="mt-2">Search for Recipes</h1>
        </header>
        <main className="container">
        <Form inline onSubmit={handleSubmit} className="mb-1">
          <div className="search-form">
            <Form.Control onChange={handleChange} value={search} type="text" className="mr-1" placeholder="Search"></Form.Control>
            <Button type="submit" className="my-1" variant="info">
              Search
            </Button>
          </div>
        </Form>
        {loading ? (
          <Spinner className="mt-5" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>) : (
          <CardColumns>
          {recipes.map(recipe => {
            return (
              <>
                <RecipeCard 
                  key={recipe.label}
                  label={recipe.label}
                  image={recipe.image}
                  recipe={recipe}
                />
              </>
            )
          })}
          </CardColumns>
          ) }
        {modal.open ? <Modal /> : null }
        </main>
      </div>
  );
}

export default App;
