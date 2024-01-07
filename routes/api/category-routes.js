const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: Product
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id, {
      include: Product
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedData = await Category.update(
      {
        // All the fields you can update and the data attached to the request body.
        category_name: req.body.category_name
      },
      {
        // Gets a category based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deletedData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
