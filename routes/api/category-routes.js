const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});

// GET a single category by ID
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }],
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

// CREATE a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

// UPDATE a category by ID
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((category) => {
      if (!category[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE a category by ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
