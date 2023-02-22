import { useState } from 'react';
import './App.css'
import data from"./contacts.json"


function App() {
  
  const [ contacts, setContacts ] = useState(data)
  const [shownContacts, setShownContacts ] = useState(contacts.slice(0, 5))

  const addRandom = () => {
    const randomIndex = Math.floor(Math.random() * (contacts.length - shownContacts.length));
    
    const unusedContacts = contacts.filter(contact => !shownContacts.includes(contact));
    
    const newContact = unusedContacts[randomIndex];
    
    const newArray = [...shownContacts, newContact];
    setShownContacts(newArray);
  }

  const sortContacts = () => {
    const sortedContacts = [...shownContacts].sort((a, b) => b.popularity - a.popularity);

    setShownContacts(sortedContacts);
  }

  const sortNames = () => {
    const sortedName = [...shownContacts].sort((a, b) => a.name.localeCompare(b.name));

    setShownContacts(sortedName);
  }

  const handleDelete = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id)

    const newShownContacts = shownContacts.filter((contact) => contact.id !== id)


    setContacts(newContacts);
    setShownContacts(newShownContacts);
  }
  

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandom}>Add Random contacts</button>
      <button onClick={sortContacts}>Sort by Popularity</button>
      <button onClick={sortNames}>Sort by Name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {shownContacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar && <p>🏆</p>}</td>
                <td>{contact.wonEmmy && <p>🏆</p>}</td>
                <td>
                  <button onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;