import Tabs from '../common/components/tabs/tabs';
import useTitle from '../common/hooks/use-title';
import './account.css';
import SignUpComponent from './sign-up/sign-up.component';

function AccountPage() {
  useTitle('Sign-up or login');

  return (
    <div className="sign-up bg-dark">
      <main className="sign-up__main p-3 rounded bg-light">
        <h1 className="text-center mb-3">AMORA</h1>
        <Tabs
          tabs={[
            {
              name: 'Sign-up',
              index: 0,
              children: <SignUpComponent />,
            },
            {
              name: 'Login',
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
