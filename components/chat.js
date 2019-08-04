import React from 'react'
import { ChatContext } from '../lib/chat-context'

export default () => {
  const { sendMessage, channels, curChannel } = React.useContext(ChatContext)
  const channel = channels[curChannel] || []

  const checkSendMessage = () => {
    const el = document.querySelector('#new-message')
    const val = (el.value || '').trim()
    if (!val) return
    el.value = ''
    sendMessage(val)
  }

  return (
    <>
      <div className="messages">
        {channel.length === 0 && (
          <p className="no-messages">No new messages since joining...</p>
        )}
        {channel.map(({ text, user, sent }) => (
          <div className="message" key={sent}>
            <div className="info">
              <span>{user}</span> -{' '}
              <span>{new Date(sent).toLocaleString()}</span>
            </div>
            <div className="content">{text}</div>
          </div>
        ))}
      </div>
      <div className="new-message">
        <textarea
          className="form-input"
          placeholder="Your message..."
          id="new-message"
        />
        <button className="btn btn-primary btn-lg" onClick={checkSendMessage}>
          Send
        </button>
      </div>

      <style jsx>{`
        .messages {
          overflow-y: scroll;
          overflow-x: hidden;
          height: calc(100vh - 40px - 82px);
        }

        .no-messages {
          font-weight: 600;
          padding: 10px;
        }

        .message {
          padding: 5px 8px;
          border-bottom: 1px solid #3b4351;
        }

        .message .info span:nth-child(1) {
          font-weight: 600;
        }

        .new-message {
          display: flex;
          align-items: center;
          flex-direction: row;
        }
        .new-message textarea {
          resize: none;
        }
        .new-message button {
          margin: 0 5px;
        }
      `}</style>
    </>
  )
}
