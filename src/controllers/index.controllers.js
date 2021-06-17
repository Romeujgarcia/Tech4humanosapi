const { Pool } = require("pg");

const axios = require("axios").default;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "previsao",
  port: "5432",
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM cidades");
  res.status(200).json(response.rows);
};
const getUserById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM cidades WHERE id = $1", [
    id,
  ]);
  res.json(response.rows);
};

const createUser = async (req, res) => {
  const { cidade, cont, ult_consul } = req.body;
  const response = await pool.query(
    "INSERT INTO cidades (cidade, cont, ult_consul) VALUES ($1, $2, $3)",
    [cidade, cont, ult_consul]
  );
  console.log(response);
  res.json({
    message: "User Added Succesfully",
    body: {
      user: { cidade, cont, ult_consul },
    },
  });
};

const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const { cidade, cont, ult_consul } = req.body;
  const response = await pool.query('UPDATE cidades SET cidade = $1, cont = $2, ult_consul = $3 WHERE id = $4', [cidade, cont, ult_consul, id]);
  console.log(response);
  res.json("User Update successfully");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query('DELETE  FROM cidades WHERE id = $1', [id]);
  console.log(response);
  res.json(`User ${id} deleted successfully`);
};

const Buscar = async (req, res) => {
    
 if (req.body['cidade']) {
   //console.log(req.body['cidade'])
    const cidade = req.body['cidade'];
    //console.log(cidade);
    const consulta = await pool.query(
      "SELECT * FROM cidades WHERE cidade = $1",
      [cidade]
    );
    
    if (consulta.rows.length === 0) {

      const inser = await pool.query("INSERT INTO cidades (cidade, cont, ult_consul) VALUES ($1, 1, current_timestamp)", [cidade]);
      res.send('Inserido com Sucesso')

    } else {
      const consul = consulta.rows[0].cont + 1;
      //console.log(consulta.rows[0].cont);
      //console.log(consul);
      
      const resultado = await pool.query("UPDATE cidades SET cont = $1, ult_consul = current_timestamp WHERE cidade = $2",[consul, cidade]);
      console.log(resultado);
    }
} else {
}
  res.json(" Deu certo!");
};

const ConsultarBanco = async (req, res) => {
    let vetor = []
     const consulta = await pool.query("SELECT * FROM cidades ORDER BY cont DESC limit 5");
     if (consulta.rows.length === 0) {
       res.send('Error')
     } else {
       vetor.push(consulta.rows)
     }
     const resolt = await pool.query("SELECT * FROM cidades ORDER BY ult_consul DESC limit 5");
     if (resolt.rows.length === 0) {
      res.send('Error')
     } else {
      vetor.push(resolt.rows);
     }

  
   res.json(vetor);
 };




module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  UpdateUser,
  Buscar,
ConsultarBanco
};
