import React from 'react';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
class App extends Component {
  state = {
    contacts: [
      { id: nanoid(4), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(4), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(4), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(4), name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };
  onSubmit = contact => {
    const result = this.state.contacts.find(item => item.name === contact.name);
    if (result) {
      alert(`${contact.name} is already in contacts.`);

      return;
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...contact, id: nanoid(4) }],
      }));
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
