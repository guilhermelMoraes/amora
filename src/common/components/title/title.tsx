import cx from 'classnames';

import './title.css';
import amoraIcon from './amora.png';

interface AppTitleProps {
  centralize?: boolean;
  withIcon?: boolean;
}

function Title({ centralize, withIcon }: AppTitleProps) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <h1
        className={cx('amora__title m-0 text-light', {
          'text-center': centralize,
        })}
      >
        AMORA
      </h1>
      {withIcon ? (
        <img src={amoraIcon} className="amora__icon ms-3" alt="AMORA" />
      ) : null}
    </div>
  );
}

export default Title;
