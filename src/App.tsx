import {Main} from './pages/Main';
import {PropsMain} from './pages/Main';

export type PropsApp = {
    paramsMain: PropsMain;
}

export function App({paramsMain}: PropsApp) {
  return (
    <Main {...paramsMain} />
  );
}
