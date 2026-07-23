
const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM EMPLEADO', (error, empleados) => {
      if (error) res.json(error);
      res.json(empleados);
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM EMPLEADO WHERE ID_EMPLEADO = ?', [id], (error, empleado) => {
      res.json(empleado[0]);
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query('INSERT INTO EMPLEADO SET ?', [data], (error, empleado) => {
      if (error) res.json(error);
      res.json({ message: "Empleado agregado", empleado });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const nuevo = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE EMPLEADO SET ? WHERE ID_EMPLEADO = ?', [nuevo, id], (error, rows) => {
      if (error) res.json(error);
      res.json({ message: "Empleado actualizado" });
    });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM EMPLEADO WHERE ID_EMPLEADO = ?', [id], (error, rows) => {
      if (error) res.json(error);
      res.json({ message: "Empleado eliminado" });
    });
  });
};

module.exports = controller;
