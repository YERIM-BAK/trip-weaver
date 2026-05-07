"use client";

import { forwardRef, useState } from "react";

export type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  helperText?: string;
};

const SMOInput = forwardRef<HTMLInputElement, InputProps>(
    ({ type = "text", helperText, className, ...props }, ref) => {

        if (type === "text") return textInput();
        else if (type === "search") return SearchInput();        
        else return null;     

    }
);

SMOInput.displayName = "SMOInput";

const textInput =()=>{

    SMOInput.displayName = "SMOInput::textInput";

    return (
        <div>textInput</div>
    );
    
}

const SearchInput =()=>{

    SMOInput.displayName = "SMOInput::SearchInput";

    return (
        <div>SearchInput</div>
    );
    
}

export default SMOInput;