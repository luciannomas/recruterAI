import connectDB from '../lib/mongodb';
import User from '../models/User';

const superadmins = [
  {
    name: 'Luciano Mastrangelo',
    email: 'luciano.mastran@gmail.com',
    password: 'Admin2024!', // Cambiar en producción
    role: 'superadmin',
    active: true,
  },
  {
    name: 'Gerencia CAP',
    email: 'gerencia@cap.hn',
    password: 'Gerencia2024!', // Cambiar en producción
    role: 'superadmin',
    active: true,
  },
];

async function seedUsers() {
  try {
    console.log('🌱 Iniciando seed de superadmins...\n');

    await connectDB();

    for (const adminData of superadmins) {
      const existingUser = await User.findOne({ email: adminData.email });

      if (existingUser) {
        console.log(`⏭️  Usuario ya existe: ${adminData.email}`);
        continue;
      }

      const user = await User.create(adminData);
      console.log(`✅ Superadmin creado: ${user.email}`);
      console.log(`   Nombre: ${user.name}`);
      console.log(`   Password temporal: ${adminData.password}\n`);
    }

    console.log('\n✅ Seed de superadmins completado!');
    console.log('\n🔐 IMPORTANTE: Cambia las contraseñas al primer login!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error);
    process.exit(1);
  }
}

seedUsers();

