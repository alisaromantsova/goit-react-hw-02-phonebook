import React from 'react';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter';
class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };
  onSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: e.target[0].value,
      number: e.target[1].value,
    };
    const result = this.state.contacts.find(
      item => item.name === newContact.name
    );
    if (result) {
      alert(`${e.target[0].value} is already in contacts.`);

      return;
    } else {
      this.setState(prevState => prevState.contacts.push(newContact));
      e.target[0].value = '';
      e.target[1].value = '';
    }
  };
  onInputChange(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  onDeleteButton(contactId) {
    this.setState(prevstat => ({
      contacts: prevstat.contacts.filter(item => item.id !== contactId),
    }));
  }
  render() {
    return (
      <>
        <ContactForm onSubmit={this.onSubmit} />
        <Filter
          onChange={e => this.onInputChange(e)}
          filter={this.state.filter}
        />
        <Contacts
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDelete={this.onDeleteButton.bind(this)}
        />
      </>
    );
  }
}

export default App;
