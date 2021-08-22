import React from 'react';
import MaskedInput from 'react-text-mask';

interface TextMaskCustomProps {
  mask: string[];
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps): JSX.Element {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      showMask
      guide={false}
    />
  );
}
export default TextMaskCustom;
