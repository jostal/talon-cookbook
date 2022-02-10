import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Form.css';

type Props = {
  type: string,
  id?: string
  name?: string,
  desc?: string,
  ingredients?: string,
  steps?: string,
  author?: string,
  submitForm: (method: string, id: string, name: string, desc: string, ingredients?: string, steps?: string, author?: string) => void,
  cancelForm: () => void,
}

export default function Form({id="assignID", type, submitForm, cancelForm, name="", desc="", ingredients="", steps="", author=""}: Props) {
  const [catName, setCatName] = useState<string>(name);
  const [catDesc, setCatDesc] = useState<string>(desc);
  const [recName, setRecName] = useState<string>(name);
  const [recDesc, setRecDesc] = useState<string>(desc);
  const [newIngredients, setIngredients] = useState(() =>
    EditorState.createWithContent(
      stateFromHTML(ingredients)
      )
  );
  const [newSteps, setSteps] = useState(() =>
  EditorState.createWithContent(
    stateFromHTML(steps)
    )
  );
  const [newAuthor, setAuthor] = useState<string>(author);
  const [ingredientHTML, setIngredientHTML] = useState<string>('');
  const [stepsHTML, setStepsHTML] = useState<string>('');

  useEffect(() => {
    setIngredientHTML(draftToHtml(convertToRaw(newIngredients.getCurrentContent())));
  }, [newIngredients])

  useEffect(() => {
    setStepsHTML(draftToHtml(convertToRaw(newSteps.getCurrentContent())));
  }, [newSteps])

  function returnCategoryForm() : React.ReactElement {
    return (
      <form>
        <label>Category Name</label>
        <input type="text" placeholder="Category Name" className='nameField' value={catName} onChange={(e) => setCatName(e.target.value)}></input>
        <label className='mt-desc'>Description</label>
        <textarea placeholder="Enter a description" className='descField' value={catDesc} onChange={(e) => setCatDesc(e.target.value)}></textarea>
        <div className='buttons'>
          {name === "" && <button type="button" className='submit' onClick={() => submitForm("PUT", id, catName, catDesc)}>Submit</button>}
          {name !== "" && <button type="button" className='submit' onClick={() => submitForm("PATCH", id, catName, catDesc)}>Submit</button>}
          <button type="button" className='cancel' onClick={() => cancelForm()}>Cancel</button>
        </div>
      </form>
    )
  }

  function returnRecipeForm() : React.ReactElement {
    return (
      <form>
        <label>Recipe Name</label>
        <input type="text" placeholder="Recipe Name" className='nameField' value={recName} onChange={(e) => setRecName(e.target.value)} />
        <label className='mt-desc'>Description</label>
        <textarea placeholder="Enter a description" className='descField' value={recDesc} onChange={(e) => setRecDesc(e.target.value)} />
        <label className="mt-desc">Ingredients</label>
        <Editor 
          editorState={newIngredients}
          onEditorStateChange={setIngredients}
          editorClassName='editorClass'
          wrapperClassName='wrapperClass'
          toolbar={{
            options: ['inline', 'list', 'textAlign'],
          }}
        />
        <label className="mt-desc">Steps</label>
        <Editor 
          editorState={newSteps}
          onEditorStateChange={setSteps}
          wrapperClassName='wrapperClass'
          editorClassName='editorClass'
          toolbar={{
            options: ['inline', 'list', 'textAlign'],
          }}
        />
        <label className='mt-desc'>Author</label>
        <input type="text" placeholder='Author Name' className='nameField' value={newAuthor} onChange={(e) => setAuthor(e.target.value)} />
        <div className='buttons'>
          {name === "" && <button type="button" className='submit' onClick={() => submitForm("PUT", id, recName, recDesc, ingredientHTML, stepsHTML, newAuthor)}>Submit</button>}
          {name !== "" && <button type="button" className='submit' onClick={() => submitForm("PATCH", id, recName, recDesc, ingredientHTML, stepsHTML, newAuthor)}>Submit</button>}
          <button type="button" className='cancel' onClick={() => cancelForm()}>Cancel</button>
        </div>
      </form>
    )
  }

  return (
    <div>
      {type === "category" && returnCategoryForm()}
      {type === "recipe" && returnRecipeForm()}
    </div>
  )
}