const config = {
    user: cfg.user,
    password: cfg.password,
    server: cfg.server,
    database: cfg.database,
    options:{
      trustServerCertificate:true,
    },
  }


  async function getConnection(query){
    const pool = await sql.connect(config)
    return pool
  }