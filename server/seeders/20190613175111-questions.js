/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Questions',
    [
      {
        question: 'Anyone who uses a service is a ________?',
        options: ['Supplier', 'Customer', 'Supervisor', 'Business partner'],
        answer: 'Customer',
        testId: 1
      },
      {
        question: 'Regular day-to-day, traditional customers are generally called?',
        options: ['Internal customers', 'Competitors', 'Colleagues', 'External Customers'],
        answer: 'Internal customers',
        testId: 1
      },
      {
        question: 'A colleague looking for information would be considered an internal customer?',
        options: ['True', 'False'],
        answer: 'True',
        testId: 1
      },
      {
        question:
            '_________ is any action you take to ensure that a customer is pleased with the transaction on a long-term basis?',
        options: [
          'Point of sale',
          'Customer service',
          'Customer retention',
          'Business essentials'
        ],
        answer: 'Customer service',
        testId: 1
      },
      {
        question: 'When is the best time to provide great customer service?',
        options: ['At the point of sale', 'Pre-sale', 'After sales service', 'All of the above'],
        answer: 'All of the above',
        testId: 1
      },
      {
        question: 'A security guard in your office can affect external customer service?',
        options: ['True', 'False'],
        answer: 'True',
        testId: 1
      },
      {
        question:
            'A good service encounter will get the most stories than a poor service encounter?',
        options: ['True', 'False'],
        answer: 'False',
        testId: 1
      },
      {
        question: 'Who is more important??',
        options: ['Internal customer', 'External customer', 'All of the above'],
        answer: 'All of the above',
        testId: 1
      },
      {
        question: 'The result of poor customer service is?',
        options: ['Company growth', 'Loss of customers', 'Staff growth', 'All of the above'],
        answer: 'Loss of customers',
        testId: 1
      },
      {
        question: 'People spend more for the same product with better service?',
        options: ['True', 'False'],
        answer: 'True',
        testId: 1
      },

      {
        question:
            'Appearance is not important with businesses that do not have face to face interactions with customers.',
        options: ['True', 'False'],
        answer: 'False',
        testId: 2
      },
      {
        question: 'A security guard in your office can affect external customer service?',
        options: ['True', 'False'],
        answer: 'True',
        testId: 2
      },
      {
        question: 'Which is not a good way to keep energized at work?',
        options: ['Humor', 'Good breakfast', 'Plug into others', 'Quick nap under your desk'],
        answer: 'Quick nap under your desk',
        testId: 2
      },
      {
        question:
            'Viewing a negative situation as a training session or a learning experience is a great way to_________?',
        options: ['Be irritated', 'Belittle a coworker', 'Skip work', 'Stay positive'],
        answer: 'Stay positive',
        testId: 2
      },
      {
        question: 'It is better to show faux positivity than to show negativity.',
        options: ['True', 'False'],
        answer: 'True',
        testId: 2
      },
      {
        question: '_______ is the odd one ',
        options: ['Policies', 'Procedures', 'Practices', 'People'],
        answer: 'Procedures',
        testId: 2
      },
      {
        question:
            '“The issue” should be said instead of “your issue” when addressing customer complaint',
        options: ['True', 'False'],
        answer: 'True',
        testId: 2
      },
      {
        question:
            'Which of the following phrases is a customer appropriate alternate to “I don’t know”?',
        options: [
          'I’m sorry, I can’t answer that question”',
          'I wish I could tell you”',
          '“I have no idea”',
          '“That is a good question, let me check and find out”'
        ],
        answer: '“That is a good question, let me check and find out”',
        testId: 2
      },
      {
        question:
            'An information given to a customer must be accurate, complete and ___________?',
        options: ['Permissible', 'Appropriate', 'Popular', 'None of the above'],
        answer: 'Appropriate',
        testId: 2
      },
      {
        question:
            'Usually you have to ask customer questions to get the information you require because... ',
        options: [
          'Customers don’t know what information you need',
          'Customers are not as knowledgeable about certain products as you are',
          'Customers don’t realize there are several models with several different features',
          'All of the above'
        ],
        answer: 'All of the above',
        testId: 2
      },
      {
        question: 'Staying energized may mean that you will do the following except?',
        options: [
          'Listen to up-beat music',
          'Try to stay humorous',
          'Take a walk home and back',
          'Drink a glass of cold water'
        ],
        answer: 'Take a walk home and back',
        testId: 2
      },
      {
        question:
            '_________ interactions provide a great opportunity to build rapport with customers.',
        options: ['Fewer', 'In-person', 'Follow-up', 'Medieval'],
        answer: 'Follow-up',
        testId: 3
      },
      {
        question:
            'When you talk to a customer in person, you get constant ___________, both verbal and nonverbal.',
        options: ['Feedback', 'Aggravation', 'Complaints', 'Crying'],
        answer: 'Feedback',
        testId: 3
      },
      {
        question:
            'While speaking with a customer over the phone you can slouch in your chair because the customer cannot see you',
        options: ['True', 'False'],
        answer: 'False',
        testId: 3
      },
      {
        question:
            'No matter how urgent the work you are doing is, you have enough _________ to speak to the customer.',
        options: ['Guts', 'Time', 'Knowledge', 'Nerve'],
        answer: 'Time',
        testId: 3
      },
      {
        question:
            'Since social media is basically an informal platform, you can be sarcastic when in a conversation with a customer',
        options: ['True', 'False'],
        answer: 'False',
        testId: 3
      },
      {
        question: ' E-mails should be responded to within __________ max.',
        options: ['48 hours', '50 hours', '24 hours', 'All of the above'],
        answer: '24 hours',
        testId: 3
      },
      {
        question: 'Positive reframing while composing text is important because ',
        options: [
          'It helps in building rapport with customer',
          'It shows professionalism',
          'It shows you value the customer',
          'All of the above'
        ],
        answer: 'All of the above',
        testId: 3
      },
      {
        question:
            ' The way you conduct yourself in the presence of a customer may well have more impact on their________ in you more than anything you say to them.',
        options: ['Confidence', 'Mistrust', 'Antitrust', 'Confidentiality'],
        answer: 'Confidence',
        testId: 3
      },
      {
        question: 'Tone of voice is applicable in all service touch points',
        options: ['True', 'False'],
        answer: 'True',
        testId: 3
      },
      {
        question: ' Effective After Sale follow up can __________',
        options: [
          'Retain existing customers',
          'Attract referral customers from original customer',
          'Show where a product or service requires improvement',
          'All of the above'
        ],
        answer: 'All of the above',
        testId: 3
      },
      {
        question:
            'One easy way to ensure repeat business from any customer is to make them feel________?',
        options: [
          'Low and un appreciated',
          'Respected and Appreciated',
          'Sorry for themselves',
          'Old and Out-of-date'
        ],
        answer: 'Respected and Appreciated',
        testId: 4
      },
      {
        question: 'One sure fix to get an angry customer to calm down is to?',
        options: [
          'Tell them to “calm down”',
          'Allow them vent',
          ' Leave them unattended to',
          'All of the above'
        ],
        answer: 'Tell them to “calm down”',
        testId: 4
      },
      {
        question: 'Which of the following is a way to deal with a Knowledgeable customer',
        options: [
          'Be dishonest about product price',
          'features and benefits',
          'Delve into competitors’ product price and features you know nothing about',
          'Be unwilling to get information on the product/service you are not updated on',
          'None of the above'
        ],
        answer: 'features and benefits',
        testId: 4
      },
      {
        question:
            'You should ignore every other customer the moment a “professional customer” needs your attention',
        options: ['Yes', 'No'],
        answer: 'No',
        testId: 4
      },
      {
        question: 'You should do the following when attending to a young customer except',
        options: [
          'Educate them on their choice of product',
          ' Guide them on products or service features and usage',
          'Alienate them in the purchasing decision when they are with people older',
          'Make them feel welcome whenever they come to get a product/service'
        ],
        answer: 'Alienate them in the purchasing decision when they are with people older',
        testId: 4
      },
      {
        question: 'A complaint is an expression of dissatisfaction with a situation',
        options: ['True', 'False'],
        answer: 'True',
        testId: 5
      },
      {
        question:
            'How customer complaints are handled reflects on you and your organization in terms of',
        options: [
          'Value placed on the customer',
          'Image of the Organization',
          'Value and Image of Products & Services',
          'All of the above'
        ],
        answer: 'All of the above',
        testId: 5
      },
      {
        question: 'One of the following is not a source of complaint',
        options: [
          'A product or service is faulty and does not function correctly',
          'Wrong commitments or lack of service',
          'Product/service efficiency and organizational responsiveness',
          'Substandard product performance through breakdown of either a part or the entire product'
        ],
        answer: 'Product/service efficiency and organizational responsiveness',
        testId: 5
      },
      {
        question: 'Turning a complaint around requires you do which of the following?',
        options: [
          'Look for early warning signals',
          'Value the customer’s concerns',
          'Offer Solutions and alternatives',
          'All of the above'
        ],
        answer: 'All of the above',
        testId: 5
      },
      {
        question:
            'Of all customer queries, which has the most potential for customer loyalty or loss',
        options: ['Requests', 'Complaints', 'Enquiries', 'All of the above'],
        answer: 'Complaints',
        testId: 5
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Questions', null, {})
};
