import User from '~/server/models/User';
import { validateUser } from '~/server/helpers';

export default defineEventHandler(async (event) => {
  const user = await validateUser(event);
  const body = await readBody(event);
  await User.findByIdAndUpdate(user._id, {
    $set: {
      image: body.image,
      name: body.name,
      birthday: body.birthday,
      phone: body.phone,
      gender: body.gender,
    },
  });

  return {
    success: 'Update profile successfully'
  }
});
