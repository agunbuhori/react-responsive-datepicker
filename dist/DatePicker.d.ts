import * as React from 'react';
interface Props {
    title?: string;
    dayNames?: string[];
    monthNames?: string[];
    showTitle?: boolean;
    defaultValue?: Date;
    minDate?: Date;
    maxDate?: Date;
    headerFormat?: string;
    headerTextColor?: string;
    colorScheme?: string;
    isOpen?: boolean;
    closeText?: string;
    clearText?: string;
    onClose?: () => void;
    onChange?: (date: Date | null) => void;
}
declare const _default: React.MemoExoticComponent<({ isOpen: showCalendar, onClose, title, dayNames, headerFormat, showTitle, monthNames, defaultValue, minDate, maxDate, colorScheme, headerTextColor, closeText, clearText, onChange }: Props) => JSX.Element | null>;
export default _default;
