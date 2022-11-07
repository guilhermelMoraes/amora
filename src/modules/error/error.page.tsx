import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './error.css';

function ErrorPage() {
  const error = useRouteError();

  const errorDetails = isRouteErrorResponse(error) ? (
    <>
      <strong>{error.status}</strong> <span>{error.statusText}</span>
    </>
  ) : null;

  return (
    <div className="page-body--center error__wrapper">
      <main className="error rounded">
        <h1>Alguma coisa deu errado 😭</h1>
        {errorDetails}
      </main>
    </div>
  );
}

export default ErrorPage;
