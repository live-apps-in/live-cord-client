import { DebounceInput } from 'react-debounce-input';
import { TextField, CircularProgress, InputAdornment } from "@mui/material";
import { useState } from "react";
import { handleError } from "src/utils";
import { CUSTOM_DEBOUNCE_INPUT_PROPS } from '../model';

export const CustomDebounceInput: React.FC<CUSTOM_DEBOUNCE_INPUT_PROPS> = (props) => {

    const [loading, setLoading] = useState(false);

    const handleOnChange = async(event) => {
        setLoading(true);
        try {
            await props.onChange(event);
        }
        catch(err) {
            if(props.onError) props.onError(err);
            else handleError(err);
        }
        setLoading(false);
    };

    return (
        <DebounceInput 
            {...props as any}
            fullWidth
            element={TextField}
            debounceTimeout={props.debounceTimeout || 300}
            onChange={handleOnChange}
            InputProps={{
                ...props.InputProps,
                ...(loading && {
                    endAdornment: <InputAdornment position='end'>
                      <CircularProgress />
                    </InputAdornment>
                  })
            }}
        />
    );
};