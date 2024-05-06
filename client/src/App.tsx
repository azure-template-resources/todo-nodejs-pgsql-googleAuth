import { useEffect, useState } from 'react';
import './App.css';
import { getItems, addItem, deleteItem } from './client';
import { TodoItem } from './models';
import Profile from './profile';
import AuthenticationInstructionCard from './AuthenticationInstructionCard';
import AuthorizationInstructionCard from './AuthorizationInstructionCard';
import NextStepsInstructionCard from './NextStepsCard';

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [updateAttempted, setUpdateAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const response = await getItems();
      setIsLoading(false);
      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false);
      } else if (response.ok) {
        const items = await response.json() as TodoItem[];
        setItems(items);
        setIsAuthenticated(true);
      }
    }

    initialize();
  }, [])

  const addNewItem = async (description: string) => {
    setIsLoading(true);
    const response = await addItem(description);
    setIsLoading(false);
    setUpdateAttempted(true);

    if (response.ok) {
      const newItem = await response.json() as TodoItem;
      const newItemsList = [...items];
      newItemsList.push(newItem);
      setItems(newItemsList);
      setNewItem('');
      setIsAuthorized(true);
    } else if (response.status === 401 || response.status === 403) {
      setIsAuthorized(false);
    }
  }

  const callDeleteItem = async (id: number) => {
    setUpdateAttempted(true);
    setIsLoading(true);
    const response = await deleteItem(id);
    setIsLoading(false);
    if (response.ok) {
      setIsAuthorized(true);
      let updatedItemsList = [...items];
      const indexToDelete = items.findIndex(i => i.id === id);
      updatedItemsList.splice(indexToDelete, 1);
      setItems(updatedItemsList);
    } else {
      setIsAuthorized(false);
    }
  }

  const loginMessage = () => {
    if (!isAuthenticated) {
      return <h4 style={{ color: 'grey' }}>Please login</h4>;
    }
  }

  const noAccessMessage = () => {
    if (!isAuthorized && updateAttempted) {
      return <h4 style={{ color: 'grey' }}>You do not have permissions to update this list</h4>;
    }
  }

  const buttonText = () => {
    if (isLoading) {
      return <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>;
    }

    return 'Add';
  }

  const listItems = items.map((i) => {
    return <li className='list-group-item' key={i.id}>
      <button className='btn btn-light' onClick={() => callDeleteItem(i.id)}>X</button>
      <div>{i.description} </div>
    </li>
  });

  return (
    <div className="App">
      <Profile />

      <header>
        <h1>TODO List</h1>
      </header>
      <div>
        <div className="row align-items-start">
          <div className="col first-col">

            <section className="list-section">
              {loginMessage()}
              <ul className='list-group'>
                {listItems}
              </ul>
              <div className='form-section'>
                {noAccessMessage()}
                <input className='form-control'
                  type="text" value={newItem}
                  onChange={e => setNewItem(e.target.value)}
                  disabled={!isAuthenticated || (!isAuthorized && updateAttempted)}></input>

                <button
                  onClick={() => addNewItem(newItem)}
                  className='btn btn-primary'
                  disabled={!isAuthenticated || (!isAuthorized && updateAttempted)}>{buttonText()}</button>
              </div>
            </section>
          </div>
          <div className="col">
            <AuthenticationInstructionCard isAuthenticated={isAuthenticated} />
            <AuthorizationInstructionCard
              isAuthenticated={isAuthenticated}
              isAuthorized={isAuthorized}
              updateAttempted={updateAttempted} />
            <NextStepsInstructionCard
              isAuthenticated={isAuthenticated}
              isAuthorized={isAuthorized}
              updateAttempted={updateAttempted} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
