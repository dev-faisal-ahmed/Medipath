import mongoose from 'mongoose';

import { MONGO_URI, SUPER_ADMIN_USER_ID, SUPER_ADMIN_USER_PASSWORD } from '../app/config';
import { PROVIDER, USER_ROLE } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

async function seedSuperAdmin() {
  try {
    await mongoose.connect(MONGO_URI!);

    const isSuperAdminExist = await User.findOne({ role: USER_ROLE.SUPER_ADMIN });
    if (isSuperAdminExist) throw new Error('Super Admin already exist');

    const superAdmin = await User.create({
      name: 'Medipath Super Admin',
      userId: SUPER_ADMIN_USER_ID,
      password: SUPER_ADMIN_USER_PASSWORD,
      provider: PROVIDER.CREDENTIALS,
      role: USER_ROLE.SUPER_ADMIN,
    });

    if (!superAdmin) throw new Error('Failed to create super admin');
    console.log('Super Admin created successfully');
    console.log('User ID:', superAdmin.userId);
    console.log('Password:', SUPER_ADMIN_USER_PASSWORD);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
}

seedSuperAdmin();
