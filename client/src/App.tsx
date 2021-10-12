import { observer } from 'mobx-react-lite';
import { FC, useContext, useEffect, useState } from 'react';
import { ContextStore } from '.';
import { LoginForm } from './components/LoginForm';
import { IUser } from './models/user';
import { UserService } from './services/user-service';

export const App: FC = observer(() => {
  const { store } = useContext(ContextStore);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <button onClick={getUsers}>Загрузить список пользователей</button>
      </>
    );
  }

  return (
    <div>
      <h1>{`Пользователь авторизован ${store.user.email}`}</h1>

      <div>{!store.user.isActivated && `Подтвердите аккаунт`}</div>

      <button onClick={() => store.logout()}>Выйти</button>

      <button onClick={getUsers}>Загрузить список пользователей</button>

      <div>
        {users.map((user) => (
          <div key={user.email}>{user.email}</div>
        ))}
      </div>
    </div>
  );
});
