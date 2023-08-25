export const Section = ({children, name, style, contentStyle}) => {
  return (
    <div className={"section-area " + style}>
      <div className="section-name">{name}</div>
        <div className={"section-content " + contentStyle}>
          {children}
        </div>
    </div>
)}