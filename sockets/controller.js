
const { TicketControl } = require('../models/ticket-control');

const ticketcontrol = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'ultimo-ticket',  ticketcontrol.ultimo );
    socket.emit( 'estado-actual',  ticketcontrol.ultimos4 );
    socket.emit( 'ticket-pendientes',  ticketcontrol.tickets.length );



    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketcontrol.siguiente();
        callback( siguiente );
        socket.broadcast.emit( 'ticket-pendientes',  ticketcontrol.tickets.length );

        //Hay un nuevo ticket pendiente

    });

    socket.on( 'atender-ticket', ( { escritorio }, callback )=> {
        
        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketcontrol.atenderTicket( escritorio );

        socket.broadcast.emit( 'estado-actual',  ticketcontrol.ultimos4 );
        socket.emit( 'ticket-pendientes',  ticketcontrol.tickets.length );
        socket.broadcast.emit( 'ticket-pendientes',  ticketcontrol.tickets.length );

        if( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }


    } );


}



module.exports = {
    socketController
}

