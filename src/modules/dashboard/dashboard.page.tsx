import Navbar from '../../common/components/navbar/navbar';

import useTitle from '../../common/hooks/use-title';

function DashboardPage() {
  useTitle('Página principal');

  return <Navbar />;
}

export default DashboardPage;
