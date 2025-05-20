import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../..//services/store';
import { userSelector } from '@slices';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelector)?.name;
  return <AppHeaderUI userName={userName} />;
};
