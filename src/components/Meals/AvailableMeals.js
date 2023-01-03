import classes from '../../styles/AvailableMeals.module.css';
import { DUMMY_MEALS } from '../../utils/dummy-data';
import Card from '../UI/Card';
import MealItem from './MealItem';

export default function AvailableMeals() {
    const mealsList = DUMMY_MEALS.map(meal => {
        return (
            <MealItem
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
}
