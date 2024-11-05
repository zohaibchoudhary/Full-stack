import React, { useState , useEffect } from 'react'
import { Combobox } from '@headlessui/react';

const Select: React.FC<{
    options: {
        value: string;
        label: string;
    }[];
    value: string;
    onChange: (value: {value: string, label: string}) => void;
    placeholder: string;
}> = ({options, value, onChange, placeholder}) => {
    const [localOptions, setLocalOptions] = useState<typeof options>([]);
    useEffect(() => {
        setLocalOptions(options)
    }, [options])
return (
    <Combobox
    className={"w-full"}
    as="div"
    value={options.find((o) => o.value === value)}
    >

    </Combobox>
)
}

export default Select
