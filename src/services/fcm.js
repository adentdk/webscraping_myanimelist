import { messaging } from "firebase-admin";

export const pushMessage = ({
  data,
  notification: {
    title,
    body
  },
  topic = null,
  tokens = []
}) => {
  const message = {}
  const messages = [];

  if (!!data) {
    message.data = data
  }

  if (!!title && !!body) {
    message.notification = {title, body}
  }

  tokens.forEach(token => {
    messages.push({
      ...message,
      token,
    })
  })

  if (topic !== null) {
    messages.push({
      ...messages,
      topic
    })
  }

  if (messages.length > 0) {
    return messaging().sendAll(messages)
  }

  return null
}