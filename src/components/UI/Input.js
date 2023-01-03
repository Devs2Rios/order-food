import { forwardRef, useRef, useImperativeHandle } from 'react';
import classes from '../../styles/Input.module.css';

const Input = forwardRef((props, ref) => {
    const inputRef = useRef(),
        activate = () => {
            inputRef.current.focus();
        };
    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });
    return (
        <div className={classes.field}>
            <label className={classes.label} htmlFor={props.id}>
                {props.label}
            </label>
            <input
                className={classes.input}
                ref={inputRef}
                id={props.id}
                name={props.id}
                onChange={props.onChange}
                {...props.input}
            />
        </div>
    );
});

export default Input;
