
const { TicketControl } = require('../models/ticket-control');

const ticketcontrol = new TicketControl();

const socketController = (socket) => {
    
    socket.on('disconnect', () => {
        
    });

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketcontrol.siguiente();
        callback( siguiente );

        //Hay un nuevo ticket pendiente

    })

}



module.exports = {
    socketController
}

