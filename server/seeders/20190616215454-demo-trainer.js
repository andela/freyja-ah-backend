module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Chisom',
        lastName: 'Chekwas',
        email: 'chekwas@gmail.com',
        userName: 'Onwuchekwa',
        gender: 'male',
        password: '$2b$06$EU3IB7fUiRUOFxFLlGBzHeI384UFRYGXy8aGG2Y3fE1rHPiFAlKuO',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Babatunde',
        lastName: 'Yakub',
        email: 'tyakk@gmail.com',
        userName: 'tyakk99',
        gender: 'male',
        password: '$2b$06$K9ZUdnr.lRiL.lQQk9AjP.ZiJE6Ru0ZZMa0Baj02pVTa3cp9A49WK',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Chizindu',
        lastName: 'David',
        email: 'chizzy@gmail.com',
        userName: 'chizzy',
        gender: 'male',
        password: '$2b$06$Rp.xh7j8aBfmGupDHowl6.9TKBcMW9HTEY7QR9tq8vNBEPvD7FGsO',
        role: 'trainer',
        isVerified: true
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
