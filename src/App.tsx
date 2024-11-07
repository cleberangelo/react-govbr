import { AuthProvider } from './auth/AuthProvider';
import { HttpInterceptor } from './auth/HttpInterceptor';
import Routes from './route/Routes';

export const App = () => {
  return (
    <AuthProvider>
      <HttpInterceptor>
        <Routes />
      </HttpInterceptor>
    </AuthProvider>
  );
}
