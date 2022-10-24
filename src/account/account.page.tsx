import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Tabs from '../common/components/tabs/tabs';
import useTitle from '../common/hooks/use-title';
import './account.css';
import SignUpComponent from './sign-up/sign-up.component';

function AccountPage() {
  useTitle('Sign-up or login');

  return (
    <div className="account bg-dark">
      <main className="account__main rounded">
        <header className="account__header rounded-top">
          <h1 className="text-center text-light">AMORA</h1>
        </header>
        <Tabs
          tabs={[
            {
              icon: <PersonAddIcon />,
              name: 'Inscrever-se',
              index: 0,
              children: <SignUpComponent />,
            },
            {
              icon: <LoginIcon />,
              name: 'Conectar',
              index: 1,
              children: 'Login teste',
            },
          ]}
        />
      </main>
    </div>
  );
}

export default AccountPage;
