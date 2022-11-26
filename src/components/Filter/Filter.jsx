import Container from 'components/Container/Container';
import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/phonebook/selectors';
import { filterChangeAction } from 'redux/phonebook/actions';

export default function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(filterChangeAction(e.target.value));
  };

  return (
    <Container>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={handleFilterChange}
        ></input>
      </label>
    </Container>
  );
}
