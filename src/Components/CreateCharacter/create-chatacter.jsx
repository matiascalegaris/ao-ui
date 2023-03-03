import Header from '../CharacterSelection/Header/header'
import Frame from '../Common/Frame/frame'
import RibbonTittle from '../Common/RibbonTittle/ribbon-tittle'
import './create-character.scss'

export default function CreateCharacterScreen() {

  return (
    <div className='create-charcter'>
      <Header/>
      <div className='config-area'>
        <div className='left-panel'>
          <Frame framePath='assets/frames/box/' sideSize={9}>
            <RibbonTittle text='test text' />
            some large text just to test<br/><br/><br/><br/><br/><br/><br/>






            asdasd
          </Frame>
        </div>
        <div className='mid-panel'></div>
        <div className='right-panel'></div>
      </div>
    </div>
  )
}