import React, { useContext } from 'react'
import { RecipeContext } from "../context/RecipeContext"
import { Card, Button } from "react-bootstrap";

function RecipeCard({ image, label, recipe}) {

    const [ ,,, setModal ] = useContext(RecipeContext)

    const handleClick = () => {
        setModal({selectedRecipe:{recipe}, open:true})
    }

    return (
        <Card className="rounded" >
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{label}</Card.Title>
                <Button variant="info" onClick={handleClick}>
                    Open
                </Button>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard
