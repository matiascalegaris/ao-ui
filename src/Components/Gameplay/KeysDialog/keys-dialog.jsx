import { useTranslation } from 'react-i18next';
import AoDialog from '../../Common/ao-dialog/ao-dialog'
import './keys-dialog.scss'

export const KeysDialog = ({styles}) => {
  const { t } = useTranslation();
  return (
    <AoDialog styles={styles} ignoreAnimation={true} >
      <h1 className='keys-header'>{t('keys').toUpperCase()}</h1>
    </AoDialog>
  )
}