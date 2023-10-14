import {Main} from "./pages/main-page";
import {propsMain} from './pages/main-page';

export type propsApp = {
    paramsMain: propsMain;
}

export function App({paramsMain}: propsApp) {
  return (
    <Main {...paramsMain} />
  );
}
