import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messageList: Array(100)
                .fill({style:'chaos-color', senderStyle:'chaos-color', sender:'', text:''})
                .map((element, index) => ({...element,text:`entry ${index + 20}`})),
    startPos: 20,
    endPos: 120
  },
  reducers: {
    addMessage: (state, action) => {
      state.endPos += 1
      if (state.endPos  - state.startPos > state.messageList.length()) {
        state.startPos += 1
      }
      state.messageList[state.endPos%state.messageList.length()] = action.payload.name
      state.interestPoints = action.payload.interestPoints
    }
  },
})

export const { addMessage } = ChatSlice.actions

export const selectMessageList = (state) => {
  const size = state.chat.endPos - state.chat.startPos
  let messageList = Array(size)
  for (let i = 0; i < size; i++) {
    messageList[i] = state.chat.messageList[ (state.chat.startPos + i)% size]
  }
  return messageList
}



export default ChatSlice.reducer