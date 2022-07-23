interface Props {
  layout: Block[]
}
interface Block {
  columns: any[]
  id: string
  blockName: string
  blockType: string
}

export const BlockRenderer = ({ layout }:Props) => {
  return (
    <div>
      {
        layout.map((block, index) => (
          <div key={`block-${index}`}>
            <div className='w-full p-5 border-b'>
              <h1>{block.blockName}</h1>
              <h1>{block.blockType}</h1>
            </div>
          </div>
        ))
      }
    </div>
  )
}