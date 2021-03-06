import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const AuthContext = createContext({
  signed: false,
  user: null,
  token: null,
});

const AppName = 'GreenDex';

export const AuthProvider = (props) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //FUNCAO QUE VERIFICA E CARREGA O USER E A TOKEN DO ASYNC STORAGE 
  //PARA EVITAR LOGAR MANUALMENTE NOVAMENTE
  async function loadStorageData() {
    const storageUser = await AsyncStorage.getItem(`@${AppName}:user`);
    const storageToken = await AsyncStorage.getItem(`@${AppName}:token`);

    if (storageUser && storageToken) {
      axios.defaults.headers.Authorization = `Bearer ${storageToken}`;
      setToken(storageToken)
      setUser(JSON.parse(storageUser));
      setLoading(false);
    } else {
      signOut();
      setLoading(false);
    }
  }

  // USE EFFECT VAZIO FAZ A FUNCAO COMPONENT DID MOUNT
  // PARA CARREGAR A FUNCAO DE BUSCAR OS DADOS DO ASYNC
  useEffect(() => {
    loadStorageData();
  }, []);

  async function signIn(userData) {

    //desestruturacao do userdata em 2 variaveis
    const { token, user } = userData;

    //seta o usuario no contexto
    setUser(user);
    setToken(token);

    //seta no axios o token que veio de resposta apos autenticacao
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    //seta no async storage as informacoes do user e token para quando fechar
    //aplicao saber que ja logou e nao precisar relogar toda a vez
    await AsyncStorage.setItem(
      `@${AppName}:user`,
      JSON.stringify(user),
    );
    await AsyncStorage.setItem(`@${AppName}:token`, token);

  }

  //FUNCAO DE LOGOUT PARA LIMPAR O ASYNC STORAGE E LIMPAR O USUARIO
  async function signOut() {
    //limpa async storage
    await AsyncStorage.removeItem(`@${AppName}:token`).then(() => {
      setToken(null);
    });
  }

  //encapsula o provider passando para os filhos os valores e funcoes abaixo
  return (
    <AuthContext.Provider
      value={{ signed: !!token, user, signIn, signOut, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

//cria um hook de autenticacao
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
