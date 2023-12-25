import { SignOutLink } from '../sign-link/sign-out-link/sign-out-link';
import { SignInLink } from '../sign-link/sign-in-link/sign-in-link';
import { Logo } from '../logo/logo';

type PropsHeader = {
    authStatus: boolean;
}

export function Header({ authStatus }: PropsHeader) {
  return (
    <header className="page-header film-card__head">
      <Logo/>

      <ul className="user-block">
        {authStatus === true && (<SignOutLink/>)}
        {authStatus === false && (<SignInLink />)}
      </ul>
    </header>
  );
}
