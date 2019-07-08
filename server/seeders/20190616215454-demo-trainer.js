module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Chisom',
        lastName: 'Chekwas',
        email: 'chekwas@gmail.com',
        userName: 'Onwuchekwa',
        password: '$2b$06$EU3IB7fUiRUOFxFLlGBzHeI384UFRYGXy8aGG2Y3fE1rHPiFAlKuO',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Babatunde',
        lastName: 'Yakub',
        email: 'tyakk@gmail.com',
        userName: 'tyakk99',
        password: '$2b$06$K9ZUdnr.lRiL.lQQk9AjP.ZiJE6Ru0ZZMa0Baj02pVTa3cp9A49WK',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Chizindu',
        lastName: 'David',
        email: 'chizzy@gmail.com',
        userName: 'chizzy',
        password: '$2b$06$Rp.xh7j8aBfmGupDHowl6.9TKBcMW9HTEY7QR9tq8vNBEPvD7FGsO',
        role: 'trainer',
        isVerified: true
      },
      {
        firstName: 'Ochowo',
        lastName: 'Ikongbeh',
        email: 'ochowoikongbeh@gmail.com',
        userName: 'Ooche',
        password: '$2b$06$JtIgZj3HGCj.V48kb2/IB.iMUl99/V6jnD3OinANgwPgi2kFgqdwq',
        role: 'trainer',
        isVerified: true
      },

    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
