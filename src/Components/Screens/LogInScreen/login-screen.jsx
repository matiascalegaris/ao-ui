import { useDispatch, useSelector } from 'react-redux'
import Frame from '../../Common/Frame/frame'
import LogIn from '../../Dialogs/login/login'
import './login-screen.scss'
import { loadNews, selectSteamNews } from '../../../redux/Api'
import { SteamNewsEntry } from './SteamNews/steam-news-entry'
import { useEffect } from 'react'
import { setFadeOut } from '../../../redux/UIFlowSlice'

export const LoginScreen = () => {
  const news = useSelector(selectSteamNews)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);
  useEffect(()=> {
    setTimeout(() => {
      dispatch(setFadeOut(false))  
    }, 200);
  }, [])
  return (
    <div className='login-screen'>
      <div className='conten-line'>
      {
        news && news.appnews.newsitems ?
        <Frame styles='news-frame' contentStyles='news-content'>
        {
            news.appnews.newsitems.map((entry) => (
              <SteamNewsEntry key={entry.gid} newsInfo={entry} />
            ))     
        }      
        </Frame>
        : null
      }
      <LogIn styles='right-login-dialog-pos'/>   
      </div>
    </div>
  )
}