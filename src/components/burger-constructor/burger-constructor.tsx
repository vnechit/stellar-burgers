import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  constructorBunSelector,
  constructorIngridientsSelector,
  isOrderLoadingSelector,
  postOrder,
  singleOrderSelector,
  userSelector,
  clearSingleOrderState
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun: useSelector(constructorBunSelector),
    ingredients: useSelector(constructorIngridientsSelector)
  };
  const orderRequest = useSelector(isOrderLoadingSelector);
  const orderModalData = useSelector(singleOrderSelector);
  const user = useSelector(userSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');

    dispatch(
      postOrder([
        constructorItems.bun?._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun?._id
      ])
    );
  };
  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearConstructor());
    dispatch(clearSingleOrderState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
