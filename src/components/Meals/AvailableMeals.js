import { useContext } from 'react';
import classes from '../../styles/AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem';
import { DataContext } from '../../store/data-context';
import ErrorMsg from '../UI/ErrorMsg';

export default function AvailableMeals() {
    const { meals, loading, errorMessage } = useContext(DataContext);
    const mealsList = meals.map((meal, i) => {
        return (
            <MealItem
                key={`meal-${i}`}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });
    return (
        <section className={classes.meals}>
            <Card>
                {
                    loading && !meals && !errorMessage ? <p>Loading...</p> :
                        !loading && meals && !errorMessage ?
                            <ul>{mealsList}</ul>
                            :
                            <ErrorMsg message={errorMessage || 'No meals found!'} />
                }
            </Card>
        </section>
    );
}
