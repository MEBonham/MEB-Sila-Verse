import { useState } from 'react';

const useForm = cb => {
    const [inputs, setInputs] = useState({});

    const handleSubmit = ev => {
        if (ev) {
            ev.preventDefault();
        }
        cb();
    }

    const handleInputChange = ev => {
        ev.persist();
        setInputs(inputs => ({
            ...inputs,
            [ev.target.id]: ev.target.value
        }));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        setInputs
    };
}

export default useForm;