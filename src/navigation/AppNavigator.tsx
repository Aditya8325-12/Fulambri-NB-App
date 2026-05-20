import AuthNavigator from './AuthNavigator';
import UserNavigator from './user_navigation/UserNavigator';

const AppNavigator = ({ role }: { role: string }) => {
  switch (role) {
    case 'USER':
      return <UserNavigator />;
    default:
      return <AuthNavigator />;
  }
};

export default AppNavigator;
