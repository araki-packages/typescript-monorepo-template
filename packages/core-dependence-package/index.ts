import axios from 'axios';
import AxiosMock from 'axios-mock-adapter';

const mock = new AxiosMock(axios);
mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});
