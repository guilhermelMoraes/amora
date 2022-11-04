import { User as FirebaseUser } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Tabs from '../../common/components/tabs/tabs';
import Title from '../../common/components/title/title';
import useTitle from '../../common/hooks/use-title';
import './account.css';
import Login from './login/login';
import SignUp from './sign-up/sign-up';

function AccountPage() {
  useTitle('Cadastrar ou entrar');

  const navigate = useNavigate();
  const userLoggedIn = useLoaderData() as () => Promise<FirebaseUser | null>;
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    const redirectAuthenticatedUser = async () => {
      const user = await userLoggedIn();
      if (user) {
        navigate('/');
      }
    };

    redirectAuthenticatedUser();
  }, []);

  return (
    <div className="account__body page-body">
      <main className="account__main rounded">
        <header className="account__header rounded-top">
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

export default AccountPage;
