import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Card.css';

interface Category {
  id: string,
  name: string;
  desc: string;
}

interface Recipe {
  categoryID: string,
  id: string,
  name: string,
  desc: string
  ingredients: string,
  steps: string,
  author: string
}

type Props = {
  category?: Category,
  recipe?: Recipe,
  edit: (id: string, name: string, desc: string, ingredients?: string, steps?: string, author?: string) => void,
  deleteCard: (id: string) => void,
};

export default function Card({category={"id":"0","name":"None","desc":"None"}, recipe={"categoryID":"0","id":"0","name":"","desc":"","ingredients":"","steps":"","author":""}, edit, deleteCard}: Props) {
  const type = (category.id !== '0') ? "category" : "recipe";
  const cardInfo = (type === "category" ? category : recipe);
  

  return (
    <div className="cardContainer">
      <h3>{cardInfo.name}</h3>
      <div className='actionIcons'>
        {type==="category" && <button onClick={() => edit(cardInfo.id, cardInfo.name, cardInfo.desc)}><FontAwesomeIcon icon={faEdit} /></button>}
        {type==="recipe" && <button onClick={() => edit(cardInfo.id, cardInfo.name, cardInfo.desc, recipe.ingredients, recipe.steps, recipe.author)}><FontAwesomeIcon icon={faEdit} /></button>}
        <button onClick={() => deleteCard(cardInfo.id)}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
      <a className='rightArrow' href={type === "recipe" ? "/recipes/" + cardInfo.id : cardInfo.id}><FontAwesomeIcon icon={faArrowRight}/></a>
      
      <p>{cardInfo.desc}</p>
    </div>
  )
}