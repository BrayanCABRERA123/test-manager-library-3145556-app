const { useState, useEffect } = React;

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="error" role="alert">
      <strong>{error.message}</strong>
      {error.details?.length > 0 && (
        <ul>{error.details.map((d, i) => <li key={i}>{d.field}: {d.issue}</li>)}</ul>
      )}
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setError(null);
    try {
      const session = await api.login(username, password);
      api.token = session.access_token;
      onLogin(session);
    } catch (e) {
      setError(e);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Iniciar sesión</h2>
      <label>Usuario<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
      <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      <ErrorMessage error={error} />
      <button type="submit">Entrar</button>
    </form>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.categories().then(setCategories).catch(setError);
  }, []);

  return (
    <section className="card">
      <h2>Categorías</h2>
      <ErrorMessage error={error} />
      <ul className="tags">{categories.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
    </section>
  );
}

function CreateLibrarian() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [created, setCreated] = useState(null);
  const [error, setError] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setError(null);
    setCreated(null);
    try {
      setCreated(await api.createLibrarian(username, password));
      setUsername('');
      setPassword('');
    } catch (e) {
      setError(e);
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Dar de alta bibliotecario</h2>
      <label>Usuario<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
      <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
      <ErrorMessage error={error} />
      {created && <p className="ok">Bibliotecario «{created.username}» creado.</p>}
      <button type="submit">Crear</button>
    </form>
  );
}

function Members() {
  const [q, setQ] = useState('');
  const [result, setResult] = useState({ items: [], total: 0 });
  const [fullName, setFullName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [error, setError] = useState(null);

  function search(term) {
    api.members(term).then(setResult).catch(setError);
  }

  useEffect(() => search(''), []);

  async function create(event) {
    event.preventDefault();
    setError(null);
    try {
      await api.createMember(fullName, documentNumber);
      setFullName('');
      setDocumentNumber('');
      search(q);
    } catch (e) {
      setError(e);
    }
  }

  return (
    <section className="card">
      <h2>Socios ({result.total})</h2>
      <form onSubmit={create} className="row">
        <input placeholder="Nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input placeholder="Documento" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} required />
        <button type="submit">Crear socio</button>
      </form>
      <ErrorMessage error={error} />
      <input placeholder="Buscar por nombre o documento" value={q} onChange={(e) => { setQ(e.target.value); search(e.target.value); }} />
      <ul className="list">
        {result.items.map((m) => <li key={m.id}>{m.full_name} · {m.document_number}</li>)}
      </ul>
    </section>
  );
}

function App() {
  const [session, setSession] = useState(null);

  function logout() {
    api.token = null;
    setSession(null);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Manager Library</h1>
        {session && (
          <p>
            Rol: <strong>{session.role}</strong> · <button className="link" onClick={logout}>Cerrar sesión</button>
          </p>
        )}
      </header>

      {!session && <LoginForm onLogin={setSession} />}
      {session && <Categories />}
      {session && <Members />}
      {session?.role === 'admin' && <CreateLibrarian />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
