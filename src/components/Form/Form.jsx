import { useState } from 'react';
import { addContacts, getContacts } from '../../redux/phonebook/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Container from 'components/Container/Container';
import s from './Form.module.css';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const repeatName = contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });
    if (!repeatName) {
      Notify.success(`${name} is added in contacts`);
      dispatch(addContacts({ name, phone }));
      setNumber('');
      setName('');
      return;
    }
    Notify.warning(`${name} is already in contacts`);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className={s.form}>
        <label className={s.label}>Name</label>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
        <label className={s.label}>Phone</label>
        <input
          className={s.input}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={phone}
        />
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </Container>
  );
}
