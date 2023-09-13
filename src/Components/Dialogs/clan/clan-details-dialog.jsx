import { useState } from 'react'
import './clan-details-dialog.scss'
import AoDialog from '../../Common/ao-dialog/ao-dialog'
import AoButton from '../../Common/ao-button/ao-button'

const mockClanDetail = {
  'nombre': 'Two Easy',
  'fundador': 'tenesule',
  'fecha_creacion': '03/08/2023',
  'lider': '1269',
  'miembros': 10,
  'alineacion': 'Neutral',
  'nivel_del_clan': 4
}

const Label = ({name, value}) => (
  <div key={name} className='label'>
    <span className='text'>{name}: </span>
    <span className='text'>{value}</span>
  </div>
)

export default function ClanDetailsDialog({styles}) {
  const [requestContent, setRequestContent] = useState('')

  return (
    <AoDialog styles={styles}>
      <div className='clan-details-dialog'>
        <div className='details-box'>
          <p className='text-title'>Información del clan</p>
          <Label name={'Nombre'} value={mockClanDetail.nombre}/>
          <Label name={'Fundador'} value={mockClanDetail.fundador}/>
          <Label name={'Fecha de creacion'} value={mockClanDetail.fecha_creacion}/>
          <Label name={'Líder'} value={mockClanDetail.lider} />
          <Label name={'Miembros'} value={mockClanDetail.miembros} />
          <Label name={'Alineación'} value={mockClanDetail.alineacion} />
          <Label name={'Nivel del clan'} value={mockClanDetail.nivel_del_clan} />
          <div className='flag'/>
        </div>
        <label className='description-box text-title'>
          Solicitud de ingreso
          <textarea 
            className='text-input'
            value={requestContent}
            onChange={e => setRequestContent(e.target.value)}
          />
        </label>  
        <AoButton caption='guardar' styles='guardar'>Solicitar Ingreso</AoButton>
      </div>
    </AoDialog>
  )
}
