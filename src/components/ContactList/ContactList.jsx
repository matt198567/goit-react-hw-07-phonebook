import { BsFillTrashFill } from 'react-icons/bs';
import Container from 'components/Container/Container';
import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContacts,
  fetchContacts,
  getVisibleContacts,
} from '../../redux/phonebook/selectors';
import { useEffect } from 'react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getVisibleContacts);
  const onDeleteContact = id => {
    dispatch(deleteContacts(id));
  };
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.item} key={id}>
            <p className={s.info}>
              {name}: {number}
            </p>
            <BsFillTrashFill
              size={22}
              className={s.btn}
              type="button"
              onClick={() => onDeleteContact(id)}
            />
          </li>
        ))}
      </ul>
    </Container>
  );
};
