import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Dispatch, SetStateAction, useState } from 'react';

import Tabs from '../common/components/tabs/tabs';
import useTitle from '../common/hooks/use-title';
import './account.css';
import LoginComponent from './login/login.component';
import SignUpComponent from './sign-up/sign-up.component';

type CommonTabsProps = {
  setTabIndex: Dispatch<SetStateAction<number>>;
};

function AccountPage() {
  useTitle('Cadastrar ou entrar');
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className="page-body bg-dark">
      <main className="account__main rounded">
        <header className="account__header rounded-top">
          <h1 className="text-center text-light">AMORA</h1>
        </header>
        <Tabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          tabs={[
            {
              icon: <LoginIcon />,
              name: 'Entrar',
              index: 0,
              children: <LoginComponent />,
            },
            {
              icon: <PersonAddIcon />,
              name: 'Criar conta',
              index: 1,
              children: <SignUpComponent setTabIndex={setTabIndex} />,
            },
          ]}
        />
      </main>
    </div>
  );
}

export default AccountPage;
export type { CommonTabsProps };
