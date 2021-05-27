
const { TicketControl } = require('../models/ticket-control');

const ticketcontrol = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'ultimo-ticket',  ticketcontrol.ultimo );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketcontrol.siguiente();
        callback( siguiente );

        //Hay un nuevo ticket pendiente

    })

}



module.exports = {
    socketController
}

