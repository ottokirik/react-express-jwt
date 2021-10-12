import { observer } from 'mobx-react-lite';
import { FC, useContext, useState } from 'react';
import { ContextStore } from '..';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(ContextStore);

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
      <button onClick={() => store.login(email, password)}>Логин</button>
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
    </div>
  );
});

export { LoginForm };
