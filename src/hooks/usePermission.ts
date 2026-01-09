import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// import { PERMISSIONS } from '../utils/permissions';


export function usePermission() {
  const { user } = useContext(AuthContext);

  function can(permission: string): boolean {
    if (!user || !user.permissoes) {
      return false;
    }
    return user.permissoes.includes(permission);
  }

  return { can };
}
