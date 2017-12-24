# Hawker(side)Pay by Gabriel Lu & Nikita


Introduction
------
![hawkersidePay landing page](/public/landing_page_screenshot.png)

HawkerPay is a two-part mobile app which aims to streamline the food order and collection process in Singaporean hawker stalls. To access the hosted hawker interface of this app, please click [here](https://hawkersidepay.herokuapp.com/).

As mentioned previously, this app is two-part, one being the user interface, and the other being the hawker interface (which is what this app is).

Hawker(side)Pay and HawkerPay connect to a common database, where the apps let both the patron and the hawker to interact with each other.

To summarize the available user stories for the **hawker**:
1. Adjust available menu items
2. View order lists
3. Toggle order status

To summarize the available user stories for the **patron**:
1. View hawker menu
2. Add orders to cart
3. Make payment
4. View order status

Technologies used
------
1. Front-end: [React](https://reactjs.org/) (Javascript Library)
2. Database & authentication: [Firebase](https://firebase.google.com/)

How it works
------
We used the in-built Gmail authentication from firebase which took care of log-ins. For both the hawker and patron sides of the app, each account has a unique ID which is generated on signup.

Upon login, each hawker is assigned an ID, to which he can then update the menu tagged to this ID. 

Along the same vein, patrons ordering through the same hawker will send orders to one specific ID.

For the purpose of demonstration, we have hard-coded the hawker ID to H1, which has 2 pending orders to prepare. Note that orders will only be sent to the hawker after 'payment' is received. The hawker can then double click on the order item to send a complete order status over.

![hawkersidePay double click preview](/public/hawkerPay_clickpreview.gif)
