import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { stateFromHTML } from 'draft-js-import-html';
import './Recipe.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";

interface Recipe {
  categoryID: string,
  id: string,
  name: string,
  desc: string
  ingredients: string,
  steps: string,
  author: string
}

export default function Recipe() {
  const [recipe, setRecipe] = useState<Recipe>();
  const [edit, setEdit] = useState<boolean>(false);
  let params = useParams();

  useEffect(() => {
    async function getRecipe() {
      await fetch('//localhost:3001/recipes/recipe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: params.recipeID})
      })
      .then(res => res.json())
      .then(data => {
        var rec = data;
        setRecipe(rec);
      })
    }
    getRecipe();
  }, [edit])

  function editRecipe() {
    setEdit(true);
  }

  function submitForm(method: string, id: string, name: string, desc: string, ingredients?: string, steps?: string, author?: string) {
    fetch('//localhost:3001/recipes', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryID: params.categoryID,
        id: id,
        name: name,
        desc: desc,
        ingredients: ingredients,
        steps: steps,
        author: author
      })
    })
      setEdit(false);
  }

  return (
    <div className="fullRecipe">
      <button className="editIcon" onClick={() => editRecipe()}><FontAwesomeIcon icon={faEdit} /></button>
      <h2>{recipe?.name}</h2>
      <h4>{recipe?.desc}</h4>
      <h3>Ingredients</h3>
      <p dangerouslySetInnerHTML={recipe && { __html: recipe.ingredients}}></p>
      <h3>Steps</h3>
      <p dangerouslySetInnerHTML={recipe && { __html: recipe.steps}}></p>
      <p>Author: {recipe?.author}</p>
      {edit && <div className='createFormRecipe'><Form type="recipe" submitForm={submitForm} cancelForm={() => setEdit(false)} id={recipe?.id} name={recipe?.name} desc={recipe?.desc} ingredients={recipe?.ingredients} steps={recipe?.steps} author={recipe?.author}/></div>}
    </div>
  )
}