import './category-item.styles.scss';

const CategoryItem = ({ category }) => {
  const { title, img } = category;
  return (
    <div className='category-container'>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className='category-body-container'>
        <div className='background-image' />
        <h1>{title}</h1>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
