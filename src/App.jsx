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
      {session?.role === 'admin' && <CreateLibrarian />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
