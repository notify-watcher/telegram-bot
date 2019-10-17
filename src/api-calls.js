function getServices() {
  return Promise.resolve([
    {
      id: 'github-id',
      name: 'GitHub',
    },
    {
      id: 'gtd-id',
      name: 'GTD',
    },
    {
      id: 'vtr-id',
      name: 'VTR',
    },
  ]);
}

module.exports = {
  getServices,
};
