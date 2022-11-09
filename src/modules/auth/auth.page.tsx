import { useRef, useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Slide from '@mui/material/Slide';

import Tabs from '../../common/components/tabs/tabs';
import Title from '../../common/components/title/title';
import useTitle from '../../common/hooks/use-title';
import './auth.css';
import Login from './components/login/login';
import SignUp from './components/sign-up/sign-up';
import ResetPassword from './components/reset-password/reset-password';

function AuthPage() {
  useTitle('Cadastrar ou entrar');
  const mainTag = useRef<null | HTMLElement>(null);

  const [resetPassword, setResetPassword] = useState(false);
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className="auth__body page-body--center">
      <main className="auth__main rounded" ref={mainTag}>
        <header className="auth__header rounded-top">
          <Title centralize withIcon />
        </header>
        <Slide
          direction="right"
          in={!resetPassword}
          container={mainTag.current}
          mountOnEnter
          unmountOnExit
        >
          <Tabs
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            tabs={[
              {
                icon: <LoginIcon />,
                name: 'Entrar',
                index: 0,
                children: <Login renderResetPassword={setResetPassword} />,
              },
              {
                icon: <PersonAddIcon />,
                name: 'Criar conta',
                index: 1,
                children: <SignUp setTabIndex={setTabIndex} />,
              },
            ]}
          />
        </Slide>
        <Slide
          direction="left"
          in={resetPassword}
          container={mainTag.current}
          mountOnEnter
          unmountOnExit
        >
          <ResetPassword closeResetPassword={setResetPassword} />
        </Slide>
      </main>
    </div>
  );
}

export default AuthPage;
