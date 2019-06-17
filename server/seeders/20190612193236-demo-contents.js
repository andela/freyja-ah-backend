module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'Contents',
    [
      {
        name: 'speech',
        link: 'www.google.com',
        moduleId: 1
      },
      {
        name: 'speech',
        link: 'www.udemy.com',
        moduleId: 2
      },
      {
        name: 'speech',
        link: 'www.Articles.com',
        moduleId: 3
      },
      {
        name: 'speech',
        link: 'www.Articles.com',
        moduleId: 2
      },
      {
        name: 'speech',
        link: 'www.Articles.com',
        moduleId: 3
      },
      {
        name: 'speech',
        link: 'www.Articles.com',
        moduleId: 1
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Contents', null, {})
};
