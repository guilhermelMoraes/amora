import Navbar from '../../common/components/navbar/navbar';
import './dashboard.css';

import useTitle from '../../common/hooks/use-title';

function DashboardPage() {
  useTitle('Página principal');

  return (
    <>
      <Navbar />
      <div className="dashboard page-body--center">teste</div>
    </>
  );
}

export default DashboardPage;
