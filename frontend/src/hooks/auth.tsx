import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

interface User {
  codigo: string;
  name: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: object;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Portifolio:token");
    const user = localStorage.getItem("@Portifolio:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const result = await api.post('sessions', {
      email, senha
    });
    const { token, user } = result.data;

    localStorage.setItem('@Portifolio:token', token);
    localStorage.setItem('@Portifolio:user', JSON.stringify(user));

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    const token = localStorage.getItem("@Portifolio:token");
    const user = localStorage.getItem("@Portifolio:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
