import classes from '../../styles/MealItem.module.css';
import MealItemForm from './MealItemForm';

export default function MealItem(props) {
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(props.price);
    return (
        <li className={classes.meal}>
            <div>
                <h5>{props.name}</h5>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm name={props.name} price={props.price} />
            </div>
        </li>
    );
}
