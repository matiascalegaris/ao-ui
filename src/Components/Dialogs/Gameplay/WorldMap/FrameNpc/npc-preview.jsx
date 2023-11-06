import DrawCharacter from "../../../../Common/DrawCharacter/draw-character"

export const NpcPreview = ({npcDetails}) => {
  var scale = {x:1, y:1}
  if (npcDetails.head === 0) {
    let drawInfo = window.parent.BabelUI.GetCharacterDrawInfo(npcDetails.body, 0, 0, 0, 0)
    if (drawInfo.body.body.height > 100) {
      scale.y = 100 / drawInfo.body.body.height
    }
    if (drawInfo.body.body.width > 140) {
      scale.x = 140 / drawInfo.body.body.width
    }
    scale.x = Math.min(scale.x, scale.y)
    scale.y = scale.x
  }
  const styles = {
    margin: "auto",
    transform: `scale(${scale.x})`,
    maxWidth: '140px',
    maxHeight: '100px',
    transformOrigin: 'top center'
  }
  const containerStyles = {
    with: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden'
  }
  return ( 
    <div style={containerStyles}>
      <DrawCharacter 
        style={styles}
        body={npcDetails.body} 
        head={npcDetails.head}/>
    </div>
  
)}