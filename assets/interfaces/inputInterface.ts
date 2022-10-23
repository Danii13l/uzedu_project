type EventType = (
  e:
    | string
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export interface InputInt {
  name: string;
  labelText?: string;
  value?: string | number;
  onChange: EventType;
  onBlur: EventType;
  isError?: string;
  isTouched?: boolean;
  place?: string;
}
