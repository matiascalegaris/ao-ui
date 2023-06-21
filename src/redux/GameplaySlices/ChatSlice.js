import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ChatStates } from '../../constants'
import { exitGameplay } from './GameStateSlice'

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messageList: Array(100)
                .fill({senderColor:{R:255,G:0,B:0}, textColor:{R:0,G:255,B:0}, sender:'pepe', text:''})
                .map((element, index) => ({...element,text:`entry ${index + 20}`})),
    startPos: 0,
    endPos: 0,
    whisperTarget: '',
    chatMode: ChatStates.Normal,
    forceOpenChatId: 0
  },
  reducers: {
    postChatMessage: (state, action) => {
      const insertionPos = state.endPos%state.messageList.length
      state.endPos += 1
      if (state.endPos  - state.startPos > state.messageList.length) {
        state.startPos += 1
      }
      state.messageList[insertionPos] = action.payload
    },
    setWhisperTarget: (state, action) => {
      if (state.whisperTarget !== action.payload){
        if (action.payload !== '') {
          state.chatMode = ChatStates.Private
        }
        state.forceOpenChatId++
        state.whisperTarget = action.payload
      }
    },
    setChatMode: (state, action) => {
      state.chatMode = action.payload
    },
    extraReducers: (builder) => {
      builder
        .addCase(exitGameplay, (state) => {
          state.whisperTarget = ''
          state.chatMode= ChatStates.Normal
          state.forceOpenChatId = 0
        })
    },
  },
})

export const { postChatMessage, setWhisperTarget, setChatMode } = ChatSlice.actions

export const selectChatMode = (state) => state.chat.chatMode
export const selectWhisperTarget = (state) => state.chat.whisperTarget
export const selectForceOpenChat = (state) => state.chat.forceOpenChatId

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