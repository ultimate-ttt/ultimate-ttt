import { rest } from 'msw';
import { getApiUrl } from '../../lib';

function uuidv4() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const handlers = [
  rest.post(getApiUrl(), async (req, res, ctx) => {
    return res(ctx.status(200), ctx.body(uuidv4()));
  }),
];
export { handlers };
