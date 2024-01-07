const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      include: Product
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: Product
    });

    if (!data) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedData = await Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name
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
  // delete on tag by its `id` value
  // delete a category by its `id` value
  try {
    const deletedData = await Tag.destroy({
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
