import classes from '../../styles/Header.module.css';
import mealsImage from '../../assets/images/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

export default function Header() {
    return (
        <>
            <header className={classes.header}>
                <h1>SuperMeals</h1>
                <HeaderCartButton />
            </header>
            <div className={classes['main-image']}>
                <img alt='Meals on the table' src={mealsImage} />
            </div>
        </>
    );
}
