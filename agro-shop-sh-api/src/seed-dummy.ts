import { AppDataSource } from './config/db.config';
import { Category } from './category/entities/category.entity';
import { User } from './user/entities/user.entity';
import { Tire } from './tire/entities/tire.entity';

type DummyTire = {
  category: string;
  addedByEmail: string;
  brand: string;
  width: string;
  height: string;
  diameter: string;
  price: number;
  description: string;
  imageUrl: string;
};

const categoryNames = [
  'All-Season',
  'Winter',
  'Summer',
  'Performance',
  'Off-Road',
];

const dummyUsers: Array<Partial<User>> = [
  {
    firstName: 'Raul',
    lastName: 'Pop',
    department: 'Sales',
    email: 'raul.pop@agromir-sh.ro',
    phone: '0743700470',
    role: 'agent',
  },
  {
    firstName: 'Ionut',
    lastName: 'Muresan',
    department: 'Sales',
    email: 'ionut.muresan@agromir-sh.ro',
    phone: '0744396161',
    role: 'agent',
  },
  {
    firstName: 'Andrei',
    lastName: 'Marin',
    department: 'Inventory',
    email: 'andrei.marin@agromir-sh.ro',
    phone: '0741112233',
    role: 'manager',
  },
  {
    firstName: 'Bianca',
    lastName: 'Dinu',
    department: 'Support',
    email: 'bianca.dinu@agromir-sh.ro',
    phone: '0744556677',
    role: 'support',
  },
];

const dummyTires: DummyTire[] = [
  {
    category: 'All-Season',
    addedByEmail: 'raul.pop@agromir-sh.ro',
    brand: 'Michelin',
    width: '800',
    height: '65',
    diameter: '32',
    price: 6900,
    description:
      'Anvelopa pentru tractor de putere mare, stare buna, uzura uniforma.',
    imageUrl: 'https://picsum.photos/seed/tire-1/1200/800',
  },
  {
    category: 'Summer',
    addedByEmail: 'ionut.muresan@agromir-sh.ro',
    brand: 'Mitas',
    width: '460',
    height: '70',
    diameter: '24',
    price: 1250,
    description: 'Model fiabil pentru lucrari sezoniere, aderenta buna pe uscat.',
    imageUrl: 'https://picsum.photos/seed/tire-2/1200/800',
  },
  {
    category: 'Off-Road',
    addedByEmail: 'andrei.marin@agromir-sh.ro',
    brand: 'Camso',
    width: '400',
    height: '70',
    diameter: '24',
    price: 700,
    description:
      'Potrivita pentru teren mixt si incarcatoare, fara taieturi majore.',
    imageUrl: 'https://picsum.photos/seed/tire-3/1200/800',
  },
  {
    category: 'Winter',
    addedByEmail: 'bianca.dinu@agromir-sh.ro',
    brand: 'Firestone',
    width: '540',
    height: '65',
    diameter: '30',
    price: 2400,
    description: 'Compus rezistent la temperaturi scazute, tractiune buna.',
    imageUrl: 'https://picsum.photos/seed/tire-4/1200/800',
  },
  {
    category: 'Performance',
    addedByEmail: 'raul.pop@agromir-sh.ro',
    brand: 'Continental',
    width: '520',
    height: '70',
    diameter: '38',
    price: 2650,
    description: 'Recomandata pentru eficienta si stabilitate in camp.',
    imageUrl: 'https://picsum.photos/seed/tire-5/1200/800',
  },
  {
    category: 'All-Season',
    addedByEmail: 'ionut.muresan@agromir-sh.ro',
    brand: 'Petlas',
    width: '600',
    height: '70',
    diameter: '34',
    price: 5000,
    description: 'Anvelopa versatila, randament bun pe drum si pe teren agricol.',
    imageUrl: 'https://picsum.photos/seed/tire-6/1200/800',
  },
];

async function seedDummyData() {
  await AppDataSource.initialize();

  const categoryRepository = AppDataSource.getRepository(Category);
  const userRepository = AppDataSource.getRepository(User);
  const tireRepository = AppDataSource.getRepository(Tire);

  const categoryMap = new Map<string, Category>();
  for (const name of categoryNames) {
    let category = await categoryRepository.findOne({ where: { name } });

    if (!category) {
      category = categoryRepository.create({ name });
      category = await categoryRepository.save(category);
    }

    categoryMap.set(name, category);
  }

  const userMap = new Map<string, User>();
  for (const userData of dummyUsers) {
    let user = await userRepository.findOne({ where: { email: userData.email } });

    if (!user) {
      user = userRepository.create(userData);
      user = await userRepository.save(user);
    }

    userMap.set(user.email, user);
  }

  let created = 0;
  for (const tireData of dummyTires) {
    const category = categoryMap.get(tireData.category);
    const addedBy = userMap.get(tireData.addedByEmail);

    if (!category || !addedBy) {
      continue;
    }

    const existing = await tireRepository.findOne({
      where: {
        brand: tireData.brand,
        width: tireData.width,
        height: tireData.height,
        diameter: tireData.diameter,
        price: tireData.price,
        category: { id: category.id },
        addedBy: { id: addedBy.id },
      },
      relations: ['category', 'addedBy'],
    });

    if (existing) {
      continue;
    }

    const tire = tireRepository.create({
      brand: tireData.brand,
      width: tireData.width,
      height: tireData.height,
      diameter: tireData.diameter,
      price: tireData.price,
      description: tireData.description,
      imageUrl: tireData.imageUrl,
      category,
      addedBy,
    });

    await tireRepository.save(tire);
    created += 1;
  }

  console.log(
    `Dummy seed complete: categories=${categoryMap.size}, users=${userMap.size}, new_tires=${created}`,
  );

  await AppDataSource.destroy();
}

seedDummyData().catch(async (error) => {
  console.error('Dummy seed failed:', error);
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  process.exit(1);
});