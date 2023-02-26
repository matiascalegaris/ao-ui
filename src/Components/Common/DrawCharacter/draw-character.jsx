import './draw-character.scss'

const DrawCharacter = ({ body, head, helm, shield, weapon }) => {
  const charInfo = window.parent.BabelUI.GetCharacterDrawInfo(body, head, helm, shield, weapon)

  return (
    <div></div>
  )
}

export default DrawCharacter