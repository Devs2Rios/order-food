import classes from '../../styles/Input.module.css';

const Input = props => {
    return <input className={classes.input} value={props.value} />;
};

export default Input;
