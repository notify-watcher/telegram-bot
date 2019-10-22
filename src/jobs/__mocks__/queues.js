function mockQueue() {
  return {
    add: jest.fn(),
  };
}

module.exports = {
  messagesQueue: mockQueue(),
};
