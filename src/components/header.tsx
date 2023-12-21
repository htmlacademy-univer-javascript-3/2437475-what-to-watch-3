import { SignOutLink } from './sign-out-link';
import { SignInLink } from './sign-in-link';
import { Logo } from './logo';

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
