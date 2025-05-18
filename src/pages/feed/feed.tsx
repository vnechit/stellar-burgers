import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { ordersSelector, getFeedsThunk } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  const getFeeds = () => dispatch(getFeedsThunk());

  useEffect(() => {
    getFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
