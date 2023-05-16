import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messageList: Array(100)
                .fill({style:'chaos-color', senderStyle:'chaos-color', sender:'', text:''})
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
      console.log(`tail ${state.endPos} start:${state.startPos} insertPos:${insertionPos}`)
      state.messageList[insertionPos] = action.payload
    }
  },
})

export const { postChatMessage } = ChatSlice.actions

export const selectMessageList = (state) => {
  const size = state.chat.endPos - state.chat.startPos
  let messageList = Array(size)
  for (let i = 0; i < size; i++) {
    messageList[i] = state.chat.messageList[ (state.chat.startPos + i)% size]
  }
  return messageList
}



export default ChatSlice.reducer