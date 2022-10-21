import useTitle from '../common/hooks/use-title';
import './sign-up.css';

function SignUpPage() {
  useTitle('Sign up');

  return (
    <div className="sign-up bg-dark">
      <main className="sign-up__main p-3 rounded bg-light">
        <h1 className="mb-3">AMORA</h1>
        <p className="fs-5">Crie uma nova conta</p>
      </main>
    </div>
  );
}

export default SignUpPage;
