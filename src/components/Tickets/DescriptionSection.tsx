import { Button } from '@mui/joy'
import { SetStateAction, useState } from 'react'
import * as React from 'react'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Textarea from '@mui/joy/Textarea'


export default ({
                   setDescription,
                   value,
                   setEditDescription,
                   setEditMode
                }: { setEditDescription: React.Dispatch<SetStateAction<boolean>>, setDescription: React.Dispatch<SetStateAction<string>>, setEditMode: React.Dispatch<SetStateAction<boolean>>, value?: string }) => {
   const [ italic ] = useState(false)
   const [ fontWeight ] = useState('normal')

   return (
      <FormControl onClick={() => setEditDescription(true)}>
         <FormLabel sx={{ fontSize: '2rem', color: '#5d8bf4' }}>Description</FormLabel>
         <Textarea
            placeholder="Type something here…"
            value={value}
            minRows={6}
            maxRows={6}
            size={'lg'}
            onChange={(e) => {
               setEditMode(true)
               setDescription(e.target.value)
            }
            }
            sx={{
               minWidth: 300,
               fontSize: '1.5rem',
               height: '30rem',
               border: 'none',
               backgroundColor: '#f4f4f4f4',
               fontWeight,
               fontStyle: italic ? 'italic' : 'initial'
            }}
         />

      </FormControl>
   )
}