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
      img: keyboard,
    },
    {
      id: 2,
      title: 'Switches',
      img: switches,
    },
    {
      id: 3,
      title: 'Keycaps',
      img: keycaps,
    },
    {
      id: 4,
      title: 'Mice',
      img: mice,
    },
    {
      id: 5,
      title: 'Accessories',
      img: accessories,
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
