const TIPOS_USUARIO = {
  ADMIN: 'ADMIN',
  DOCTOR:'DOCTOR',
  ENFERMERA:'ENFERMERA',
  PACIENTE: 'PACIENTE'
}

const getMenuFrontEnd = (role) =>{

    const menuAdmin = [
      {
        
      }
    ];

    const menuEnfermera = [
      {
        id   : 'cita',
        title: 'Cita',
        type : 'basic',
        icon:'heroicons_outline:clipboard-document-list',
        link : '/dashboards/cita'
      },
      {
        id   : 'Cita.MapaSitio',
        title: 'Mapa del Sitio',
        type : 'basic',
        icon:'heroicons_outline:map',
        link : '/dashboards/mapa-sitio'
      },
      {
        id   : 'cita',
        title: 'Historial Pacientes',
        type : 'basic',
        icon:'heroicons_outline:clipboard-document-list',
        link : '/dashboards/historial_medico'
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
        },
        {
          id   : 'Cita.MapaSitio',
          title: 'Mapa del Sitio',
          type : 'basic',
          icon:'heroicons_outline:map',
          link : '/dashboards/mapa-sitio'
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