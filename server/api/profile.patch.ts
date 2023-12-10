import { User } from '~/server/models/User';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const body = await readBody(event);
  await User.findByIdAndUpdate(user._id, {
    $set: {
      name: body.name,
      birthday: body.birthday,
      phone: body.phone,
    },
  });
  return true;
});
