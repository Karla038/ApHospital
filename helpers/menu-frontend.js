const TIPOS_USUARIO = {
    DOCTOR:'DOCTOR',
    ENFERMERA:'ENFERMERA'
}

const getMenuFrontEnd = (role = 'ENFERMERA') =>{
    const menuEnfermera = [
        {
          titulo:'Principal',    
          submenu:[
            {titulo: 'Inicio', url: '/dashboards/cita'},                       
          ],
        //   busqueda:[
        //     {titulo:'Mapa del Sitio',url: '/inicio/mapa-sitio'},
        //     {titulo: 'Inicio', url: '/inicio'},
        //     // {titulo:'Mapa del Sitio',url: '/dashboard/mapa-sitio'},
        //   ]
        },
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
            titulo:'Principal',    
            submenu:[
              {titulo: 'Inicio', url: '/dashboards/cita'},                       
            ],
          //   busqueda:[
          //     {titulo:'Mapa del Sitio',url: '/inicio/mapa-sitio'},
          //     {titulo: 'Inicio', url: '/inicio'},
          //     // {titulo:'Mapa del Sitio',url: '/dashboard/mapa-sitio'},
          //   ]
          }
      ]

      if(role === TIPOS_USUARIO.ENFERMERA){
        return menuEnfermera;
      }
      if(role === TIPOS_USUARIO.DOCTOR){
        return menuDoctor;
      }
}

module.exports = {
    getMenuFrontEnd
}