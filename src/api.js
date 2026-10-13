// Cliente HTTP de la API. Todo error llega con el cuerpo único { code, message, details } (api-contract.md §1).
const api = {
  token: null,

  async request(method, path, body) {
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (api.token) {
      headers.Authorization = `Bearer ${api.token}`;
    }

    const response = await fetch(`${window.APP_CONFIG.apiUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const data = response.status === 204 ? null : await response.json();
    if (!response.ok) {
      throw data ?? { code: 'HTTP_ERROR', message: 'No se pudo completar la operación.', details: [] };
    }

    return data;
  },

  login: (username, password) => api.request('POST', '/auth/login', { username, password }),
  categories: () => api.request('GET', '/categories'),
  createLibrarian: (username, password) => api.request('POST', '/users', { username, password, role: 'librarian' }),
  members: (q) => api.request('GET', `/members?q=${encodeURIComponent(q)}&size=50`),
  createMember: (full_name, document_number) => api.request('POST', '/members', { full_name, document_number }),
};

window.api = api;
