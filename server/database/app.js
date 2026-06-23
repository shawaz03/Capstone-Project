const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

// Load mock database from files
const reviews_data = JSON.parse(fs.readFileSync("data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("data/dealerships.json", 'utf8'));

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the In-Memory API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    res.json(reviews_data['reviews'] || reviews_data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const reviews = (reviews_data['reviews'] || reviews_data).filter(r => r.dealership === dealerId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  try {
    res.json(dealerships_data['dealerships'] || dealerships_data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const state = req.params.state.toLowerCase();
    const dealers = (dealerships_data['dealerships'] || dealerships_data).filter(
      d => d.state.toLowerCase() === state
    );
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const dealerId = parseInt(req.params.id);
    const dealers = (dealerships_data['dealerships'] || dealerships_data).filter(
      d => d.id === dealerId
    );
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const list = reviews_data['reviews'] || reviews_data;
    const sorted = [...list].sort((a, b) => b.id - a.id);
    let new_id = (sorted.length > 0 ? sorted[0]['id'] : 0) + 1;

    const review = {
      "id": new_id,
      "name": data['name'],
      "dealership": parseInt(data['dealership']),
      "review": data['review'],
      "purchase": data['purchase'],
      "purchase_date": data['purchase_date'],
      "car_make": data['car_make'],
      "car_model": data['car_model'],
      "car_year": parseInt(data['car_year']),
    };

    list.push(review);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
