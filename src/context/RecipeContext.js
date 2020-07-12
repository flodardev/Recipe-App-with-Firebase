import React, { useState, createContext } from "react"

export const RecipeContext = createContext();

export function RecipeProvider(props) {
    const [recipes, setRecipes] = useState([])
    const [modal, setModal] = useState({
        selectedRecipe: "",
        open: false
      })
    const [loading, setLoading] = useState(false)

    return (
        <RecipeContext.Provider value={[recipes, setRecipes, modal, setModal, loading, setLoading]}>
            {props.children}
        </RecipeContext.Provider>
    )
}