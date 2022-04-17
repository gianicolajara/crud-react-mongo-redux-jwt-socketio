export interface IUseFieldReduxProps {
  props: {
    fullWidth?: boolean;
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    error: boolean;
    helperText: string | null;
  };
}
