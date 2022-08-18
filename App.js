import AppNavigation from './navigation/AppNavigation';
import { FavoriteProvider } from './context';

export default function App() {
  return (
    <FavoriteProvider>
      <AppNavigation />
    </FavoriteProvider>
  );
}
