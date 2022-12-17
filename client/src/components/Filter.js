import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/reducers/filterReducer';

const Filter = (props) => {
    const filter = useSelector( state => state.filter)
    const dispatch = useDispatch()

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value))
    }

    return (
        <div className=''><input className='form-control' onChange={handleFilterChange} value={filter} name='filter' placeholder='Search by Delivery Id...'/></div>
    )
}

export default Filter;