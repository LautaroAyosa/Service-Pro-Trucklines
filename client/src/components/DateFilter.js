import React from "react";
import { startOfDay, endOfDay, addDays, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.min.css";

const DateFilter = ({dates, setDates}) => {

    const ranges = [
    {
        label: 'today',
        value: [startOfDay(new Date()), endOfDay(new Date())]
    },
    {
        label: 'yesterday',
        value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))]
    },
    {
        label: 'last7Days',
        value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())]
    },
    {
        label: 'This month',
        value: [startOfMonth(new Date()), endOfMonth(new Date())]
    }
    ];

    return (
        <DateRangePicker
            size="md"
            value={dates}
            character='  -  '
            placeholder='Select Date Range'
            format='MM-dd-yyyy'
            limitEndYear={3}
            defaultCalendarValue={dates}
            onChange={setDates}
            ranges={ranges}
        />
    )
}

export default DateFilter