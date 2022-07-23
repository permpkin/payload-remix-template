interface Props {
  data: Block[]
}
interface Block {
  type: string
  context: any
}
export const BlockRenderer = ({ data }:Props) => {
  return (
    <div>
      {
        data.map((block, index) => (
          <div key={`block-${index}`}>
            <div className='w-full p-5 border-b'>
              <h1>{block.type}</h1>
            </div>
          </div>
        ))
      }
    </div>
  )
}