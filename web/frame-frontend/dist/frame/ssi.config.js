window.ssi = {
  selectedNginxStrategyId: 6, // manually change this to see browser results
  testIssues: false, // set true to use different overrides
  strategyMap: {
    1: 'scss',
    2: 'cascading',
    3: 'cascading',
    4: 'cascading',
    5: 'cascading',
    6: 'cascading'
  },
  strategies: [
    {
      cssStrategy: 'scss',
      requestCssFiles: [
        {
          hierarchy: ['group', 'instance'],
          id: 'headerIdInstance'
        }
      ]
    },
    {
      cssStrategy: 'cascading',
      requestCssFiles: [
        {
          hierarchy: [],
          id: 'headerIdProfile'
        },
        {
          hierarchy: ['group'],
          id: 'headerIdGroup'
        },
        {
          hierarchy: ['group', 'instance'],
          id: 'headerIdInstance'
        }
      ]
    }
  ],
  group: 'my-group',
  instance: 'my-instance',
  overrides: {
    nginxStrategyId2: {
      instance: 'inst' // enforced instance in nginx by keyword
    },
    nginxStrategyId6: {
      instance: 'instance-will-be-enforced' // enforced instance in nginx by strict pattern
    }
  },
  overridesToTestIssues: {
    nginxStrategyId1: {
      group: 'my-fake-group',
      // instance: 'whatever'
      // instance: 'whatever/my-instance'
      instance: 'whatever/my-fake-instance'
    },
    nginxStrategyId2: {
      group: 'my-fake-group',
      // instance: 'inst' // enforced instance in nginx by keyword
      // instance: 'inst/my-instance'
      instance: 'inst/my-fake-instance'
    },
    nginxStrategyId3: {
      group: 'my-fake-group',
      instance: 'my-fake-instance'
    },
    nginxStrategyId4: {
      group: 'my-fake-group',
      instance: 'my-fake-instance'
    },
    nginxStrategyId5: {
      group: 'my-fake-group',
      instance: 'my-fake-instance'
    },
    nginxStrategyId6: {
      group: 'my-fake-group',
      instance: 'instance-will-be-enforced' // enforced instance in nginx by strict pattern
    }
  }
};
