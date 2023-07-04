import { useDispatch, useSelector } from 'react-redux'
import { DragDropProvider } from '../../Common/DragDropProvider'
import { DragLayer } from '../../Common/DragLayer/drag-layer'
import OptionDialog from '../../Dialogs/OptionDialog/option-dialog'
import Chat from './Chat/chat'
import './gameplay-screen.scss'
import MiniMap from './MiniMap/mini-map'
import SideMenu from './SideMenu/side-menu'
import TopBar from './TopBar/top-bar'
import { exitGameplay, selectActiveDialog, selectTrackUserActive } from '../../../redux/GameplaySlices/GameStateSlice'
import { selectExitScreenActive, setFadeOut } from '../../../redux/UIFlowSlice'
import { useEffect } from 'react'
import SingleInputDialog from '../../Dialogs/SingleInputDialog/single-input-dialog'
import { IFrameDialog } from '../../Common/IFrameDialog/iframe-dialog'
import { ErrorBoundary } from '../../ErrorBoundary/error-boundary'
import { RemoteCursor } from '../../Common/RemoteCursor/remote-cursor'

export default function GameplayScreen() {
  //console.log('gameplay render')
  const dispatch = useDispatch()
  const popupsState = useSelector(selectActiveDialog)
  const remoteTrackActive = useSelector(selectTrackUserActive)
  useEffect(()=> {
    setTimeout(() => {
      dispatch(setFadeOut(false))  
    }, 200);
  }, [])
  useEffect( () => {
    return () => 
    {
      dispatch(exitGameplay())
    }
  }, [] );
  const transitionActive = useSelector(selectExitScreenActive)
  return (
    <div className='gameplay-screen'>
      <TopBar styles={'top-bar ' + (transitionActive ? 'gp-top-exit-animation' : 'gp-top-intro-animation')}/>
      <div className='gameplay-area'>
      <DragDropProvider>
      <span className={'menu-separator ' + (transitionActive ? 'gp-left-exit-animation' : 'gp-left-intro-animation')}><span className='frame-corner bot-left'></span></span>
        <div className='gameplay-and-chat'>
          <div className={'chat-section ' + (transitionActive ? 'gp-top-exit-animation' : 'gp-top-intro-animation')}>
            <ErrorBoundary compName="chat and minimap area">
            <Chat/>
            <MiniMap/>
            </ErrorBoundary>
          </div>
          <div className='gameplay-window'></div>
          <span className={'gameplay-bottom-frame ' + (transitionActive ? 'gp-bottom-exit-animation' : 'gp-bottom-intro-animation')}></span>
        </div>
        <span className={'menu-separator ' + (transitionActive ? 'gp-right-exit-animation' : 'gp-right-intro-animation')}><span className='frame-corner bot-right'></span></span>
        <SideMenu styles={'right-panel ' + (transitionActive ? 'gp-right-exit-animation' : 'gp-right-intro-animation')}/>
        <DragLayer/>
        </DragDropProvider>
        <ErrorBoundary compName="gameplay popups">
        {
          popupsState ?
          <div className='popups'>
            {{
                'option-dialog':<OptionDialog styles='centered' settings={popupsState}/>,
                'single-input-dialog':<SingleInputDialog styles='centered' settings={popupsState}/>,
                'iframe':<IFrameDialog options={popupsState}/>
              }
              [popupsState.popUp]
            }
          </div> :
          null
        }
        {
          remoteTrackActive ? <RemoteCursor /> : null
        }
        </ErrorBoundary>
      </div>
    </div>
  )
}
