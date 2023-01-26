export default ({ noTickets, noTotalTickets, ticketStatus}: { noTickets: number, noTotalTickets: number, ticketStatus: string }) => {

   return <>
      <div className="progress-monolith__wrapper">
         <div className="progress-monolith">
            <div className="progress-monolith__percentage"
                 style={{
                    height: `${(noTickets / noTotalTickets) * 100 < 1 ? 1 : (noTickets / noTotalTickets) * 100}%`
                 }}>
               <p style={{
                  position: `${(noTickets / noTotalTickets) * 100 < 1 ? 'absolute' : 'relative'}`,
                  top: `${(noTickets / noTotalTickets) * 100 < 1 ? '-4rem' : 'unset'}`,
                  color: `${(noTickets / noTotalTickets) * 100 < 1 ? '#5d8bf4' : 'white'}`
               }}>{(noTickets / noTotalTickets) * 100}%</p>
            </div>
         </div>
         <p>{ticketStatus}</p>
      </div>

   </>
}
