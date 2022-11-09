import { useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Tabs from '../../common/components/tabs/tabs';
import Title from '../../common/components/title/title';
import useTitle from '../../common/hooks/use-title';
import './auth.css';
import Login from './components/login/login';
import SignUp from './components/sign-up/sign-up';

function AuthPage() {
  useTitle('Cadastrar ou entrar');

  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className="auth__body page-body--center">
      <main className="auth__main rounded">
        <header className="auth__header rounded-top">
          <Title centralize withIcon />
        </header>
        <Tabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabs={[
            {
              icon: <LoginIcon />,
              name: 'Entrar',
              index: 0,
              children: <Login />,
            },
            {
              icon: <PersonAddIcon />,
              name: 'Criar conta',
              index: 1,
              children: <SignUp setTabIndex={setTabIndex} />,
            },
          ]}
        />
      </main>
    </div>
  );
}

export default AuthPage;
