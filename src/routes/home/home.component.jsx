import Directory from '../../components/directory/directory.component';

import keyboard from '../../assets/categories-img/keyboard.jpg';
import switches from '../../assets/categories-img/switches.jpg';
import keycaps from '../../assets/categories-img/keycaps.jpg';
import mice from '../../assets/categories-img/mice.jpg';
import accessories from '../../assets/categories-img/acessories.jpg';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'Keyboards',
      imageUrl: keyboard,
    },
    {
      id: 2,
      title: 'Switches',
      imageUrl: switches,
    },
    {
      id: 3,
      title: 'Keycaps',
      imageUrl: keycaps,
    },
    {
      id: 4,
      title: 'Mice',
      imageUrl: mice,
    },
    {
      id: 5,
      title: 'Accessories',
      imageUrl: accessories,
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
