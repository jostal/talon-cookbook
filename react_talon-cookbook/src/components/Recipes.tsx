import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { stateToHtml } from 'draftjs-to-html';
import { convertFromRaw } from 'draft-js';
import Card from './Card';
import Form from "./Form";
import './Recipes.css';

interface Recipe {
  categoryID: string,
  id: string,
  name: string,
  desc: string
  ingredients: string,
  steps: string,
  author: string
}

export default function Recipes() {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [editID, setEditID] = useState<string>('assignID');
  const [editName, setEditName] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');
  const [editIngredients, setEditIngredients] = useState<string>('');
  const [editSteps, setEditSteps] = useState<string>('');
  const [editAuthor, setEditAuthor] = useState<string>('');
  const [editForm, setEditForm] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [deleteCard, setDeleteCard] = useState<string>('');
  let params = useParams();

  useEffect(() => {
    async function delCard() {
      await fetch('//localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: deleteCard})
      });
      setDeleteCard("");
      getRecipes();
    }

    if (deleteCard !== "") {
      delCard();
    }

    async function getRecipes() {
      await fetch('//localhost:3001/recipes')
      .then(res => res.json())
      .then(data => {
        var recipes = JSON.parse(data);
        setRecipeList(sortRecipes(recipes.recipes));
      })
    }
    getRecipes();
  }, [recipeList, deleteCard])

  function sortRecipes(recipes: Recipe[]): Recipe[] {
    var catRecs: Recipe[] = [];
    recipes.forEach((rec, i) => {
      if (rec.categoryID === params.categoryID) {
        catRecs.push(rec);
      }
    })

    return (catRecs);
  }

  function submitForm(method: string, id: string, name: string, desc: string, ingredients?: string, steps?: string, author?: string) {
    var idSub;
    if (id === "assignID") {
      idSub = uuid();
    } else {
      idSub = id;
    }
    fetch('//localhost:3001/recipes', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryID: params.categoryID,
        id: idSub,
        name: name,
        desc: desc,
        ingredients: ingredients,
        steps: steps,
        author: author
      })
    }).then((res) => res.json())
      .then(data => {
        var recipes = JSON.parse(data);
        setRecipeList(recipes.recipes);
      })
      setOpenForm(false);
      setEditForm(false);
  }

  function editCard(id: string, name: string, desc: string, ingredients?: string, steps?: string, author?: string) {
    setEditID(id);
    setEditName(name);
    setEditDesc(desc);
    ingredients && setEditIngredients(ingredients);
    steps && setEditSteps(steps);
    author && setEditAuthor(author);
    setEditForm(true);
  }

  function deleteRecipe(id: string) {
    var delID = id;
    setDeleteCard(delID);
  }

  return (
    <div className="recList">
      {
        recipeList.map(recipe => {
          return <Card recipe={recipe} edit={editCard} deleteCard={deleteRecipe}/>
        })
      }
      <button onClick={() => setOpenForm(true)}>Create Recipe</button>
      {
        openForm && <div className='createForm'><Form type="recipe" submitForm={submitForm} cancelForm={() => setOpenForm(false)}/></div>
      }
      {
        editForm && <div className='createFormRecipe'><Form type="recipe" submitForm={submitForm} cancelForm={() => setEditForm(false)} id={editID} name={editName} desc={editDesc} ingredients={editIngredients} steps={editSteps} author={editAuthor}/></div>
      }
    </div>
  )
}