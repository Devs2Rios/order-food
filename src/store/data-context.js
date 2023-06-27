import { useState, useCallback, createContext, useEffect } from "react";

const { REACT_APP_DB_URL } = process.env;

export const DataContext = createContext({
    meals: [],
});

export default function DataContextProvider(props) {
    const [meals, setMeals] = useState([]),
        getMeals = useCallback(async () => {
            const response = await fetch(`${REACT_APP_DB_URL}/meals.json`);
            const data = await response.json();
            setMeals(Object.values(data));
        }, []);

    useEffect(() => {
        getMeals();
    }, [getMeals])

    return (
        <DataContext.Provider value={{ meals }}>
            {props.children}
        </DataContext.Provider>
    );
};