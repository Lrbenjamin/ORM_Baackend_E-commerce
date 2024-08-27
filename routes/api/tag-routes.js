const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      { model: Product, through: ProductTag },
    ],
  })
    .then((tags) => res.json(tags))
    .catch((err) => res.status(500).json(err));
});

// GET a single tag by ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },
    include: [
      { model: Product, through: ProductTag },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

// CREATE a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(400).json(err));
});

// UPDATE a tag by ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((tag) => {
      if (!tag[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE a tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
