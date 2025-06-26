const userData = {
  name: 'TestName',
  email: 'test@test.test'
};

const signupData = {
  name: 'TestName',
  email: 'test@test.test',
  password: '123456'
};

const signinData = {
  email: 'test@test.test',
  password: '123456'
};

const ordersData = [
  {
    createdAt: '2025-05-18T23:43:47.436Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    name: 'Флюоресцентный люминесцентный бургер',
    number: 77731,
    status: 'done',
    updatedAt: '2025-05-18T23:43:48.132Z',
    _id: '682a70b3c2f30c001cb251a3'
  }
];

export { userData, signinData, signupData, ordersData };
