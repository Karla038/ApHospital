const TIPOS_USUARIO = {
    DOCTOR:'DOCTOR',
    ENFERMERA:'ENFERMERA'
}

const getMenuFrontEnd = (role) =>{
    const menuEnfermera = [
      {
        id   : 'cita',
        title: 'Cita',
        type : 'basic',
        icon:'heroicons_outline:clipboard-document-list',
        link : '/dashboards/cita'
      }      
        // {
        //   titulo:'Mantenimientos',
        // //   icono: 'mdi mdi-folfer-lock-open',
        //   submenu: [
        //     // { titulo: 'Usuarios', url: 'usuarios' },
        //     { titulo: 'Hospitales', url: '/inicio/hospitales'},
        //     { titulo: 'Médicos', url: '/inicio/médicos' },
    
        //   ]         
        // }
      ];

      const menuDoctor = [   
        {
          id   : 'Cita.Agendada',
          title: 'Cita Agendada',
          type : 'basic',
          icon:'heroicons_outline:clipboard-document-list',
          link : '/dashboards/cita_agendada'
        } 

        // {
        //     titulo:'Principal',    
        //     submenu:[
        //       {titulo: 'Inicio', url: '/dashboards/cita'},                       
        //     ],
        //   //   busqueda:[
        //   //     {titulo:'Mapa del Sitio',url: '/inicio/mapa-sitio'},
        //   //     {titulo: 'Inicio', url: '/inicio'},
        //   //     // {titulo:'Mapa del Sitio',url: '/dashboard/mapa-sitio'},
        //   //   ]
        //   }
      ]

      if(role === TIPOS_USUARIO.ENFERMERA){
        return menuEnfermera;
      }
      if(role === TIPOS_USUARIO.DOCTOR){
        console.log('Doc');
        return menuDoctor;
      }
}

module.exports = {
    getMenuFrontEnd
}