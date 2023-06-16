import { createSelector, createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messageList: Array(100)
                .fill({senderColor:{R:255,G:0,B:0}, textColor:{R:0,G:255,B:0}, sender:'pepe', text:''})
                .map((element, index) => ({...element,text:`entry ${index + 20}`})),
    startPos: 0,
    endPos: 0
  },
  reducers: {
    postChatMessage: (state, action) => {
      const insertionPos = state.endPos%state.messageList.length
      state.endPos += 1
      if (state.endPos  - state.startPos > state.messageList.length) {
        state.startPos += 1
      }
      state.messageList[insertionPos] = action.payload
    }
  },
})

export const { postChatMessage } = ChatSlice.actions

export const selectMessageList = createSelector(
  (state) => state.chat,
  (chat) => {
    const size = chat.endPos - chat.startPos
    let messageList = Array(size)
    for (let i = 0; i < size; i++) {
      messageList[i] = chat.messageList[ (chat.startPos + i)% size]
    }
    return messageList
  }
)


export default ChatSlice.reducer