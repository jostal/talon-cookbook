import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Form from './Form';
import Card from './Card';
import './Categories.css';

interface Category {
  id: string;
  name: string;
  desc: string;
}

export default function Categories() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [deleteCard, setDeleteCard] = useState<string>('');
  const [editID, setEditID] = useState<string>('assignID');
  const [editName, setEditName] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');

  useEffect(() => {
    async function delCard() {
      await fetch('//localhost:3001/categories', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: deleteCard})
      });
      setDeleteCard("");
      getCategories();
    }

    if (deleteCard !== "") {
      delCard();
    }

    async function getCategories() {
      await fetch('//localhost:3001/categories')
      .then(res => res.json())
      .then(data => {
        var categories = JSON.parse(data);
        setCategoryList(categories.categories);
      });
    }
    getCategories();
  }, [categoryList, deleteCard])


  function submitForm(id: string, name: string, desc: string, method: string) {
    var idSub;
    if (id === "assignID") {
      idSub = uuid();
    } else {
      idSub = id;
    }
    fetch('//localhost:3001/categories', {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idSub,
        name: name,
        desc: desc,
      })
    }).then((res) => res.json())
      .then(data => {
        var categories = JSON.parse(data);
        setCategoryList(categories.categories);
      })
      setOpenForm(false);
      setEditForm(false);
  }

  function editCard(id: string, name: string, desc: string) {
    setEditID(id);
    setEditName(name);
    setEditDesc(desc);
    setEditForm(true);
  }

  function deleteCat(id: string) {
    var delID = id;
    setDeleteCard(delID);
  }

  return (
    <div className="catList">
      {
        categoryList.map(cat => {
          return <Card category={cat} edit={editCard} deleteCard={(deleteCat)}/>
        })
      }
      <button onClick={() => setOpenForm(true)}>Create Category</button>
      {
        openForm && <div className='createForm'><Form type="category" submitForm={submitForm} cancelForm={() => setOpenForm(false)}/></div>
      }
      {
        editForm && <div className='createForm'><Form type="category" submitForm={submitForm} cancelForm={() => setEditForm(false)} id={editID} name={editName} desc={editDesc}/></div>
      }
    </div>
  )
}