const { messagesQueue } = require('../jobs/queues');
const request = require('../tests/request');
const config = require('../config');

const authTokenConfig = config.api.authToken;

describe('POST /notifications', () => {
  const URL = '/notifications';

  const validBody = {
    telegramChatId1: ['notification1', 'notification2'],
    telegramChatId2: ['notification3'],
  };

  describe('when the request is not authenticated', () => {
    it('returns a 401 status', () => {
      return request
        .post(URL)
        .send(validBody)
        .expect(401);
    });
  });

  describe('when the request is authenticated', () => {
    let messagesQueueAddSpy;

    beforeAll(() => {
      messagesQueueAddSpy = jest.spyOn(messagesQueue, 'add');
    });

    afterAll(() => messagesQueueAddSpy.mockRestore());

    it('returns a 204 status', () => {
      return request
        .post(URL)
        .send(validBody)
        .set(authTokenConfig.headerName, authTokenConfig.headerValue)
        .expect(204);
    });

    it('adds jobs to the messagesQueue', () => {
      expect(messagesQueueAddSpy).toHaveBeenCalledTimes(3);
      expect(messagesQueueAddSpy).toHaveBeenNthCalledWith(1, {
        chatId: 'telegramChatId1',
        notification: 'notification1',
      });
      expect(messagesQueueAddSpy).toHaveBeenNthCalledWith(2, {
        chatId: 'telegramChatId1',
        notification: 'notification2',
      });
      expect(messagesQueueAddSpy).toHaveBeenNthCalledWith(3, {
        chatId: 'telegramChatId2',
        notification: 'notification3',
      });
    });
  });
});
