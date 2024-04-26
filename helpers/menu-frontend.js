const TIPOS_USUARIO = {
  ADMIN: 'ADMIN',
  DOCTOR:'DOCTOR',
  ENFERMERA:'ENFERMERA',
  PACIENTE: 'PACIENTE'
}

const getMenuFrontEnd = (role) =>{
    const menuBaseInicio = [
      {
        id   : 'home',
        title: 'Inicio',
        link:'/home-nuevo'
      },
      {
        id   : 'home',
        title: 'Conoce mas',
        link:'/conoce-mas'
      },
      {
        id   : 'home',
        title: 'Mapa sitio',
        link:'/mapa-sitio2'
      }
    ];


    const menuAdmin = [
      {
        id   : 'admin',
        title: 'Administracion de usuarios',
        type : 'basic',
        icon : 'heroicons_outline:user-circle',
        link : '/dashboards/administrador-usuarios'
      },
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

      const menuPorRol = {
        [TIPOS_USUARIO.ADMIN]: menuAdmin,
        [TIPOS_USUARIO.DOCTOR]: menuDoctor,
        [TIPOS_USUARIO.ENFERMERA]: menuEnfermera
      }

      let menu = menuPorRol[role];
      menu.push(...menuBaseInicio)
      console.log(menu)
      if(menu){
        return menu;
      }else{
        console.log("no existe este rol")
      }


}

module.exports = {
    getMenuFrontEnd
}