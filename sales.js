
// Fetch data ------------------------------------------------------------------
fetch('https://saga-k.github.io/Fm-online-store/data.json')
  .then(response => response.json())
  .then(ordersArr => {

    // Most popular orders start------------------------------------------------
    // Get labels
    let labels = []

    for (let i = 0; i < ordersArr.length; i++) {

      for (let j = 0; j < ordersArr[i].products.length; j++) {
        labels.push(ordersArr[i].products[j].name)
      }
    }

    labels = removeDuplicates(labels);

    // Get Values
    let values = [];

    for (let i = 0; i < labels.length; i++) {

      for (let j = 0; j < ordersArr.length; j++) {

        for (let k = 0; k < ordersArr[j].products.length; k++) {
          if (ordersArr[j].products[k].name === labels[i]) {
            values.push({ name: labels[i], amount: ordersArr[j].products[k].amount })
          }
        }
      }
    }

    // Merge same items from different orders
    let mergedValues = []

    for (let i = 0; i < labels.length; i++) {
      let amount = 0;
      let same = values.filter((value) => value.name === labels[i])

      for (let j = 0; j < same.length; j++) {
        amount += same[j].amount

      }
      mergedValues.push(amount);
    }

    //Call function to render Chart for most popular products
    renderPieChart(labels, mergedValues);

    // Most popular orders end--------------------------------------------------



    // Revenue per date start---------------------------------------------------
    //Get labels
    let date = [];
    for (let i = 0; i < ordersArr.length; i++) {
      date.push(ordersArr[i].date)
    }

    date = removeDuplicates(date);

    //Find orders by date
    let revenue = []

    for (let i = 0; i < date.length; i++) {

      for (let j = 0; j < ordersArr.length; j++) {

        for (let k = 0; k < ordersArr[j].products.length; k++) {
          if (ordersArr[j].date === date[i]) {
            revenue.push({ date: date[i], price: ordersArr[j].products[k].price })
          }
        }
      }
    }

    //Merge revenue per date
    let mergedRevenue = []

    for (let i = 0; i < date.length; i++) {
      let price = 0;
      let same = revenue.filter((revenue) => revenue.date === date[i])

      for (let j = 0; j < same.length; j++) {
        price += same[j].price
      }
      mergedRevenue.push(price);
    }

    //Call function to render linechart
    renderLineChart(date, mergedRevenue);

    //Revenue per date end------------------------------------------------------



    //Total revenue all time start----------------------------------------------

    //Calculate total revenue
    let totalRevenue = 0;
    for (let i = 0; i < mergedRevenue.length; i++) {
      totalRevenue += mergedRevenue[i]
    }

    //Render total revenue
    let totalRevenueCopy = document.querySelector('#totalRevenueCopy');
    totalRevenueCopy.textContent = `$${totalRevenue}`;

    //Total revenue all time end------------------------------------------------



    //Total number of orders start----------------------------------------------

    //Render total revenue
    let totalNumberOfOrdersCopy = document.querySelector('#totalNumberOfOrdersCopy');
    totalNumberOfOrdersCopy.textContent = `${ordersArr.length}`;

    //Total number of orders end------------------------------------------------

  });


//Functions start---------------------------------------------------------------
function removeDuplicates(array) {
  return [...new Set(array)]
}
//Render doughnut chart with most popular orders
function renderPieChart(labels, data) {
  const ctx = document.getElementById('pieChart');

  new Chart(ctx, {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
    },
    data: {
      labels: labels,
      datasets: [{
        label: 'Most Popular Orders',
        data: data,
        backgroundColor: ['#F5C49E', '#F3BA4A', '#B7D39F', '#D7C69F', '#7F6542',
          '#ECC953', '#812519', '#F2CAC7', '#382419'],
        borderWidth: 1
      }]
    }
  }
  )
}

//Render line chart with sales and revenue per day
function renderLineChart(date, revenue) {

  const ctx = document.getElementById('lineChart');

  new Chart(ctx, {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false
    },

    data: {
      labels: date,
      datasets: [{
        label: 'Revenue per day ($)',
        data: revenue,
        borderWidth: 2,
        borderColor: '#812519',
        backgroundColor: '#812519',
      }]
    }
  }
  )
}
//Functions end-----------------------------------------------------------------
