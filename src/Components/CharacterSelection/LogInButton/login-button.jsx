import AoButton from '../../Common/ao-button/ao-button'
import './login-button.scss'

export default function LoginButton({children, ...otherProps}) {
  return (
    <div className='login-button-container'>
      <img className='sides' src={require('../../../assets/Buttons/login-left.png')} />
      <div className='button-bg'><AoButton styles='inner-button' {...otherProps}>{children}</AoButton></div>
      <img className='sides' src={require('../../../assets/Buttons/login-right.png')} />
    </div>
  )
}