import { SetStateAction, useState } from 'react'
import * as React from 'react'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'


export default ({setDescription}: {setDescription?: React.Dispatch<SetStateAction<string>>}) => {
   const [ italic, setItalic ] = useState(false)
   const [ fontWeight, setFontWeight ] = useState('normal')

   return (
      <FormControl>
         <FormLabel sx={{ fontSize: '2rem' }}>Description</FormLabel>
         <Textarea
            placeholder="Type something here…"
            minRows={6}
            maxRows={6}
            size={'lg'}
            onChange={(e) => setDescription && setDescription(e.target.value)}
            endDecorator={
               <Box
                  sx={{
                     display: 'flex',
                     gap: 'var(--Textarea-paddingBlock)',
                     pt: 'var(--Textarea-paddingBlock)',
                     borderColor: 'divider',
                     flex: 'auto'
                  }}
               >
               </Box>
            }
            sx={{
               minWidth: 300,
               fontWeight,
               fontStyle: italic ? 'italic' : 'initial'
            }}
         />
      </FormControl>
   )
}