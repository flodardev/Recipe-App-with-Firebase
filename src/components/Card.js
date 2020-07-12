import React, { useContext } from 'react'
import { RecipeContext } from "../context/RecipeContext"
import { Card, Button, Row, Col } from "react-bootstrap";

function RecipeCard({ image, label, recipe}) {

    const [ ,,, setModal ] = useContext(RecipeContext)

    const handleClick = () => {
        setModal({selectedRecipe:{recipe}, open:true})
    }

    return (
        <Card className="rounded shadow" >
            <Card.Img variant="top" src={image} alt={label} />
            <Card.Body>
                <Row>
                    <Col xs={7}>
                        <Card.Title>{label}</Card.Title>
                    </Col>
                    <Col >
                        <Button className="ml-auto" variant="info" onClick={handleClick}>
                            Open
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard
