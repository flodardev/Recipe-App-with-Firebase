import React, { useContext } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { RecipeContext } from "../context/RecipeContext"


const MyVerticallyCenteredModal = React.memo((props) => {
    const [ , , modal, setModal ] = useContext(RecipeContext)
    const recipe = modal.selectedRecipe.recipe

    const onHide = () => {
        setModal(prevState => {
            return ({
                ...prevState,
                open: false
            })
        })
    }

    return (
        <Modal
            onHide={onHide}
            show={modal.open}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {recipe.label}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container text-center">
            <img src={recipe.image} alt={recipe.label} style={{ borderRadius: "5%" }}/>
            <div>
                <small>Source: <a href={recipe.url}>{recipe.source}</a></small>
            </div>
        </div>
        <div className="container">
            <h5>Labels:</h5>
            <ul>
                { recipe.dietLabels.map(label => <li key={label}>{ label }</li>) }
                { recipe.healthLabels.map(label => <li key={label}>{ label }</li>) }
            </ul>
            <h5>Cautions:</h5>
            <ul>
                { recipe.cautions.map(caution => <li key={caution}>{ caution }</li>) }
            </ul>
            <h5>Ingredients:</h5>
            <ul>
                { recipe.ingredientLines.map(ingredient => <li key={ingredient}>{ ingredient }</li>) }
            </ul>
            <h5>Calories:</h5>
            <ul>
                { recipe.calories }
            </ul>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="info">Close</Button>
        </Modal.Footer>
      </Modal>
    );
})

export default MyVerticallyCenteredModal