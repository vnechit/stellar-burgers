import reducer, { initialUserState } from '../userSlice';
import {
  userData,
  signinData,
  signupData,
  ordersData
} from './mockData/userSliceData';
import {
  tryRegisterUser,
  tryLogInUser,
  tryLogOutUser,
  tryGetUser,
  tryUpdateUser,
  getUserOrders
} from '@slices';

describe('Тестирование userSlice reducer', () => {
  describe('Тестирование регистрации', () => {
    test('tryRegisterUser.pending', () => {
      const newState = reducer(
        initialUserState,
        tryRegisterUser.pending('pending', signupData)
      );
      expect(newState.isLoading).toBeTruthy();
    });

    test('tryRegisterUser.rejected', () => {
      const newState = reducer(
        initialUserState,
        tryRegisterUser.rejected(
          new Error('error during signin up'),
          'rejected',
          signupData
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during signin up');
    });

    test('tryRegisterUser.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        tryRegisterUser.fulfilled(userData, 'fullfilled', signupData)
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.user).toEqual(userData);
    });
  });

  describe('Тестирование логина', () => {
    test('tryLogInUser.pending', () => {
      const newState = reducer(
        initialUserState,
        tryLogInUser.pending('pending', signinData)
      );
      expect(newState.isLoading).toBeTruthy();
    });

    test('tryLogInUser.rejected', () => {
      const newState = reducer(
        initialUserState,
        tryLogInUser.rejected(
          new Error('error during signin in'),
          'rejected',
          signinData
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during signin in');
    });

    test('tryLogInUser.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        tryLogInUser.fulfilled(userData, 'fullfilled', signinData)
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.user).toEqual(userData);
    });
  });

  describe('Тестирование логаута', () => {
    test('tryLogOutUser.pending', () => {
      const newState = reducer(
        initialUserState,
        tryLogOutUser.pending('pending')
      );
      expect(newState.isLoading).toBeTruthy();
    });

    test('tryLogOutUser.rejected', () => {
      const newState = reducer(
        initialUserState,
        tryLogOutUser.rejected(
          new Error('error during logging out'),
          'rejected'
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during logging out');
    });

    test('tryLogOutUser.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        tryLogOutUser.fulfilled(undefined, 'fullfilled')
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.user).toBeNull();
    });
  });

  describe('Тестирование получения данных юзера', () => {
    test('tryGetUser.pending', () => {
      const newState = reducer(initialUserState, tryGetUser.pending('pending'));
      expect(newState.isLoading).toBeTruthy();
    });

    test('tryGetUser.rejected', () => {
      const newState = reducer(
        initialUserState,
        tryGetUser.rejected(new Error('error during getting user'), 'rejected')
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during getting user');
    });

    test('tryGetUser.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        tryGetUser.fulfilled(
          {
            success: true,
            user: userData
          },
          'fullfilled'
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.user).toEqual(userData);
    });
  });

  describe('Тестирование обновления данных юзера', () => {
    test('tryUpdateUser.pending', () => {
      const newState = reducer(
        initialUserState,
        tryUpdateUser.pending('pending', userData)
      );
      expect(newState.isLoading).toBeTruthy();
    });

    test('tryUpdateUser.rejected', () => {
      const newState = reducer(
        initialUserState,
        tryUpdateUser.rejected(
          new Error('error during updating user'),
          'rejected',
          userData
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during updating user');
    });

    test('tryUpdateUser.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        tryUpdateUser.fulfilled(
          {
            success: true,
            user: userData
          },
          'fullfilled',
          userData
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.user).toEqual(userData);
    });
  });

  describe('Тестирование получения заказов юзера', () => {
    test('getUserOrders.pending', () => {
      const newState = reducer(
        initialUserState,
        getUserOrders.pending('pending')
      );
      expect(newState.isLoading).toBeTruthy();
    });

    test('getUserOrders.rejected', () => {
      const newState = reducer(
        initialUserState,
        getUserOrders.rejected(
          new Error('error during getting user orders'),
          'rejected'
        )
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.error).toEqual('error during getting user orders');
    });

    test('getUserOrders.fulfilled', () => {
      const newState = reducer(
        initialUserState,
        getUserOrders.fulfilled(ordersData, 'fullfilled')
      );
      expect(newState.isLoading).toBeFalsy();
      expect(newState.orders).toEqual(ordersData);
    });
  });
});
