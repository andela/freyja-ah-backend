module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Chisom',
        lastName: 'Chekwas',
        email: 'chekwas@gmail.com',
        userName: 'chekwas',
        gender: 'male',
        password: 'onwuchekwa',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Babatunde',
        lastName: 'Yakub',
        email: 'yakub@gmail.com',
        userName: 'tyakk',
        gender: 'male',
        password: 'password',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Chizindu',
        lastName: 'David',
        email: 'chizzy@gmail.com',
        userName: 'chizzy',
        gender: 'male',
        password: 'chizindu',
        role: 'trainer',
        isVerified: true
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
