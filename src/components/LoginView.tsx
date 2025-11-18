import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: (username: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const getUsers = () => {
    try {
      const users = window.localStorage.getItem('financial-organizer-users');
      return users ? JSON.parse(users) : {};
    } catch {
      return {};
    }
  };

  const saveUsers = (users: any) => {
    window.localStorage.setItem('financial-organizer-users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('El usuario y la contraseña no pueden estar vacíos.');
      return;
    }

    const users = getUsers();

    if (isRegistering) {
      if (users[username]) {
        setError('Este nombre de usuario ya existe.');
      } else {
        const newUsers = { ...users, [username]: password };
        saveUsers(newUsers);
        onLogin(username);
      }
    } else {
      if (users[username] && users[username] === password) {
        onLogin(username);
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <i className="fa-solid fa-wallet text-5xl text-blue-500 mb-4"></i>
            <h1 className="text-3xl font-bold text-neutral-100">Organizador Financiero Pro</h1>
            <p className="text-neutral-400">Inicia sesión o crea un perfil para continuar</p>
        </div>

        <div className="bg-neutral-800 p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">{isRegistering ? 'Crear Perfil' : 'Iniciar Sesión'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-neutral-300">Nombre de Usuario</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full mt-1 p-3 bg-neutral-700 text-white border-2 border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        autoComplete="username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password"  className="block text-sm font-medium text-neutral-300">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mt-1 p-3 bg-neutral-700 text-white border-2 border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        autoComplete={isRegistering ? "new-password" : "current-password"}
                        required
                    />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                    {isRegistering ? 'Registrar y Entrar' : 'Entrar'}
                </button>
            </form>
            <p className="text-center text-sm text-neutral-400 mt-6">
                {isRegistering ? '¿Ya tienes un perfil?' : '¿No tienes un perfil?'}
                <button onClick={() => { setIsRegistering(!isRegistering); setError(''); }} className="font-semibold text-blue-400 hover:text-blue-300 ml-1">
                    {isRegistering ? 'Inicia sesión' : 'Crea uno'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};
