import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Minta János', neptun: 'ABC123' },
    { id: 2, name: 'Emődi Máté', neptun: 'GT43W5' },
  ]);

  const [name, setName] = useState('');
  const [neptun, setNeptun] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !neptun) return alert("Kérlek tölts ki minden mezőt!");

    if (isEditing) {
      setStudents(students.map(stu => stu.id === currentId ? { ...stu, name, neptun } : stu));
      setIsEditing(false);
      setCurrentId(null);
    } else {
      setStudents([...students, { id: Date.now(), name, neptun }]);
    }
    setName('');
    setNeptun('');
  };

  const handleDelete = (id) => setStudents(students.filter(stu => stu.id !== id));

  const handleEdit = (stu) => {
    setIsEditing(true);
    setCurrentId(stu.id);
    setName(stu.name);
    setNeptun(stu.neptun);
  };

  return (
    <div className="App">
      <h1>Hallgatói Nyilvántartó</h1>
      
      <div className="card form-card">
        <h2>{isEditing ? 'Adatok Módosítása' : 'Új Hallgató'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Név" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="Neptun kód" value={neptun} onChange={e => setNeptun(e.target.value)} />
          <button className="btn-green">{isEditing ? 'Mentés' : 'Hozzáadás'}</button>
          {isEditing && <button type="button" onClick={() => {setIsEditing(false); setName(''); setNeptun('');}} className="btn-gray">Mégse</button>}
        </form>
      </div>

      <div className="card list-card">
        <h2>Hallgatók Listája</h2>
        {students.length === 0 ? <p>Nincs adat.</p> : (
          <ul>
            {students.map(stu => (
              <li key={stu.id}>
                <span><strong>{stu.name}</strong> ({stu.neptun})</span>
                <div>
                  <button onClick={() => handleEdit(stu)} className="btn-yellow">Szerkeszt</button>
                  <button onClick={() => handleDelete(stu.id)} className="btn-red">Törlés</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;