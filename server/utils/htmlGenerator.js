import { numberWithCommas } from "./formatNumber.js";

export const genHtml = (cartDetails, checkoutDetails) => {
  const { lastname, firstname, email, address, tel, city } = checkoutDetails;
  const name = `${firstname} ${lastname}`;

  const { totalAmount, cart } = cartDetails;

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumIntegerDigits: 2,
    maximumFractionDigits: 2,
  });
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shopping Receipt</title>
  </head>
  
  <body style="font-family: 'Courier New', Courier, monospace;">
      <div
          style="display: flex; width: 100% ; justify-content: space-around; flex-direction: column; align-items: center;">
          <div style="width: 100%; display: flex; flex-direction: column;  align-items: center;">
              <h1 style="font-size: 3rem;">AllCart Inc.</h1>
              <h3 style="font-size: 1.5rem;">Company Info</h3>
          </div>
          <div style="width: 100%; display: flex; justify-content: space-between;">
              <div>
                  <p>Date: ${year}-${month}-${day}</p>
              </div>
              <div>
                  <p style="text-transform: capitalize;">Name: ${name}</p>
                  <p>Email: ${email}</p>
                  <p>Phone Number: ${tel}</p>
                  <p style="text-transform: capitalize;">Address: ${address}</p>
                  <p style="text-transform: capitalize;">City: ${city}</p>
              </div>
          </div>
          <div style="width: 100%; display: flex; flex-direction: column;  align-items: center;">
              <div>
                  <h3 style="font-size: 1.5rem; width:100%;">Items</h3>
              </div>
              <div style="width: 100%;">
                  <table style="width: 100%;">
                      <tr>
                          <th>S/N</th>
                          <th>Product Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total Price</th>
                      </tr>
                      ${cart.map((item, index) => {
                        return `<tr>
                          <td>${index + 1}</td>
                          <td>${item.title}</td>
                          <td>${item.quantity}</td>
                          <td>$${numberWithCommas(+item.price)}</td>
                          <td>$${numberWithCommas(
                            +item.quantity * +item.price
                          )}</td>
                          </tr>`;
                      })}
                  </table>
              </div>
              <div>
                  <h1 style="font-size: 2rem;">Total Amount</h1>
                  <h1 style="font-size: 2.5rem;">$${numberWithCommas(
                    totalAmount
                  )}</h1>
              </div>
          </div>
          <div>
            <p>Thank you for shopping with us</p>
          </div>
      </div>
  </body>
  
  </html>`;
};
