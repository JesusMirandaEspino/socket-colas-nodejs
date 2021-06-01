//Referencias Html
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblticket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams =  new URLSearchParams( window.location.search );

if( !searchParams.has( 'escritorio' ) ){

    window.location = 'index.html';
    throw Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get( 'escritorio' );

lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';


const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on( 'ticket-pendientes', (pendientes) => {

    if( pendientes === 0  ){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display ='';
        lblPendientes.innerText = pendientes;
    }
    
        
} );

btnAtender.addEventListener( 'click', () => {


    

    socket.emit( 'atender-ticket',  { escritorio }, ( { ok, ticket, msg } ) => {
        // lblticket

        if( !ok ){
            lblticket.innerText = `Nadie  `;
            return divAlerta.style.display = '';
        }

        lblticket.innerText = `Ticket: ${ticket.numero}  `;

    } );
    //    console.log(  lblNuevoTicket );
    //    lblNuevoTicket.innerText = ticket;
    //});

});