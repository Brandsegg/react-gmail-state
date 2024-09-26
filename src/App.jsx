import Header from './components/Header'
import initialEmails from './data/emails'
import { useState } from 'react';

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)
  const [emailData, setEmailData] = useState(initialEmails);
  const [readEmails, setReadEmails] = useState(false);


  const toggleRead = (toToggle) => {
    const updated = emailData.map((email) => {
      if (email.id !== toToggle.id) {
        return email
      }
      return { ...email, read: !email.read }
    })
    setEmailData(updated)
  }

  const toggleStarred = (toStar) => {
    const starred = emailData.map((email) => {
      if(email.id !== toStar.id){
        return email
      }
      return {...email, starred : !email.starred}
    })
    setEmailData(starred)
  }

  const hideRead = () => {
    readEmails ? setEmailData(emailData) : setEmailData(getRead(emailData))
    setReadEmails(!readEmails)
  }

  const getRead = (emails) => {
    return emails.filter((email) => email.read !== true)
  }


  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
          // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
          // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={readEmails}
              onChange={() => hideRead()}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {emailData.map((email, index) => (
            <li key={index} className={`email ${email.read ? 'read' : 'unread'}`}>
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                  checked={email.read}
                  onChange={() => toggleRead(email)}
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onChange={() => toggleStarred(email)}
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
            </li>
          ))}
        </ul>
        <li></li>
      </main>
    </div>
  )
}

export default App
