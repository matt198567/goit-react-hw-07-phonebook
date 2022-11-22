import Container from 'components/Container/Container';
import s from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/phonebook/selectors';
import { filterChangeAction } from 'redux/phonebook/actions';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(filterChangeAction(e.currentTarget.value));
  };

  return (
    <Container>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={changeFilter}
        ></input>
      </label>
    </Container>
  );
};
