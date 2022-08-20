import * as React from 'react';
interface Props {
    defaultValue?: Date;
    headerTextColor?: string | 'black' | 'white';
    headerBackgroundColor?: string | 'purple' | 'blue' | 'green' | 'yellow' | 'red';
    onChange?: (date: Date) => void;
}
declare const _default: React.MemoExoticComponent<({ defaultValue, onChange }: Props) => JSX.Element>;
export default _default;
