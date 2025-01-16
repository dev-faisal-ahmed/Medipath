import mongoose from 'mongoose';

import { MONGO_URI, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USER_PASSWORD } from '../app/config';
import { PROVIDER, USER_ROLE } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI!);

    const isSuperAdminExist = await User.findOne({ role: USER_ROLE.SUPER_ADMIN });
    if (isSuperAdminExist) throw new Error('Super Admin already exist');

    const superAdmin = await User.create({
      name: 'Md. Saidur Rahman',
      email: SUPER_ADMIN_EMAIL,
      provider: PROVIDER.CREDENTIALS,
      password: SUPER_ADMIN_USER_PASSWORD,
      role: USER_ROLE.SUPER_ADMIN,
    });

    if (!superAdmin) throw new Error('Failed to create super admin');
    console.log('Super Admin created successfully');
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

seedSuperAdmin();
