import Directory from './components/directory/directory.component';

import keyboard from './categories-img/keyboard.jpg';
import switches from './categories-img/switches.jpg';
import keycaps from './categories-img/keycaps.jpg';
import mice from './categories-img/mice.jpg';
import accessories from './categories-img/acessories.jpg';

const App = () => {
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

  return <Directory categories={categories} />;
};

export default App;
