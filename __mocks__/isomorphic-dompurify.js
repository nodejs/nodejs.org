const mock = {
  sanitize: jest.fn().mockImplementation(source => source),
};

module.exports = mock;
