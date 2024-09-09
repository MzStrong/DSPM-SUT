const { Child, Gender, Relationship } = require("../../models/index");

exports.getAllChilds = async (req, res) => {
  const { id } = req.params;
  try {
    const childs = await Child.findAll({
      where: { userId: id },
      include: [
        {
          model: Gender,
          attributes: ["name"],
        },
        {
          model: Relationship,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(childs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createChild = async (req, res) => {
  try {
    const childData = req.body;

    const newChild = await Child.create(childData);
    res.status(201).json(newChild);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteChild = async (req, res) => {
  try {
    const id = req.params;
    const deletedChild = await Child.destroy({ where: id });

    if (deletedChild) {
      return res.status(200).json({ message: "Child deleted successfully." });
    } else {
      return res.status(404).json({ error: "Child not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateChild = async (req, res) => {
  const id = req.params;
  const {
    firstname,
    lastname,
    hn,
    birthday,
    height,
    weight,
    congenital_disease,
    relationshipId,
    genderId,
  } = req.body;

  try {
    const updatedChild = await Child.update(
      {
        firstname,
        lastname,
        hn,
        birthday,
        height,
        weight,
        congenital_disease,
        relationshipId,
        genderId,
      },
      { where: id }
    );

    if (updatedChild[0]) {
      res.status(200).json({ message: "Child updated successfully." });
    } else {
      res.status(404).json({ error: "Child not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeParent = async (req, res) => {
  const id = req.params;
  const { userId } = req.body;

  try {
    const updatedChild = await Child.update(
      {
        userId,
      },
      { where: id }
    );

    if (updatedChild[0]) {
      res.status(200).json({ message: "Child Parent updated successfully." });
    } else {
      res.status(404).json({ error: "Child not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
